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

interface EmptySeatProp {
    seatNo: number;
}

export default function RoomSeat({ peersState, seatNo }: SeatProp) {
    const { userSeatNo } = useRoomContext();

    if (peersState === undefined) {
        return (
            <Container>
                <EmptySeat seatNo={seatNo} />
            </Container>
        );
    }

    const matchedPeer = peersState.find((peerState) => {
        return peerState.seatNo === seatNo;
    });

    return (
        <Container>
            {!!matchedPeer ? (
                <FilledSeat peerState={matchedPeer} />
            ) : (
                <EmptySeat seatNo={seatNo} />
            )}
        </Container>
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

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 96%;
    height: 94%;
    background-color: black;
    border-radius: 15px;
`;

const PeerCam = styled.video`
    max-width: 100%;
    max-height: 100%;
`;

const SelfContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 15px;
    font-family: ${(props) => props.theme.plainTextFont};
`;

const EmptyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 15px;
    font-family: ${(props) => props.theme.plainTextFont};
`;
