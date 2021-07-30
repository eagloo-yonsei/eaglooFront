import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useCustomRoomModalContext } from "./CustomRoomModalProvider";

interface RoomButtonProp {
    roomName: string;
    roomDescription?: string;
    roomId: string;
}

export default function CustomRoomModalRoomButton({
    roomName,
    roomDescription,
    roomId,
}: RoomButtonProp) {
    const { selectedRoomId, selectRoom } = useCustomRoomModalContext();

    return (
        <Container
            roomId={roomId}
            selectedRoomId={selectedRoomId}
            onClick={() => {
                selectRoom(roomId);
            }}
        >
            <RoomIcon />
            <RoomContentContainer>
                <RoomName>{`${roomName}`}</RoomName>
                <RoomDescription>
                    {roomDescription ? roomDescription : ""}
                </RoomDescription>
                <RoomState>
                    <FontAwesomeIcon icon={faUserAlt} />
                    {`  0/16`}
                </RoomState>
            </RoomContentContainer>
        </Container>
    );
}

interface ContainerProp {
    roomId: string;
    selectedRoomId: string;
}

const Container = styled.div<ContainerProp>`
    display: flex;
    width: 100%;
    height: 100px;
    padding: 5px 20px;
    :hover {
        cursor: pointer;
    }
    background-color: ${(props) =>
        props.roomId === props.selectedRoomId
            ? props.theme.loginMessageGray
            : "none"};
`;

const RoomIcon = styled.div`
    height: 100%;
    aspect-ratio: 1;
    background-color: white;
    border-radius: 24px;
    margin-right: 15px;
    border: 3px solid black;
`;

const RoomContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${(props) => props.theme.entryMainBlue};
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const RoomName = styled.div`
    font-size: 19px;
    padding-bottom: 6px;
`;

const RoomDescription = styled.div`
    font-size: 12px;
    padding-bottom: 12px;
`;

const RoomState = styled.div`
    font-size: 14px;
`;
