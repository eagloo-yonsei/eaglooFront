import React, {
    createContext,
    useContext,
    RefObject,
    useRef,
    useState,
    useEffect,
} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../Routes/App/AppProvider";
import {
    RoomType,
    Room,
    CustomRoom,
    Seat,
    PeerStateProp,
    PeerRefProp,
    SocketChannel,
    ChildrenProp,
    API_ENDPOINT,
} from "../../Constants";
import Peer from "simple-peer";
import { toastErrorMessage, toastSuccessMessage } from "../../Utils";

interface RoomContextProp {
    userStreamHTMLRef?: RefObject<HTMLVideoElement>;
    peersRef?: RefObject<PeerRefProp[]>;
    peersState: PeerStateProp[];
    restingPeersSeatNo: number[];
    roomInfo: Room | CustomRoom;
    userMuted: boolean;
    chattingOpen: boolean;
    setPeersState: (peersState: PeerStateProp[]) => void;
    createPeer: (userToSignal: string, stream: MediaStream) => Peer.Instance;
    addPeer: (
        incomingSignal: Peer.SignalData,
        callerId: string,
        stream: MediaStream
    ) => Peer.Instance;
    setChattingOpen: (status: boolean) => void;
    toggleChattingOpen: () => void;
    stopSelfStream: () => void;
    muteSelfAudio: () => void;
    unmuteSelfAudio: () => void;
    enterLounge: () => void;
    exitToList: () => void;
}

const InitialRoomContext: RoomContextProp = {
    peersState: [],
    restingPeersSeatNo: [],
    roomInfo: {
        id: "",
        roomName: "",
        seats: [],
    },
    userMuted: true,
    chattingOpen: false,
    setPeersState: () => {},
    createPeer: () => new Peer(),
    addPeer: () => new Peer(),
    setChattingOpen: () => {},
    toggleChattingOpen: () => {},
    stopSelfStream: () => {},
    muteSelfAudio: () => {},
    unmuteSelfAudio: () => {},
    enterLounge: () => {},
    exitToList: () => {},
};

const RoomContext = createContext<RoomContextProp>(InitialRoomContext);
export const useRoomContext = () => useContext(RoomContext);

