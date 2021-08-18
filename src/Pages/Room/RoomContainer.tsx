import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
import { useRoomContext } from "./RoomProvider";
import Room16Seats from "./Room__Components/Room__16Seats";
import RoomChattingOpenButton from "./Room__Components/Room__Chatting/Room__Chatting__OpenButton";
import RoomChatting from "./Room__Components/Room__Chatting";
import { FullScreenContainer } from "../../Styles/StyledComponents";
import { RoomType, Seat, PeerStateProp, Channel } from "../../Constants";
import Peer from "simple-peer";

interface RoomLocationStateProp {
    roomType: RoomType;
    roomId: string;
    userSeatNo: number;
    endTime: number;
}

export default function RoomContainer() {
    const location = useLocation<Location | unknown>();
    const history = useHistory();
    const { userInfo } = useAppContext();
    const {
        userStreamRef,
        socketRef,
        peersRef,
        setPeersState,
        createPeer,
        addPeer,
    } = useRoomContext();

    useEffect(() => {
        const state = location.state as RoomLocationStateProp;
        if (state === undefined) {
            history.push("/list");
        }

        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                userStreamRef!.current!.srcObject = stream;

                /* 1. 방참가 */
                socketRef?.current?.emit(Channel.JOIN, {
                    roomId: state.roomId,
                    newSeat: {
                        seatNo: state.userSeatNo,
                        socketId: socketRef?.current?.id,
                        userEmail: userInfo?.email,
                        userNickName: userInfo?.nickName,
                        endTime: state.endTime,
                    },
                });

                /* 2. 참가한 방의 기존 사용자들 정보 수신 */
                socketRef?.current?.on(
                    Channel.GET_CURRENT_ROOM,
                    (roomDetails) => {
                        // console.log(`${state.roomId}방 기존 정보 : `);
                        // console.dir(roomDetails);
                        if (!!roomDetails?.length) {
                            const peers: PeerStateProp[] = [];
                            roomDetails?.forEach((seatInfo: Seat) => {
                                // 각 사용자들마다 발신용 peer 객체 생성 후 연결 요청
                                const peer = createPeer(
                                    seatInfo.socketId,
                                    stream,
                                    state.userSeatNo,
                                    state.endTime
                                );
                                peersRef?.current?.push({
                                    peer,
                                    seatInfo,
                                });
                                peers.push({
                                    peer,
                                    seatInfo,
                                });
                            });
                            setPeersState(peers);
                        } else {
                            setPeersState([]);
                        }
                    }
                );

                /* 4. 새 유저가 접속한경우 */
                socketRef?.current?.on(
                    Channel.NEW_USER,
                    (payload: {
                        signal: Peer.SignalData;
                        callerSeatInfo: Seat;
                    }) => {
                        // console.log(
                        //     `${payload.callerSeatInfo.socketId}(${payload.callerSeatInfo.seatNo}번 참여자)로부터 연결 요청`
                        // );
                        // 중복 요청인지 확인
                        const peerRef = peersRef?.current?.find(
                            (peer) =>
                                peer.seatInfo.socketId ===
                                payload.callerSeatInfo.socketId
                        );
                        // 수신용 peer 객체 생성 후 연결 요청 수락
                        if (!peerRef) {
                            const peer = addPeer(
                                payload.signal,
                                payload.callerSeatInfo.socketId,
                                stream
                            );
                            peersRef?.current?.push({
                                peer,
                                seatInfo: payload.callerSeatInfo,
                            });
                            // TODO (BUG?) RoomContainer에서 peersState 이전 상태 가져올 때 implicitly any type이 됨.
                            setPeersState((peersState) => [
                                ...peersState,
                                {
                                    peer: peer,
                                    seatInfo: payload.callerSeatInfo,
                                },
                            ]);
                        }
                    }
                );

                /* 6. 최종 연결 */
                socketRef?.current?.on(Channel.RECEIVING_SIGNAL, (payload) => {
                    // console.log(`${payload.id}가 연결 요청을 수락`);
                    // console.log("peersRef.current: ", peersRef.current);
                    const peerRef = peersRef?.current?.find(
                        (peer) => peer.seatInfo.socketId === payload.id
                    );
                    peerRef?.peer.signal(payload.signal);
                });

                /* 다른 유저 퇴장시 */
                socketRef?.current?.on(Channel.DISCONNECT, (seatNo) => {
                    // console.log(`${seatNo}번 참여자 퇴장`);
                    // document.getElementById(`room-${seatNo}`)?.remove();
                    setPeersState((peersState) =>
                        peersState.filter((peer) => {
                            return peer.seatInfo.seatNo !== seatNo;
                        })
                    );
                    const exitPeer = peersRef?.current?.find((peer) => {
                        peer.seatInfo.seatNo === seatNo;
                    });
                    if (!!exitPeer) {
                        exitPeer.peer.destroy();
                    }
                    // peersRef?.current = peersRef?.current?.filter((peer) => {
                    //     peer.seatNo !== seatNo;
                    // });
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

    return (
        <Container>
            <Room16Seats />
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
