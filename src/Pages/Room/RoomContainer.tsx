import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Location } from "history";
import styled from "styled-components";
import { FullScreenContainer } from "../../Styles/StyledComponents";
import RoomOuterRow from "./Room__OuterRow";
import RoomOuterColumn from "./Room__OuterColumn";
import RoomCenterPanel from "./Room__CenterPanel";
import io, { Socket } from "socket.io-client";
import Peer from "simple-peer";
import { useRoomContext } from "./RoomProvider";
import { Channel, API_ENDPOINT } from "../../Constants";

interface LocationStateProp {
    roomNo: number;
    seatNo: number;
}

interface PeersStateProp {
    peer: Peer.Instance;
    seatNo: number;
}

interface PeersRefProp {
    peer: Peer.Instance;
    socketId: string;
    seatNo: number;
}

interface OtherUserProp {
    seatNo: number;
    socketId: string;
    userName?: string;
}

export default function RoomContainer() {
    const location = useLocation<Location | unknown>();
    const state = location.state as LocationStateProp;
    const roomNo = state.roomNo;
    const seatNo = state.seatNo;
    const [peersState, setPeersState] = useState<PeersStateProp[]>([]);
    const socketRef = useRef<Socket>();
    const userStream = useRef<HTMLVideoElement>(null);
    const peersRef = useRef<PeersRefProp[]>([]);

    useEffect(() => {
        socketRef.current = io(API_ENDPOINT);
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                console.log(stream);
                userStream.current!.srcObject = stream;

                /* 1. 방참가 */
                socketRef.current?.emit(Channel.JOIN, {
                    roomNo: roomNo,
                    seatNo: seatNo,
                });

                /* 2. 참가한 방의 기존 사용자들 정보 수신 */
                socketRef.current?.on(
                    Channel.GET_CURRENT_ROOM,
                    (roomDetails) => {
                        console.log(`${state.roomNo}번 방 기존 정보 : `);
                        console.dir(roomDetails);
                        if (!!roomDetails?.length) {
                            const peers: PeersStateProp[] = [];
                            roomDetails?.forEach((otherUser: OtherUserProp) => {
                                // 각 사용자들마다 발신용 peer 객체 생성 후 연결 요청
                                const peer = createPeer(
                                    otherUser.socketId,
                                    socketRef.current!.id,
                                    state.seatNo,
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
                    const item = peersRef.current.find(
                        (p) => p.socketId === payload.callerId
                    );
                    // 수신용 peer 객체 생성 후 연결 요청 수락
                    if (!item) {
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
                    const item = peersRef.current.find(
                        (p) => p.socketId === payload.id
                    );
                    item?.peer.signal(payload.signal);
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
                    console.log(peersRef.current);
                    peersRef.current = peersRef.current.filter((peer) => {
                        peer.seatNo !== seatNo;
                    });
                    console.log(peersRef.current);
                });
            });

        return () => {};
    }, []);

    /* 자신이 방에 들어왔을 때 기존 참여자들과의 Connection 설정 */
    function createPeer(
        userToSignal: string, // 기존 참여자 socket ID
        callerId: string, // 본인 socket ID
        seatNo: number, // 본인 seatNo
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
                seatNo,
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

    return (
        <Container>
            <RoomOuterRow
                peersState={peersState}
                seatNums={[1, 2, 3, 4, 5, 6]}
            />
            <RoomInnerRow>
                <RoomOuterColumn peersState={peersState} seatNums={[7, 9]} />
                <RoomCenterPanel userStream={userStream} />
                <RoomOuterColumn peersState={peersState} seatNums={[8, 10]} />
            </RoomInnerRow>
            <RoomOuterRow
                peersState={peersState}
                seatNums={[11, 12, 13, 14, 15, 16]}
            />
        </Container>
    );
}

const Video = styled.video``;

const Container = styled(FullScreenContainer)`
    display: flex;
    flex-direction: column;
    font-family: ${(props) => props.theme.plainTextFont};
    padding: 50px 30px;
`;

const RoomInnerRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50%;
`;
