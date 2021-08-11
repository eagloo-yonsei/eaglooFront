import React from "react";
import styled from "styled-components";
import { ChattingContent } from "../../../../Constants";
import { useAppContext } from "../../../../Routes/App/AppProvider";
import { useRoomChattingContext } from "./Room__ChattingProvider";

export default function RoomChattingBody() {
    const { chattings } = useRoomChattingContext();

    if (chattings.length === 0) {
        return (
            <Container>
                <EmptyContainer>
                    {`같은 방의 참여자들과 대화를 나눠보세요!`}
                </EmptyContainer>
            </Container>
        );
    } else {
        return (
            <Container>
                {chattings.map((chatting, index) => {
                    return (
                        <ChattingEach
                            key={`${chatting.user?.id}:${chatting.content}@${chatting.key}`}
                            chatting={chatting}
                            index={index}
                        />
                    );
                })}
            </Container>
        );
    }
}

interface ChattingEachProp {
    chatting: ChattingContent;
    index: number;
}

interface ChattingEachComponentProp {
    chatting: ChattingContent;
    isSelfMessage: boolean;
    index: number;
}

function ChattingEach({ chatting, index }: ChattingEachProp) {
    const { userInfo } = useAppContext();
    const { scrollerRef } = useRoomChattingContext();
    const isSelfMessage = chatting.user?.id === userInfo?.id;

    return (
        <ChattingContainer isSelfMessage={isSelfMessage}>
            {!isSelfMessage && <SenderInfo chatting={chatting} index={index} />}
            <MessageContent
                chatting={chatting}
                isSelfMessage={isSelfMessage}
                index={index}
            />
            <Scroller ref={scrollerRef} />
        </ChattingContainer>
    );
}

function SenderInfo({ chatting, index }: ChattingEachProp) {
    const { chattings } = useRoomChattingContext();
    if (
        chattings[index - 1] &&
        chattings[index - 1].user?.id === chatting.user?.id
    ) {
        return null;
    } else {
        return (
            // TODO (potential bug) 이메일 길이가 6자 미만인 경우
            <SenderInfoContainer>{`${chatting.user?.email.slice(
                0,
                6
            )}**** 님`}</SenderInfoContainer>
        );
    }
}

function MessageContent({
    chatting,
    isSelfMessage,
    index,
}: ChattingEachComponentProp) {
    return (
        <MessageBox isSelfMessage={isSelfMessage}>
            {`${chatting.content}`}
            <TimeStamp
                chatting={chatting}
                isSelfMessage={isSelfMessage}
                index={index}
            />
        </MessageBox>
    );
}

function TimeStamp({
    chatting,
    isSelfMessage,
    index,
}: ChattingEachComponentProp) {
    const { chattings } = useRoomChattingContext();
    if (
        chattings[index + 1] &&
        chattings[index + 1].user?.id === chatting.user?.id &&
        chattings[index + 1].writtenTime === chatting.writtenTime
    ) {
        return null;
    } else {
        return (
            <MessageBoxTimeStamp isSelfMessage={isSelfMessage}>
                {`${chatting.writtenTime}`}
            </MessageBoxTimeStamp>
        );
    }
}

const EmptyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 16px;
    font-family: ${(props) => props.theme.subLabelFont};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 120px);
    border-top: 2px solid white;
    border-bottom: 2px solid white;
    padding: 12px 0px;
    overflow-y: auto;
`;

const ChattingContainer = styled.div<{ isSelfMessage: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${(props) =>
        props.isSelfMessage ? "flex-end" : "flex-start"};
    width: 100%;
    height: fit-content;
    padding: 0px 20px;
    margin-bottom: 12px;
`;

const SenderInfoContainer = styled.div`
    color: ${(props) => props.theme.chattingPeerMessage};
    font-size: 14px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
    margin-bottom: 7px;
`;

const MessageBox = styled.div<{ isSelfMessage: boolean }>`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    max-width: 70%;
    height: fit-content;
    font-size: 18px;
    font-family: ${(props) => props.theme.subLabelFont};
    line-height: 24px;
    border-radius: 12px;
    padding: 10px 15px;
    border-top-right-radius: ${(props) => (props.isSelfMessage ? "0px" : "")};
    border-top-left-radius: ${(props) => (props.isSelfMessage ? "" : "0px")};
    color: ${(props) =>
        props.isSelfMessage
            ? props.theme.chattingSelfMessage
            : props.theme.chattingPeerMessage};
    background-color: ${(props) =>
        props.isSelfMessage
            ? props.theme.chattingSelfMessageBox
            : props.theme.chattingPeerMessageBox};
`;

const MessageBoxTimeStamp = styled.div<{ isSelfMessage: boolean }>`
    position: absolute;
    bottom: 0px;
    left: ${(props) => (props.isSelfMessage ? "-50px" : "")};
    right: ${(props) => (props.isSelfMessage ? "" : "-50px")};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: fit-content;
    color: ${(props) => props.theme.chattingPeerMessage};
    font-size: 14px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const Scroller = styled.div`
    width: 100%;
    height: 0px;
`;
