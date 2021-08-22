import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
import { useRoomContext } from "./RoomProvider";
import Room16Seats from "./Room__Components/Room__16Seats";
import RoomChattingOpenButton from "./Room__Components/Room__Chatting/Room__Chatting__OpenButton";
import RoomChatting from "./Room__Components/Room__Chatting";
import { FullScreenContainer } from "../../Styles/StyledComponents";

export default function RoomContainer() {
    return (
        <Container>
            <Room16Seats />
            <RoomChatting />
            <RoomChattingOpenButton />
        </Container>
    );
}

const Container = styled(FullScreenContainer)`
    position: relative;
    display: flex;
    flex-direction: column;
    font-family: ${(props) => props.theme.plainTextFont};
    padding: 50px 30px;
`;
