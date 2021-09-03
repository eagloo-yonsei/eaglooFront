import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../../../Routes/App/AppProvider";
import { useRoomContext } from "../RoomProvider";
import TimerPerMinute from "../../../Components/Timer/Timer__PerMinute";
import { PeerStateProp, SocketChannel } from "../../../Constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMicrophone,
    faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

interface SeatProp {
    seatNo: number;
}

export default function RoomSeat({ seatNo }: SeatProp) {
    const { roomUsingInfo } = useAppContext();
    const { peersState, restingPeersSeatNo } = useRoomContext();
    const [peerResting, setPeerResting] = useState<boolean>(false);

    const matchedPeer = peersState.find((peerState) => {
        return peerState.seatInfo.seatNo === seatNo;
    });

    useEffect(() => {
        if (restingPeersSeatNo.includes(seatNo)) {
            console.log(`${seatNo}번 참여자 휴게실 입장`);
            setPeerResting(true);
        } else {
            setPeerResting(false);
        }
        return () => {};
    }, [restingPeersSeatNo]);

    if (seatNo === roomUsingInfo!.seatNo) {
        return <SelfSeat />;
    }

    if (peerResting) {
        return <PeerResting />;
    }

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
    const peerStreamHTMLRef = useRef<HTMLVideoElement>(null);
    const [gotStream, setGotStream] = useState<boolean>(false);
    const [peerMuted, setPeerMuted] = useState<boolean>(
        !seatInfo.streamState.audio
    );
    const decoder = new TextDecoder();

    useEffect(() => {
        peer?.on("stream", (stream: MediaStream) => {
            setGotStream(true);
            peerStreamHTMLRef.current!.srcObject = stream;
        });
        peer?.on("data", (chunk) => {
            const chunkData = decoder.decode(chunk);
            if (chunkData == SocketChannel.HALT_AUDIO) {
                setPeerMuted(true);
            }
            if (chunkData == SocketChannel.RESUME_AUDIO) {
                setPeerMuted(false);
            }
        });
        peer?.on("close", () => {
            setGotStream(false);
            peer?.removeAllListeners();
        });
        return () => {
            peer?.removeAllListeners();
            peerStreamHTMLRef.current?.remove();
        };
    }, []);

    if (gotStream) {
        return (
            <>
                <PeerCam ref={peerStreamHTMLRef} playsInline autoPlay />
                <MicrophoneIconContainer peerMuted={peerMuted}>
                    {peerMuted ? (
                        <FontAwesomeIcon icon={faMicrophoneSlash} />
                    ) : (
                        <FontAwesomeIcon icon={faMicrophone} />
                    )}
                </MicrophoneIconContainer>
                <TimerContainer>
                    <TimerPerMinute endTime={seatInfo.endTime} />
                </TimerContainer>
            </>
        );
    } else {
        return <GettingStream />;
    }
}

function PeerResting() {
    return <GettingStreamContainer>{`휴식중`}</GettingStreamContainer>;
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

const MicrophoneIconContainer = styled.div<{ peerMuted: boolean }>`
    position: absolute;
    right: 12px;
    bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    font-size: ${(props) => (props.peerMuted ? "26px" : "24px")};
    color: ${(props) => (props.peerMuted ? "black" : "red")};
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
