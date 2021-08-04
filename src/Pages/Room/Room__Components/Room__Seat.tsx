import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useRoomContext } from "../RoomProvider";
import { PeerStateProp } from "../../../Constants";
import CircularProgress from "@material-ui/core/CircularProgress";

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
                    <FilledSeat peer={matchedPeer.peer} seatNo={seatNo} />
                </Container>
            ) : (
                <EmptySeat seatNo={seatNo} />
            )}
        </>
    );
}

function FilledSeat({ peer, seatNo }: PeerStateProp) {
    const peerStream = useRef<HTMLVideoElement>(null);
    const [gotStream, setGotStream] = useState<boolean>(false);
    useEffect(() => {
        peer.on("stream", (stream: MediaStream) => {
            setGotStream(true);
            peerStream.current!.srcObject = stream;
        });
        peer.on("close", () => {
            setGotStream(false);
            document.getElementById(`container-${seatNo}`)?.remove();
        });
        return () => {
            document.getElementById(`container-${seatNo}`)?.remove();
            // ref.current?.remove();
        };
    }, []);
    if (gotStream) {
        return <PeerCam ref={peerStream} playsInline autoPlay />;
    } else {
        return <GettingStream />;
    }
}

function GettingStream() {
    return (
        <GettingStreamContainer>
            <GettingStreamIcon>
                <CircularProgress color="inherit" size={30} thickness={5} />
            </GettingStreamIcon>
            {`영상을 가져오는 중입니다`}
        </GettingStreamContainer>
    );
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

const GettingStreamContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 12px;
    font-family: ${(props) => props.theme.plainTextFont};
    padding-top: 15px;
`;

const GettingStreamIcon = styled.div`
    margin-bottom: 25px;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 96%;
    height: 94%;
    font-family: ${(props) => props.theme.plainTextFont};
    background-color: black;
    border-radius: 15px;
    overflow: hidden;
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
`;
