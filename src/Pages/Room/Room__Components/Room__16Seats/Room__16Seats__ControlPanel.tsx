import React from "react";
import styled from "styled-components";
import { useRoomContext } from "../../RoomProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock, faUserAlt } from "@fortawesome/free-solid-svg-icons";

export function Room16SeatsControlPanel() {
    return (
        <Container>
            <UserStream />
            <ControlButtons />
        </Container>
    );
}

function UserStream() {
    const { userStreamRef } = useRoomContext();
    return (
        <CamContainer>
            <UserCam ref={userStreamRef} autoPlay playsInline />
        </CamContainer>
    );
}

function ControlButtons() {
    const {
        peersState,
        roomType,
        roomInfo,
        userSeatNo,
        stopSelfStream,
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
            <MySeat>{`내 자리 : ${userSeatNo}번`}</MySeat>
            <ExitButton
                onClick={() => {
                    stopSelfStream();
                    exitToList();
                }}
            >
                {`나가기`}
            </ExitButton>
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
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 35px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const RoomName = styled.div`
    font-size: 30px;
    color: white;
`;

const RoomPeople = styled.div`
    font-size: 20px;
    color: ${(props) => props.theme.loginMessageGray};
`;

const MySeat = styled.div`
    font-size: 20px;
    color: white;
`;

const ExitButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 45px;
    color: white;
    font-size: 24px;
    font-family: ${(props) => props.theme.inButtonFont};
    border-radius: 15px;
    background: ${(props) => props.theme.orangeGradient};
    :hover {
        cursor: pointer;
    }
`;
