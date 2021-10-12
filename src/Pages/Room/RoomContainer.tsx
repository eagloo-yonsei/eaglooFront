import React from "react";
import styled from "styled-components";
import RoomHeader from "./Room__Components/Room__Header";
import Room14Seats from "./Room__Components/Room__14Seats";
import RoomChattingOpenButton from "./Room__Components/Room__Chatting/Room__Chatting__OpenButton";
import RoomChatting from "./Room__Components/Room__Chatting";
import { FullScreenContainer } from "../../Styles/StyledComponents";

export default function RoomContainer() {
    return (
        <Container>
            <RoomHeader />
            <Room14Seats />
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
    padding: 30px;
`;
