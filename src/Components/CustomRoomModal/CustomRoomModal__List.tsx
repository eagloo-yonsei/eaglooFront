import React from "react";
import styled from "styled-components";
import CustomRoomModalRoomButton from "./CustomRoomModal__RoomButton";
import { useCustomRoomModalContext } from "./CustomRoomModalProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const sampleRooms = [
    {
        roomName: "샘플 방",
        roomDescription: "샘플로 만들어 본 방",
        roomId: "1",
    },
    {
        roomName: "샘플 방",
        roomDescription: "예시로 만들어 본 방",
        roomId: "2",
    },
    {
        roomName: "샘플 방",
        roomDescription: "임시로 만들어 본 방",
        roomId: "3",
    },
    { roomName: "샘플 방", roomDescription: "그냥 만들어 본 방", roomId: "4" },
    {
        roomName: "샘플 방",
        roomDescription: "하나쯤 더 만들어 본 방",
        roomId: "5",
    },
];

export default function CustomRoomModalList() {
    return (
        <Container>
            <RoomListHeader />
            <RoomList />
        </Container>
    );
}

function RoomListHeader() {
    const { searchingRoomNameInput, setsearchingRoomNameInput } =
        useCustomRoomModalContext();
    return (
        <SearchHeader>
            <SearchIcon>
                <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
            <SearchBox
                type="text"
                spellCheck="false"
                value={searchingRoomNameInput}
                placeholder="방 이름을 입력해주세요"
                onChange={(e) => setsearchingRoomNameInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        // TODO (utility)
                    }
                }}
            />
        </SearchHeader>
    );
}

function RoomList() {
    return (
        <RoomListContainer>
            {sampleRooms.map((sampleRoom) => {
                return (
                    <CustomRoomModalRoomButton
                        roomName={sampleRoom.roomName}
                        roomDescription={sampleRoom.roomDescription}
                        roomId={sampleRoom.roomId}
                        key={sampleRoom.roomDescription}
                    />
                );
            })}
        </RoomListContainer>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 200px);
    height: 100%;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const SearchHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 36px;
    padding-top: 5px;
    margin-bottom: 24px;
`;

const SearchIcon = styled.div`
    font-size: 24px;
    color: ${(props) => props.theme.entryMainBlue};
    margin-right: 16px;
`;

const SearchBox = styled.input`
    width: 360px;
    height: 28px;
    padding: 0 15px;
    color: white;
    background-color: ${(props) => props.theme.customRoomModalInputBoxBlue};
    font-family: ${(props) => props.theme.plainTextFont};
    border: none;
    border-radius: 5px;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: white;
        font-family: ${(props) => props.theme.plainTextFont};
    }
`;

const RoomListContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;
