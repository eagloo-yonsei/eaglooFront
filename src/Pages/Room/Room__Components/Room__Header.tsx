import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../../Routes/App/AppProvider";
import { useRoomContext } from "../RoomProvider";
import TimerPerSecond from "../../../Components/Timer/Timer__PerSecond";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock, faUserAlt } from "@fortawesome/free-solid-svg-icons";

export default function RoomHeader() {
    const { roomUsingInfo } = useAppContext();
    const { roomInfo, peersState } = useRoomContext();

    return (
        <Container>
            <RoomInfo>
                <RoomName>
                    <FontAwesomeIcon
                        icon={
                            "usePassword" in roomInfo && roomInfo.usePassword
                                ? faLock
                                : faUnlock
                        }
                    />
                    {`  ${roomUsingInfo?.roomName}`}
                </RoomName>
                <RoomPeople>
                    <FontAwesomeIcon icon={faUserAlt} />
                    {`  ${peersState.length + 1}/14`}
                </RoomPeople>
            </RoomInfo>
            <TimerContainer>
                <TimerPerSecond
                    endTime={roomUsingInfo!.endTime}
                    showSecond={true}
                />
            </TimerContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-left: 25px;
    padding-right: 50px;
    margin-bottom: 20px;
`;

const RoomInfo = styled.div`
    display: flex;
    gap: 24px;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        gap: 14px;
    }
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    height: 100%;
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
    width: 240px;
    height: 100%;
    color: ${(props) => props.theme.loginMessageGray};
    font-size: 32px;
    font-family: ${(props) => props.theme.inButtonFont};
`;
