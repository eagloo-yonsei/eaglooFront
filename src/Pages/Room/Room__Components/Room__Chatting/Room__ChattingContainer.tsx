import React from "react";
import styled from "styled-components";
import RoomChattingHeader from "./Room__Chatting__Header";
import RoomChattingBody from "./Room__Chatting__Body";
import RoomChattingInput from "./Room__Chatting__Input";
import { useRoomContext } from "../../RoomProvider";

export default function RoomChattingContainer() {
    const { chattingOpen } = useRoomContext();

    return (
        <Container chattingOpen={chattingOpen}>
            <RoomChattingHeader />
            <RoomChattingBody />
            <RoomChattingInput />
        </Container>
    );
}

const Container = styled.div<{ chattingOpen: boolean }>`
    position: absolute;
    top: 45px;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: ${(props) => props.theme.slideMenuWidth};
    height: calc(100% - 90px);
    background-color: ${(props) => props.theme.chattingBackgroundBlue};
    padding: 24px 32px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    transform: translate(
        ${(props) => {
            return props.chattingOpen ? "0" : props.theme.slideMenuWidth;
        }}
    );
    transition: all 0.5s ${(props) => props.theme.animationCubic};
`;
