import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useRoomContext } from "./RoomProvider";
import Peer from "simple-peer";

interface PeerStateProp {
    peer: Peer.Instance;
    seatNo: number;
}

interface SeatProp {
    peersState: PeerStateProp[];
    seatNo: number;
}

interface MiddleWareProp {
    peersState: PeerStateProp[];
    seatNo: number;
    userSeatNo: number;
}

interface EmptySeatProp {
    seatNo: number;
}

export default function RoomSeat({ peersState, seatNo }: SeatProp) {
    const { userSeatNo } = useRoomContext();

    return (
        <MiddleWare
            peersState={peersState}
            seatNo={seatNo}
            userSeatNo={userSeatNo}
        />
    );
}

function MiddleWare({ peersState, seatNo, userSeatNo }: MiddleWareProp) {
    if (seatNo === userSeatNo) {
        return <SelfSeat />;
    }

    if (peersState === undefined) {
        return <EmptySeat seatNo={seatNo} />;
    }

    const matchedPeer = peersState.find((peerState) => {
        return peerState.seatNo === seatNo;
    });

    return (
        <>
            {!!matchedPeer ? (
                <Container>
                    <FilledSeat peerState={matchedPeer} />
                </Container>
            ) : (
                <EmptySeat seatNo={seatNo} />
            )}
        </>
    );
}

function FilledSeat({ peerState }: PeerStateProp) {
    const peerStream = useRef<HTMLVideoElement>();
    useEffect(() => {
        peerState.peer.on("stream", (stream: MediaStream) => {
            peerStream.current!.srcObject = stream;
        });
        peerState.peer.on("close", () => {
            document.getElementById(`container-${peerState.seatNo}`)?.remove();
        });
        return () => {
            document.getElementById(`container-${peerState.seatNo}`)?.remove();
            // ref.current?.remove();
        };
    }, []);
    return <PeerCam ref={peerStream} playsInline autoPlay />;
}

function SelfSeat() {
    return <SelfContainer>사용중</SelfContainer>;
}

function EmptySeat({ seatNo }: EmptySeatProp) {
    return (
        <EmptyContainer>{`${seatNo}번 참여자를 기다리는 중`}</EmptyContainer>
    );
}

const PeerCam = styled.video`
    max-width: 100%;
    max-height: 100%;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 96%;
    height: 94%;
    border-radius: 15px;
    font-family: ${(props) => props.theme.plainTextFont};
`;

const SelfContainer = styled(Container)`
    font-size: 24px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
    letter-spacing: 5px;
    color: white;
    background-color: ${(props) => props.theme.loginMessageGray};
`;

const EmptyContainer = styled(Container)`
    font-size: 15px;
    color: white;
    background-color: black;
`;
