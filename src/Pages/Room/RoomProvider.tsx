import React, {
    createContext,
    useContext,
    RefObject,
    useRef,
    useState,
    useEffect,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import { useAppContext } from "../../Routes/App/AppProvider";
import axios from "axios";
import io, { Socket } from "socket.io-client";
import {
    RoomType,
    Room,
    CustomRoom,
    Seat,
    PeerStateProp,
    PeerRefProp,
    Channel,
    ChildrenProp,
    API_ENDPOINT,
} from "../../Constants";
import Peer from "simple-peer";
import { toastSuccessMessage } from "../../Utils";

interface RoomLocationStateProp {
    roomType: RoomType;
    roomId: string;
    userSeatNo: number;
    endTime: number;
}

interface RoomContextProp {
    userStreamRef?: RefObject<HTMLVideoElement>;
    socketRef?: RefObject<Socket | undefined>;
    peersRef?: RefObject<PeerRefProp[]>;
    peersState: PeerStateProp[];
    roomType: RoomType;
    roomId: string;
    roomInfo: Room | CustomRoom;
    userSeatNo: number;
    endTime: number;
    chattingOpen: boolean;
    joinRoom: (
        roomType: RoomType,
        roomId: string,
        newSeat: Seat
    ) => Promise<{
        success: boolean;
        roomInfo: Room | CustomRoom;
        message: string;
    }>;
    setPeersState: (peersState: PeerStateProp[]) => void;
    createPeer: (
        userToSignal: string,
        stream: MediaStream,
        userSeatNo: number,
        endTime: number
    ) => Peer.Instance;
    addPeer: (
        incomingSignal: Peer.SignalData,
        callerId: string,
        stream: MediaStream
    ) => Peer.Instance;
    toggleChattingOpen: () => void;
    stopSelfStream: () => void;
    exitToList: () => void;
}

const InitialRoomContext: RoomContextProp = {
    peersState: [],
    roomType: RoomType.PUBLIC,
    roomId: "",
    roomInfo: {
        id: "",
        roomName: "",
        seats: [],
    },
    userSeatNo: 0,
    endTime: 0,
    chattingOpen: false,
    joinRoom: () => {
        return new Promise(() => {
            return {
                success: false,
                roomInfo: { id: "", roomName: "", seats: [] },
                message: "",
            };
        });
    },
    setPeersState: () => {},
    createPeer: () => new Peer(),
    addPeer: () => new Peer(),
    toggleChattingOpen: () => {},
    stopSelfStream: () => {},
    exitToList: () => {},
};

const RoomContext = createContext<RoomContextProp>(InitialRoomContext);
export const useRoomContext = () => useContext(RoomContext);

export default function RoomProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const { userInfo } = useAppContext();
    const userStreamRef = useRef<HTMLVideoElement>(null);
    const socketRef = useRef<Socket | undefined>();
    const peersRef = useRef<PeerRefProp[]>([]);
    const [peersState, setPeersState] = useState<PeerStateProp[]>([]);
    const [roomType, setRoomType] = useState<RoomType>(RoomType.PUBLIC);
    const [roomId, setRoomId] = useState<string>("");
    const [roomInfo, setRoomInfo] = useState<Room | CustomRoom>({
        id: "",
        roomName: "",
        seats: [],
    });
    const [userSeatNo, setUserSeatNo] = useState<number>(0);
    const [chattingOpen, setChattingOpen] = useState<boolean>(false);
    const [endTime, setEndTime] = useState<number>(0);

    useEffect(() => {
        // 엔트리 입장시 roomId prop을 받고 온 게 아니면 /list로 push
        const state = location.state as RoomLocationStateProp;
        if (state !== undefined) {
            getRoomInfo(state.roomType, state.roomId);
            setRoomType(state.roomType);
            setRoomId(state.roomId);
            setUserSeatNo(state.userSeatNo);
            setEndTime(state.endTime);
        } else {
            history.push("/list");
        }

        socketRef.current = io(
            state.roomType === RoomType.PUBLIC
                ? `${API_ENDPOINT}/publicroom`
                : `${API_ENDPOINT}/customroom`
        );

        setTimeout(() => {
            toastSuccessMessage(
                "설정한 공부 시간이 다 되어 퇴실 되었습니다. 보람찬 시간이었나요?"
            );
            stopSelfStream();
            exitToList();
        }, state.endTime - new Date().getTime());

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    async function getRoomInfo(roomType: RoomType, roomId: string) {
        await axios
            .get<Room | CustomRoom>(
                roomType === RoomType.PUBLIC
                    ? `${API_ENDPOINT}/api/publicroom/${roomId}`
                    : `${API_ENDPOINT}/api/customroom/${roomId}`
            )
            .then((response) => {
                setRoomInfo(response.data);
            });
    }

    async function joinRoom(roomType: RoomType, roomId: string, newSeat: Seat) {
        const response = await axios
            .post<{
                success: boolean;
                roomInfo: Room | CustomRoom;
                message: string;
            }>(
                roomType === RoomType.PUBLIC
                    ? `${API_ENDPOINT}/api/publicroom/joinRoom`
                    : `${API_ENDPOINT}/api/customroom/joinRoom`,
                {
                    roomId,
                    newSeat,
                }
            )
            .catch((error) => {
                console.error(error);
                return {
                    data: {
                        success: false,
                        roomInfo: { id: "", roomName: "", seats: [] },
                        message:
                            "방 입장 중 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
                    },
                };
            });

        return response.data;
    }

    /* 자신이 방에 들어왔을 때 기존 참여자들과의 Connection 설정 */
    function createPeer(
        userToSignal: string, // 기존 참여자 socket ID
        stream: MediaStream, // 본인 stream
        userSeatNo: number,
        endTime: number
    ) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", (signal: Peer.SignalData) => {
            /* 3. 기존 사용자에게 연결 요청 */
            // TODO (Room에서 소켓 활용 최소화) 나중에 POST 요청으로.
            // console.log(`${userToSignal}에게 연결 요청`);
            socketRef?.current?.emit(Channel.REQUEST_PEER_CONNECTION, {
                userToSignal,
                signal,
                callerSeatInfo: {
                    seatNo: userSeatNo,
                    socketId: socketRef?.current?.id,
                    userEmail: userInfo?.email,
                    userNickName: userInfo?.nickName,
                    endTime,
                },
            });
        });
        return peer;
    }

    function addPeer(
        incomingSignal: Peer.SignalData,
        callerId: string, // 신규 참여자 socket ID
        stream: MediaStream
    ) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        /* 5. 연결 요청 수락 */
        peer.on("signal", (signal: Peer.SignalData) => {
            // console.log(`${callerId}의 연결 요청 수락`);
            socketRef?.current?.emit(Channel.ACCEPT_PEER_CONNECTION_REQUEST, {
                signal,
                callerId,
            });
        });
        peer.signal(incomingSignal);
        return peer;
    }

    function toggleChattingOpen() {
        setChattingOpen(!chattingOpen);
    }

    function stopSelfStream() {
        const selfStream = userStreamRef?.current?.srcObject as MediaStream;
        const tracks = selfStream?.getTracks();
        if (tracks) {
            tracks.forEach((track) => {
                track.stop();
            });
        }
    }

    function exitToList() {
        history.push("/list");
    }

    const roomContext = {
        userStreamRef,
        socketRef,
        peersRef,
        peersState,
        roomType,
        roomId,
        roomInfo,
        userSeatNo,
        endTime,
        chattingOpen,
        joinRoom,
        setPeersState,
        createPeer,
        addPeer,
        toggleChattingOpen,
        stopSelfStream,
        exitToList,
    };

    return (
        <RoomContext.Provider value={roomContext}>
            {children}
        </RoomContext.Provider>
    );
}
