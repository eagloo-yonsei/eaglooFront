import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useListContext } from "./ListProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

interface Seat {
    seatNo: number;
    socketId: string;
    userName?: string;
}

interface Room {
    roomNo: number;
    seats: Seat[];
}

interface RoomButtonProp {
    room: Room;
}

export default function ListPublic() {
    return (
        <Container>
            <Title />
            <RoomButtonRow />
        </Container>
    );
}

function Title() {
    return (
        <TitleContainer>
            <FormerTitle>기본 </FormerTitle>
            <RearTitle>스터디룸</RearTitle>
        </TitleContainer>
    );
}

function RoomButtonRow() {
    const { publicRooms } = useListContext();
    return (
        <RoomButtonRowContainer>
            {publicRooms.map((publicRoom) => {
                return (
                    <RoomButton
                        room={publicRoom}
                        key={`room${publicRoom.roomNo}_button`}
                    />
                );
            })}
        </RoomButtonRowContainer>
    );
}

function RoomButton({ room }: RoomButtonProp) {
    const history = useHistory();

    function pushToEntry(roomNo: number) {
        history.push({
            pathname: "/entry",
            state: { roomNo: roomNo },
        });
    }

    return (
        <RoomButtonContainer
            onClick={() => {
                pushToEntry(room.roomNo);
            }}
        >
            <RoomButtonIcon />
            <RoomButtonTitle>{`스터디룸 ${room.roomNo}`}</RoomButtonTitle>
            {/* <RoomButtonMessage>
                {`이글루에서 제공하는 스터디룸`}
            </RoomButtonMessage> */}
            <RoomButtomInfo>
                <FontAwesomeIcon icon={faUserAlt} size="1x" />
                {`${room.seats.length}/16`}
            </RoomButtomInfo>
        </RoomButtonContainer>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const TitleContainer = styled.div`
    font-size: 28px;
    margin-bottom: 32px;
`;

const FormerTitle = styled.span`
    color: ${(props) => props.theme.entryMainBlue};
`;

const RearTitle = styled.span`
    color: ${(props) => props.theme.entryLightBlue};
`;

const RoomButtonRowContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const RoomButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${(props) => props.theme.mainBlue};
    width: 20%;
    margin-bottom: 55px;
    :hover {
        cursor: pointer;
    }
`;

const RoomButtonIcon = styled.div`
    width: 90%;
    aspect-ratio: 1;
    background-color: ${(props) => props.theme.loginMessageGray};
    border-radius: 18%;
    margin-bottom: 15px;
`;

const RoomButtonTitle = styled.div`
    font-size: 18px;
    margin-bottom: 12px;
`;

// const RoomButtonMessage = styled.div`
//     font-size: 10px;
//     margin-bottom: 15px;
// `;

const RoomButtomInfo = styled.div`
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    width: 50px;
`;
