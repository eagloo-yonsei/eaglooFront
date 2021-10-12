import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useCustomRoomModalContext } from "./CustomRoomModalProvider";
import { CustomRoom } from "../../Constants";
import fatIcon from "../../Resources/Img/icon-fat.png";

interface CustomRoomButtonProp {
    room: CustomRoom;
}

export default function CustomRoomModalRoomButton({
    room,
}: CustomRoomButtonProp) {
    const { selectedRoomId, selectRoom } = useCustomRoomModalContext();

    return (
        <Container
            roomId={room.id}
            selectedRoomId={selectedRoomId}
            onClick={() => {
                selectRoom(room.id);
            }}
        >
            <RoomIcon src={fatIcon} />
            <RoomContentContainer>
                <RoomName>{`${room.roomName}`}</RoomName>
                <RoomDescription>
                    {room.roomDescription ? room.roomDescription : ""}
                </RoomDescription>
                <RoomState>
                    <FontAwesomeIcon icon={faUserAlt} />
                    {`  ${room.seats.length}/14`}
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

// const RoomIcon = styled.div`
//     height: 100%;
//     aspect-ratio: 1;
//     background-color: white;
//     border-radius: 24px;
//     margin-right: 15px;
//     border: 3px solid black;
// `;

const RoomIcon = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    aspect-ratio: 1;
    border-radius: 24px;
    margin-right: 15px;
    overflow: hidden;
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