export default function RoomProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const { socketRef, userInfo, roomUsingInfo, setRoomUsingInfo } =
        useAppContext();
    const quitForRest = useRef<boolean>(false);
    const userStreamHTMLRef = useRef<HTMLVideoElement>(null);
    const peersRef = useRef<PeerRefProp[]>([]);
    const restingPeerRef = useRef<number[]>([]);
    const [peersState, setPeersState] = useState<PeerStateProp[]>([]);
    const [restingPeersSeatNo, setRestingPeersSeatNo] = useState<number[]>([]);
    const [roomInfo, setRoomInfo] = useState<Room | CustomRoom>({
        id: "",
        roomName: "",
        seats: [],
    });
    const [userMuted, setUserMuted] = useState<boolean>(true);
    const [chattingOpen, setChattingOpen] = useState<boolean>(false);

    useEffect(() => {
        // 방 입장시 roomUsingInfo가 없다면 /list로 push
        if (!roomUsingInfo) {
            history.push("/list");
        }

        getRoomInfo(roomUsingInfo!.roomType, roomUsingInfo!.roomId);

        navigator.mediaDevices
            .getUserMedia({
                video: { width: { max: 640 }, height: { max: 480 } },
                audio: true,
            })
            .then(async (stream) => {
                stream.getAudioTracks().forEach((audioTrack) => {
                    audioTrack.enabled = false;
                });
                userStreamHTMLRef!.current!.srcObject = stream;

                /* 1. 방 입장 요청 */
                socketRef?.current?.emit(SocketChannel.JOIN_ROOM, {
                    roomType: roomUsingInfo?.roomType,
                    roomId: roomUsingInfo?.roomId,
                    newSeat: {
                        seatNo: roomUsingInfo?.seatNo,
                        socketId: "",
                        userEmail: userInfo?.email,
                        userNickName: userInfo?.nickName,
                        endTime: roomUsingInfo?.endTime,
                        streamState: {
                            video: true,
                            audio: false,
                        },
                    },
                });

                socketRef?.current?.on(
                    SocketChannel.GET_CURRENT_ROOM,
                    (currentRoom: Room | CustomRoom) => {
                        // console.log(`기존 방 정보 수신 :`);
                        // console.dir(currentRoom.seats);
                        if (!!currentRoom.seats) {
                            const peers: PeerStateProp[] = [];
                            const restingPeers: number[] = [];

                            currentRoom.seats.forEach((seat) => {
                                if (seat.streamState.video) {
                                    // 기존 참여자가 휴게실에 가있는 상황이 아니라면
                                    // peer connection 만들어서 추가
                                    if (
                                        seat.socketId !== socketRef?.current?.id
                                    ) {
                                        const peer = createPeer(
                                            seat.socketId,
                                            stream
                                        );
                                        peersRef?.current?.push({
                                            peer,
                                            seatInfo: seat,
                                        });
                                        peers.push({
                                            peer,
                                            seatInfo: seat,
                                        });
                                    }
                                } else {
                                    // 기존 참여자가 휴게실에 간 상황이라면
                                    // restingPeersSeatNo 에 추가
                                    restingPeerRef.current.push(seat.seatNo);
                                    restingPeers.push(seat.seatNo);
                                }
                            });
                            setPeersState(peers);
                            setRestingPeersSeatNo(restingPeers);
                        }
                    }
                );

                /* 4. 새 유저 접속, 혹은 기존 유저가 휴게실에서 돌아온 경우 */
                socketRef?.current?.on(
                    SocketChannel.PEER_CONNECTION_REQUESTED,
                    (payload: {
                        signal: Peer.SignalData;
                        callerSeatInfo: Seat;
                    }) => {
                        // console.log(
                        //     `${payload.callerSeatInfo.socketId}(${payload.callerSeatInfo.seatNo}번 참여자)로부터 연결 요청`
                        // );
                        const peer = addPeer(
                            payload.signal,
                            payload.callerSeatInfo.socketId,
                            stream
                        );

                        peersRef.current.push({
                            peer,
                            seatInfo: payload.callerSeatInfo,
                        });
                        setPeersState(peersRef.current);

                        // 휴게실에서 돌아온 유저인 경우
                        // DUPLICATE
                        subRestingPeer(payload.callerSeatInfo.seatNo);
                        // restingPeerRef.current = restingPeerRef.current.filter(
                        //     (restingPeerSeatNo) => {
                        //         return (
                        //             restingPeerSeatNo !==
                        //             payload.callerSeatInfo.seatNo
                        //         );
                        //     }
                        // );
                        // console.log(
                        //     `restingPeerRef : `,
                        //     restingPeerRef.current
                        // );
                        // setRestingPeersSeatNo(restingPeerRef.current);
                    }
                );

                /* 6. 최종 연결 */
                socketRef?.current?.on(
                    SocketChannel.PEER_CONNECTION_REQUEST_ACCEPTED,
                    (payload) => {
                        // console.log(`${payload.id}가 연결 요청을 수락`);
                        const peerRef = peersRef?.current?.find(
                            (peer) => peer.seatInfo.socketId === payload.id
                        );
                        peerRef?.peer?.signal(payload.signal);
                    }
                );

                /* 다른 유저 휴게실 입장시 */
                socketRef?.current?.on(
                    SocketChannel.PEER_ENTER_LOUNGE,
                    (seatNo: number) => {
                        // console.log(`${seatNo}번 참여자 휴게실 입장`);
                        const exitPeer = peersRef?.current?.find((peer) => {
                            peer.seatInfo.seatNo === seatNo;
                        });
                        if (!!exitPeer) {
                            exitPeer.peer?.destroy();
                        }

                        // DUPLICATE
                        peersRef.current = peersRef?.current?.filter(
                            (peerRef) => {
                                return peerRef.seatInfo.seatNo !== seatNo;
                            }
                        );
                        setPeersState(peersRef.current);

                        addRestingPeer(seatNo);
                        // restingPeerRef.current.push(seatNo);
                        // console.log(
                        //     `restingPeerRef : `,
                        //     restingPeerRef.current
                        // );
                        // setRestingPeersSeatNo(restingPeerRef.current);
                        // console.log(`restingPeerState : `, restingPeersSeatNo);
                    }
                );

                /* 다른 유저 퇴장시 */
                socketRef?.current?.on(
                    SocketChannel.PEER_QUIT_ROOM,
                    (seatNo) => {
                        // console.log(`${seatNo}번 참여자 퇴장`);
                        const exitPeer = peersRef?.current?.find((peer) => {
                            peer.seatInfo.seatNo === seatNo;
                        });
                        if (!!exitPeer) {
                            exitPeer.peer?.destroy();
                        }

                        // DUPLICATE
                        peersRef.current = peersRef?.current?.filter(
                            (peerRef) => {
                                return peerRef.seatInfo.seatNo !== seatNo;
                            }
                        );
                        setPeersState(peersRef.current);

                        // DUPLICATE
                        restingPeerRef.current = restingPeerRef.current.filter(
                            (restingPeerSeatNo) => {
                                return restingPeerSeatNo !== seatNo;
                            }
                        );
                        setRestingPeersSeatNo(restingPeerRef.current);
                    }
                );

                /* 방장, 혹은 관리자에 의해 퇴출 */
                socketRef?.current?.on(
                    SocketChannel.EXILED,
                    (message: string) => {
                        toastErrorMessage(message);
                        stopSelfStream();
                        exitToList();
                    }
                );
            })
            .catch((error) => {
                exitToList();
            });

        const timeOver = setTimeout(() => {
            toastSuccessMessage(
                "설정한 공부 시간이 다 되어 퇴실 되었습니다. 보람찬 시간이었나요?"
            );
            stopSelfStream();
            exitToList();
        }, roomUsingInfo!.endTime - new Date().getTime());

        return () => {
            stopSelfStream();
            clearTimeout(timeOver);
            if (quitForRest.current) {
                socketRef?.current?.emit(SocketChannel.ENTER_LOUNGE, {
                    roomId: roomUsingInfo?.roomId,
                    seatNo: roomUsingInfo?.seatNo,
                });
            } else {
                socketRef?.current?.emit(SocketChannel.QUIT_ROOM, {
                    roomId: roomUsingInfo?.roomId,
                    seatNo: roomUsingInfo?.seatNo,
                });
                setRoomUsingInfo(undefined);
            }
            socketRef?.current?.off(SocketChannel.GET_CURRENT_ROOM);
            socketRef?.current?.off(SocketChannel.PEER_CONNECTION_REQUESTED);
            socketRef?.current?.off(
                SocketChannel.PEER_CONNECTION_REQUEST_ACCEPTED
            );
            socketRef?.current?.off(SocketChannel.PEER_ENTER_LOUNGE);
            socketRef?.current?.off(SocketChannel.PEER_QUIT_ROOM);
            socketRef?.current?.off(SocketChannel.EXILED);
        };
    }, []);

    async function getRoomInfo(roomType: RoomType, roomId: string) {
        await axios
            .get<Room | CustomRoom>(`${API_ENDPOINT}/api/room/${roomId}`)
            .then((response) => {
                setRoomInfo(response.data);
            });
    }

    function addRestingPeer(seatNo: number) {
        restingPeerRef.current.push(seatNo);
        const restingRef = restingPeerRef.current.slice();
        setRestingPeersSeatNo(restingRef);
    }

    function subRestingPeer(seatNo: number) {
        restingPeerRef.current = restingPeerRef.current.filter(
            (restingSeat) => {
                return restingSeat !== seatNo;
            }
        );
        const restingRef = restingPeerRef.current.slice();
        setRestingPeersSeatNo(restingRef);
    }

    /* 자신이 방에 들어왔을 때 기존 참여자들과의 Connection 설정 */
    function createPeer(
        userToSignal: string, // 기존 참여자 socket ID
        stream: MediaStream | undefined // 본인 stream
    ) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", (signal: Peer.SignalData) => {
            /* 3. 기존 사용자에게 연결 요청 */
            // console.log(`${userToSignal}에게 연결 요청`);
            socketRef?.current?.emit(SocketChannel.REQUEST_PEER_CONNECTION, {
                userToSignal,
                signal,
                callerSeatInfo: {
                    seatNo: roomUsingInfo!.seatNo,
                    socketId: socketRef?.current?.id,
                    userEmail: userInfo?.email,
                    userNickName: userInfo?.nickName,
                    endTime: roomUsingInfo!.endTime,
                    streamState: {
                        video: true,
                        audio: false,
                    },
                },
            });
        });
        return peer;
    }

    function addPeer(
        incomingSignal: Peer.SignalData,
        callerId: string, // 신규 참여자 socket ID
        stream: MediaStream | undefined
    ) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        /* 5. 연결 요청 수락 */
        peer.on("signal", (signal: Peer.SignalData) => {
            // console.log(`${callerId}의 연결 요청 수락`);
            socketRef?.current?.emit(
                SocketChannel.ACCEPT_PEER_CONNECTION_REQUEST,
                {
                    signal,
                    callerId,
                }
            );
        });
        peer.signal(incomingSignal);
        return peer;
    }

    function toggleChattingOpen() {
        setChattingOpen(!chattingOpen);
    }

    function stopSelfStream() {
        const selfHTMLStream = userStreamHTMLRef?.current
            ?.srcObject as MediaStream;
        const HTMLtracks = selfHTMLStream?.getTracks();
        if (HTMLtracks) {
            HTMLtracks.forEach((track) => {
                track.stop();
            });
        }
    }

    function muteSelfAudio() {
        handleSelfAudio(false);
    }

    function unmuteSelfAudio() {
        handleSelfAudio(true);
    }

    function handleSelfAudio(status: boolean) {
        socketRef?.current?.emit(
            status ? SocketChannel.RESUME_AUDIO : SocketChannel.HALT_AUDIO,
            {
                roomId: roomUsingInfo!.roomId,
                seatNo: roomUsingInfo!.seatNo,
            }
        );
        const selfHTMLStream = userStreamHTMLRef?.current
            ?.srcObject as MediaStream;
        const audioTracks = selfHTMLStream?.getAudioTracks();
        if (audioTracks) {
            audioTracks.forEach((audioTrack) => {
                audioTrack.enabled = status;
            });
            peersState.forEach((peerState) => {
                if (peerState.peer?.connected) {
                    peerState.peer?.send(
                        status
                            ? SocketChannel.RESUME_AUDIO
                            : SocketChannel.HALT_AUDIO
                    );
                }
            });
        }
        setUserMuted(!status);
    }

    function enterLounge() {
        quitForRest.current = true;
        stopSelfStream();
        history.push("/lounge");
    }

    function exitToList() {
        history.push("/list");
    }

    const roomContext = {
        userStreamHTMLRef,
        peersRef,
        peersState,
        restingPeersSeatNo,
        roomInfo,
        userMuted,
        chattingOpen,
        setPeersState,
        createPeer,
        addPeer,
        setChattingOpen,
        toggleChattingOpen,
        stopSelfStream,
        muteSelfAudio,
        unmuteSelfAudio,
        enterLounge,
        exitToList,
    };

    return (
        <RoomContext.Provider value={roomContext}>
            {children}
        </RoomContext.Provider>
    );
}
