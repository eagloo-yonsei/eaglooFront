import React, { useEffect } from "react";
import styled from "styled-components";
import RoomChattingHeader from "./Room__Chatting__Header";
import RoomChattingBody from "./Room__Chatting__Body";
import RoomChattingInput from "./Room__Chatting__Input";
import { useRoomContext } from "../../RoomProvider";
import { useRoomChattingContext } from "./Room__ChattingProvider";
import { Channel, ChattingContent } from "../../../../Constants";

export default function RoomChattingContainer() {
    const { socketRef, chattingOpen } = useRoomContext();
    const { updateChatting } = useRoomChattingContext();

    useEffect(() => {
        // TODO (SIGNIFICANT) !#socket !#useEffect
        // setTimeout을 걸지 않으면 socketRef에 socket이 연결되기 전에 먼저 가져오는 경우가 발생
        setTimeout(() => {
            socketRef?.current?.on(
                Channel.RECEIVE_CHATTING,
                (payload: { chattingContent: ChattingContent }) => {
                    updateChatting(payload.chattingContent);
                }
            );
        }, 200);
        return () => {};
    }, []);

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
    top: 50px;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 540px;
    height: calc(100% - 100px);
    background-color: ${(props) => props.theme.chattingBackgroundBlue};
    padding: 24px 32px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    transform: translate(
        ${(props) => {
            return props.chattingOpen ? "0" : "540px";
        }}
    );
    transition: all 0.5s ${(props) => props.theme.animationCubic};
`;
