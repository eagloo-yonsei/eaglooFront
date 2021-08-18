import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useRoomContext } from "../RoomProvider";
import TimerPerMinute from "../../../Components/Timer/Timer__PerMinute";
import { Seat, PeerStateProp } from "../../../Constants";
import CircularProgress from "@material-ui/core/CircularProgress";

interface SeatProp {
    seatNo: number;
}

export default function RoomSeat({ seatNo }: SeatProp) {
    const { userSeatNo, roomInfo, peersState } = useRoomContext();
    const [matchedSeatInfo, setMatchedSeatInfo] = useState<Seat>({
        seatNo: 0,
        socketId: "",
        userEmail: "",
        endTime: 0,
    });

    useEffect(() => {
        return () => {};
    }, [userSeatNo]);

    useEffect(() => {
        const matchedSeat = roomInfo.seats.find((seat) => {
            return seat.seatNo === seatNo;
        });
        if (matchedSeat) {
            setMatchedSeatInfo(matchedSeat);
        }
    }, [roomInfo]);

    if (seatNo === userSeatNo) {
        return <SelfSeat />;
    }

    if (peersState === undefined) {
        return <EmptySeat seatNo={seatNo} />;
    }

    const matchedPeer = peersState.find((peerState) => {
        return peerState.seatInfo.seatNo === seatNo;
    });

    return (
        <>
            {!!matchedPeer ? (
                <Container>
                    <FilledSeat
                        peer={matchedPeer.peer}
                        seatInfo={matchedPeer.seatInfo}
                    />
                </Container>
            ) : (
                <EmptySeat seatNo={seatNo} />
            )}
        </>
    );
}

function FilledSeat({ peer, seatInfo }: PeerStateProp) {
    const peerStream = useRef<HTMLVideoElement>(null);
    const [gotStream, setGotStream] = useState<boolean>(false);

    useEffect(() => {
        peer.on("stream", (stream: MediaStream) => {
            setGotStream(true);
            peerStream.current!.srcObject = stream;
        });
        peer.on("close", () => {
            setGotStream(false);
            document.getElementById(`container-${seatInfo.seatNo}`)?.remove();
        });
        return () => {
            document.getElementById(`container-${seatInfo.seatNo}`)?.remove();
            // ref.current?.remove();
        };
    }, []);

    if (gotStream) {
        return (
            <>
                <PeerCam ref={peerStream} playsInline autoPlay />
                <TimerContainer>
                    <TimerPerMinute endTime={seatInfo.endTime} />
                </TimerContainer>
            </>
        );
    } else {
        return <GettingStream />;
    }
}

function GettingStream() {
    return (
        <GettingStreamContainer>
            <CircularProgress color="inherit" size={30} thickness={5} />
            {`영상을 가져오는 중입니다`}
        </GettingStreamContainer>
    );
}

function SelfSeat() {
    return <SelfContainer>{`사용중`}</SelfContainer>;
}

function EmptySeat({ seatNo }: SeatProp) {
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
    gap: 25px;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 12px;
    font-family: ${(props) => props.theme.plainTextFont};
    padding-top: 15px;
`;

const Container = styled.div`
    position: relative;
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

const TimerContainer = styled.div`
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 28px;
    color: white;
    background-color: black;
    font-size: 18px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const SelfContainer = styled(Container)`
    font-size: 24px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
    letter-spacing: 5px;
    color: white;
    background-color: ${(props) => props.theme.loginMessageGray};
`;

const EmptyContainer = styled(Container)`
    font-size: 16px;
    color: white;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        font-size: 12px;
    }
`;
