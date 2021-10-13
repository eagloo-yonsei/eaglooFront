import React from "react";
import styled from "styled-components";
import { useRoomContext } from "../RoomProvider";

export default function RoomControlButtons() {
    const { stopSelfStream, exitToList } = useRoomContext();

    return (
        <Container>
            <MicControlButton />
            <ExitButton
                onClick={() => {
                    stopSelfStream();
                    exitToList();
                }}
            >
                {`나가기`}
            </ExitButton>
        </Container>
    );
}

function MicControlButton() {
    const { roomInfo, userMuted, muteSelfAudio, unmuteSelfAudio } =
        useRoomContext();

    if ("allowMic" in roomInfo && roomInfo.allowMic) {
        return (
            <>
                {userMuted ? (
                    <ResumeMicButton
                        onClick={() => {
                            unmuteSelfAudio();
                        }}
                    >{`음소거 해제`}</ResumeMicButton>
                ) : (
                    <HaltMicButton
                        onClick={() => {
                            muteSelfAudio();
                        }}
                    >{`음소거`}</HaltMicButton>
                )}
            </>
        );
    } else {
        return null;
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 100%;
`;

const MicrophoneControlButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40%;
    font-size: 21px;
    font-family: ${(props) => props.theme.inButtonFont};
    border-radius: 15px;
    padding: 15px;
    cursor: pointer;
`;

const HaltMicButton = styled(MicrophoneControlButton)`
    color: red;
    border: 3px solid red;
`;
const ResumeMicButton = styled(MicrophoneControlButton)`
    color: white;
    border: 3px solid white;
`;

const ExitButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40%;
    color: white;
    font-size: 24px;
    font-family: ${(props) => props.theme.inButtonFont};
    border-radius: 15px;
    background: ${(props) => props.theme.orangeGradient};
    cursor: pointer;
`;
