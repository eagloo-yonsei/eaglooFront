import React from "react";
import styled from "styled-components";
import { useRoomContext } from "../../RoomProvider";
import TimerPerSecond from "../../../../Components/Timer/Timer__PerSecond";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMicrophone,
    faMicrophoneSlash,
    faUnlock,
    faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

export function Room16SeatsControlPanel() {
    return (
        <Container>
            <StreamPanel />
            <ButtonPanel />
        </Container>
    );
}

function StreamPanel() {
    const { userStreamHTMLRef, userMuted } = useRoomContext();
    return (
        <CamContainer>
            <UserCam ref={userStreamHTMLRef} autoPlay playsInline />
            <MicrophoneIconContainer userMuted={userMuted}>
                {userMuted ? (
                    <FontAwesomeIcon icon={faMicrophoneSlash} />
                ) : (
                    <FontAwesomeIcon icon={faMicrophone} />
                )}
            </MicrophoneIconContainer>
        </CamContainer>
    );
}

function ButtonPanel() {
    const {
        peersState,
        roomInfo,
        userSeatNo,
        endTime,
        userMuted,
        userResting,
        stopSelfStream,
        muteSelfAudio,
        unmuteSelfAudio,
        haltSelfVideo,
        resumeSelfVideo,
        exitToList,
    } = useRoomContext();
    return (
        <ControlButtonContainer>
            <RoomInfo>
                <RoomName>
                    <FontAwesomeIcon icon={faUnlock} />
                    {`  ${roomInfo.roomName}`}
                </RoomName>
                <RoomPeople>
                    <FontAwesomeIcon icon={faUserAlt} />
                    {`  ${peersState.length + 1}/16`}
                </RoomPeople>
            </RoomInfo>
            <TimerContainer>
                <TimerPerSecond endTime={endTime} showSecond={true} />
            </TimerContainer>
            {/* <MySeat>{`내 자리 : ${userSeatNo}번`}</MySeat> */}
            <ButtonsRow>
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
                {/* {userResting ? (
                    <HaltMicButton
                        onClick={() => {
                            resumeSelfVideo();
                        }}
                    >{`방으로`}</HaltMicButton>
                ) : (
                    <HaltMicButton
                        onClick={() => {
                            haltSelfVideo();
                        }}
                    >{`휴게실`}</HaltMicButton>
                )} */}

                <ExitButton
                    onClick={() => {
                        stopSelfStream();
                        exitToList();
                    }}
                >
                    {`나가기`}
                </ExitButton>
            </ButtonsRow>
        </ControlButtonContainer>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 68.4%;
    height: 100%;
`;

const CamContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42%;
    height: 92.5%;
    background-color: black;
    border-radius: 15px;
    overflow: hidden;
`;

const UserCam = styled.video`
    max-width: 100%;
    max-height: 100%;
`;

const MicrophoneIconContainer = styled.div<{ userMuted: boolean }>`
    position: absolute;
    right: 24px;
    bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: ${(props) => (props.userMuted ? "36px" : "34px")};
    color: ${(props) => (props.userMuted ? "black" : "red")};
`;

const ControlButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 42%;
    height: 92.5%;
    padding: 24px 0px;
`;

const RoomInfo = styled.div`
    display: flex;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        flex-direction: column;
        gap: 16px;
    }
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 35px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const RoomName = styled.div`
    font-size: 30px;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        font-size: 24px;
    }
    color: white;
`;

const RoomPeople = styled.div`
    font-size: 20px;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        font-size: 16px;
    }
    color: ${(props) => props.theme.loginMessageGray};
`;

const TimerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    height: 64px;
    color: orange;
    font-size: 28px;
    font-family: ${(props) => props.theme.inButtonFont};
    background-color: white;
    padding: 0px 24px;
    border-radius: 12px;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        width: 90%;
        height: 46px;
    }
`;

const MySeat = styled.div`
    font-size: 20px;
    color: white;
`;

const ButtonsRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 45px;
`;

const MicrophoneControlButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 100%;
    font-size: 24px;
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
    width: 130px;
    height: 100%;
    color: white;
    font-size: 24px;
    font-family: ${(props) => props.theme.inButtonFont};
    border-radius: 15px;
    background: ${(props) => props.theme.orangeGradient};
    cursor: pointer;
`;
