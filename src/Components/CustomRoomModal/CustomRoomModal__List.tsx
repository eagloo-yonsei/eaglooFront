import React from "react";
import styled from "styled-components";
import CustomRoomModalRoomButton from "./CustomRoomModal__RoomButton";
import { useCustomRoomModalContext } from "./CustomRoomModalProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function CustomRoomModalList() {
    return (
        <Container>
            <RoomListHeader />
            <RoomList />
        </Container>
    );
}

function RoomListHeader() {
    const {
        customRooms,
        searchingRoomNameInput,
        filteringRoomsByName,
        setSearchedRooms,
        setSearchingRoomNameInput,
    } = useCustomRoomModalContext();
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
                onChange={(e) => {
                    setSearchingRoomNameInput(e.target.value);
                    if (e.target.value == "") {
                        setSearchedRooms(customRooms);
                    } else {
                        filteringRoomsByName();
                    }
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        filteringRoomsByName();
                    }
                }}
            />
        </SearchHeader>
    );
}

function RoomList() {
    const { searchedRooms, loadingCustomRooms } = useCustomRoomModalContext();
    if (loadingCustomRooms) {
        return (
            <LoadingMessage>
                <LoadingIcon>
                    <CircularProgress color="inherit" size={35} thickness={5} />
                </LoadingIcon>
                {`방 정보를 불러오는 중입니다`}
            </LoadingMessage>
        );
    } else {
        return (
            <RoomListContainer>
                {searchedRooms.map((customRoom) => {
                    return (
                        <CustomRoomModalRoomButton
                            room={customRoom}
                            key={customRoom.id}
                        />
                    );
                })}
            </RoomListContainer>
        );
    }
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
    margin: 0;
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

const LoadingMessage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.entryLightBlue};
    font-size: 18px;
`;

const LoadingIcon = styled.div`
    margin-bottom: 20px;
`;

const RoomListContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;
