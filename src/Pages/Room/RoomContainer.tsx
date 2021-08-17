import React, { useRef, useEffect, useState, RefObject } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import styled from "styled-components";
import { useRoomContext } from "./RoomProvider";
import Room16Seats from "./Room__Components/Room__16Seats";
import RoomChattingOpenButton from "./Room__Components/Room__Chatting/Room__Chatting__OpenButton";
import RoomChatting from "./Room__Components/Room__Chatting";
import Peer from "simple-peer";
import { FullScreenContainer } from "../../Styles/StyledComponents";
import {
    RoomType,
    Seat,
    PeerStateProp,
    PeerRefProp,
    Channel,
} from "../../Constants";

interface RoomLocationStateProp {
    roomType: RoomType;
    roomId: string;
    userSeatNo: number;
}

export default function RoomContainer() {
    const location = useLocation<Location | unknown>();
    const history = useHistory();
    const { socketRef, roomType } = useRoomContext();
    const userStreamRef = useRef<HTMLVideoElement>(null);
    const peersRef = useRef<PeerRefProp[]>([]);
    const [peersState, setPeersState] = useState<PeerStateProp[]>([]);

    useEffect(() => {
        const state = location.state as RoomLocationStateProp;
        if (state === undefined) {
            history.push("/list");
        }

        // socketRef.current = io(
        //     state.roomType === RoomType.PUBLIC
        //         ? `${API_ENDPOINT}/publicroom`
        //         : `${API_ENDPOINT}/customroom`
        // );

        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                userStreamRef.current!.srcObject = stream;

                /* 1. 방참가 */
                socketRef?.current?.emit(Channel.JOIN, {
                    roomId: state.roomId,
                    seatNo: state.userSeatNo,
                });

                /* 2. 참가한 방의 기존 사용자들 정보 수신 */
                socketRef?.current?.on(
                    Channel.GET_CURRENT_ROOM,
                    (roomDetails) => {
                        // console.log(`${state.roomId}방 기존 정보 : `);
                        // console.dir(roomDetails);
                        if (!!roomDetails?.length) {
                            const peers: PeerStateProp[] = [];
                            roomDetails?.forEach((otherUser: Seat) => {
                                // 각 사용자들마다 발신용 peer 객체 생성 후 연결 요청
                                const peer = createPeer(
                                    otherUser.socketId,
                                    socketRef?.current!.id,
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
                socketRef?.current?.on(Channel.NEW_USER, (payload) => {
                    // console.log(
                    //     `${payload.callerId}(${payload.callerSeatNo}번 참여자)로부터 연결 요청`
                    // );
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
                            seatNo: payload.callerSeatNo,
                        });
                        setPeersState((peersState) => [
                            ...peersState,
                            { peer: peer, seatNo: payload.callerSeatNo },
                        ]);
                    }
                });

                /* 6. 최종 연결 */
                socketRef?.current?.on(Channel.RECEIVING_SIGNAL, (payload) => {
                    // console.log(`${payload.id}가 연결 요청을 수락`);
                    // console.log("peersRef.current: ", peersRef.current);
                    const peerRef = peersRef.current.find(
                        (peer) => peer.socketId === payload.id
                    );
                    peerRef?.peer.signal(payload.signal);
                });

                /* 다른 유저 퇴장시 */
                socketRef?.current?.on(Channel.DISCONNECT, (seatNo) => {
                    // console.log(`${seatNo}번 참여자 퇴장`);
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
            socketRef?.current?.emit("leave", {
                roomId: state.roomId,
                seatNo: state.userSeatNo,
            });
            socketRef?.current?.close();
            socketRef?.current?.disconnect();
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
            // console.log(`${userToSignal}에게 연결 요청`);
            socketRef?.current?.emit(Channel.SENDING_SIGNAL, {
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
            socketRef?.current?.emit(Channel.RETURNING_SIGNAL, {
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
            <Room16Seats
                peersState={peersState}
                userStreamRef={userStreamRef}
                stopSelfStreamAndExit={stopSelfStreamAndExit}
            />
            <RoomChatting />
            <RoomChattingOpenButton />
        </Container>
    );
}

const Container = styled(FullScreenContainer)`
    position: relative;
    display: flex;
    flex-direction: column;
    font-family: ${(props) => props.theme.plainTextFont};
    padding: 50px 30px;
`;
