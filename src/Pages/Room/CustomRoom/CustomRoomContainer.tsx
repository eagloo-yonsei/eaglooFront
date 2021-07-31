import React, { useRef, useEffect, useState, RefObject } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import styled from "styled-components";
import CustomRoom16Seats from "./CustomRoom__16Seats";
import io, { Socket } from "socket.io-client";
import Peer from "simple-peer";
import { FullScreenContainer } from "../../../Styles/StyledComponents";
import {
    PeersStateProp,
    PeersRefProp,
    Channel,
    API_ENDPOINT,
} from "../../../Constants";
// import { useCustomRoomContext } from "./CustomRoomProvider";

interface LocationStateProp {
    roomId: string;
    userSeatNo: number;
}

interface OtherUserProp {
    seatNo: number;
    socketId: string;
    userName?: string;
}

interface CustomRoomProp {
    peersState: PeersStateProp[];
    userStreamRef: RefObject<HTMLVideoElement>;
    stopSelfStreamAndExit: () => void;
}

export default function CustomRoomContainer() {
    const location = useLocation<Location | unknown>();
    const history = useHistory();
    const state = location.state as LocationStateProp;
    const roomId = state?.roomId;
    const userSeatNo = state?.userSeatNo;
    const socketRef = useRef<Socket>();
    const userStreamRef = useRef<HTMLVideoElement>(null);
    const peersRef = useRef<PeersRefProp[]>([]);
    const [peersState, setPeersState] = useState<PeersStateProp[]>([]);

    useEffect(() => {
        const state = location.state as LocationStateProp;
        if (state === undefined) {
            history.push("/list");
        }

        socketRef.current = io(`${API_ENDPOINT}/customroom`);
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                console.log(stream);
                userStreamRef.current!.srcObject = stream;

                /* 1. 방참가 */
                socketRef.current?.emit(Channel.JOIN, {
                    roomId: roomId,
                    seatNo: userSeatNo,
                });

                /* 2. 참가한 방의 기존 사용자들 정보 수신 */
                socketRef.current?.on(
                    Channel.GET_CURRENT_ROOM,
                    (roomDetails) => {
                        console.log(`${state.roomId}방 기존 정보 : `);
                        console.dir(roomDetails);
                        if (!!roomDetails?.length) {
                            const peers: PeersStateProp[] = [];
                            roomDetails?.forEach((otherUser: OtherUserProp) => {
                                // 각 사용자들마다 발신용 peer 객체 생성 후 연결 요청
                                const peer = createPeer(
                                    otherUser.socketId,
                                    socketRef.current!.id,
                                    state.userSeatNo,
                                    stream
                                );
                                peersRef.current.push({
                                    peer,
                                    socketId: otherUser.socketId,
                                    seatNo: otherUser.seatNo,
                                });
                                peers.push({
                                    peer: peer,
                                    seatNo: otherUser.seatNo,
                                });
                            });
                            setPeersState(peers);
                        } else {
                            setPeersState([]);
                        }
                    }
                );

                /* 4. 새 유저가 접속한경우 */
                socketRef.current?.on(Channel.NEW_USER, (payload) => {
                    console.log(
                        `${payload.callerId}(${payload.seatNo}번 참여자)로부터 연결 요청`
                    );
                    // 중복 요청인지 확인
                    const peerRef = peersRef.current.find(
                        (peer) => peer.socketId === payload.callerId
                    );
                    // 수신용 peer 객체 생성 후 연결 요청 수락
                    if (!peerRef) {
                        const peer = addPeer(
                            payload.signal,
                            payload.callerId,
                            stream
                        );
                        peersRef.current.push({
                            peer,
                            socketId: payload.callerId,
                            seatNo: payload.seatNo,
                        });
                        setPeersState((peersState) => [
                            ...peersState,
                            { peer: peer, seatNo: payload.seatNo },
                        ]);
                    }
                });

                /* 6. 최종 연결 */
                socketRef.current?.on(Channel.RECEIVING_SIGNAL, (payload) => {
                    console.log(`${payload.id}가 연결 요청을 수락`);
                    console.log("peersRef.current: ", peersRef.current);
                    const peerRef = peersRef.current.find(
                        (peer) => peer.socketId === payload.id
                    );
                    peerRef?.peer.signal(payload.signal);
                });

                /* 다른 유저 퇴장시 */
                socketRef.current?.on(Channel.DISCONNECT, (seatNo) => {
                    console.log(`${seatNo}번 참여자 퇴장`);
                    document.getElementById(`room-${seatNo}`)?.remove();
                    setPeersState((peersState) =>
                        peersState.filter((peer) => {
                            return peer.seatNo !== seatNo;
                        })
                    );
                    const exitPeer = peersRef.current.find((peer) => {
                        peer.seatNo === seatNo;
                    });
                    if (!!exitPeer) {
                        exitPeer.peer.destroy();
                    }
                    peersRef.current = peersRef.current.filter((peer) => {
                        peer.seatNo !== seatNo;
                    });
                });
            });

        return () => {
            socketRef.current?.emit("leave", {
                roomId: roomId,
                seatNo: userSeatNo,
            });
            socketRef.current?.close();
            socketRef.current?.disconnect();
        };
    }, []);

    /* 자신이 방에 들어왔을 때 기존 참여자들과의 Connection 설정 */
    function createPeer(
        userToSignal: string, // 기존 참여자 socket ID
        callerId: string, // 본인 socket ID
        callerSeatNo: number, // 본인 seatNo
        stream: any // 본인 stream
    ) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", (signal) => {
            /* 3. 기존 사용자에게 연결 요청 */
            console.log(`${userToSignal}에게 연결 요청`);
            socketRef.current?.emit(Channel.SENDING_SIGNAL, {
                userToSignal,
                callerId,
                callerSeatNo,
                signal,
            });
        });
        return peer;
    }

    /* 방에 참여한 상태에서 신규 참여자가 들어왔을 때 Connection 설정 */
    function addPeer(
        incomingSignal: string,
        callerId: string, // 신규 참여자 socket ID
        stream: MediaStream
    ) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        /* 5. 연결 요청 수락 */
        peer.on("signal", (signal) => {
            socketRef.current?.emit(Channel.RETURNING_SIGNAL, {
                signal,
                callerId,
            });
        });
        peer.signal(incomingSignal);
        return peer;
    }

    function stopSelfStreamAndExit() {
        const selfStream = userStreamRef.current?.srcObject as MediaStream;
        const tracks = selfStream?.getTracks();
        if (tracks) {
            tracks.forEach((track) => {
                track.stop();
            });
        }
        history.push("/list");
    }

    return (
        <Container>
            <CustomRoomSwitcher
                peersState={peersState}
                userStreamRef={userStreamRef}
                stopSelfStreamAndExit={stopSelfStreamAndExit}
            />
        </Container>
    );
}

function CustomRoomSwitcher({
    peersState,
    userStreamRef,
    stopSelfStreamAndExit,
}: CustomRoomProp) {
    // const {roomInfo} = useCustomRoomContext()
    // if(roomInfo.maxSeats === 8){
    //     return <CustomRoom8Seats/>
    // }
    // if(roomInfo.maxSeats === 16){
    //     return <CustomRoom16Seats/>
    // }
    return (
        <CustomRoom16Seats
            userStreamRef={userStreamRef}
            peersState={peersState}
            stopSelfStreamAndExit={stopSelfStreamAndExit}
        />
    );
}

const Container = styled(FullScreenContainer)`
    display: flex;
    flex-direction: column;
    font-family: ${(props) => props.theme.plainTextFont};
    padding: 50px 30px;
`;
