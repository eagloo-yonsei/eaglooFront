import React from "react";
import styled from "styled-components";
import { useRoomChattingContext } from "./Room__ChattingProvider";

export default function RoomChattingInput() {
    const {
        chattingInput,
        setChattingInput,
        sendChatting,
        chatSending,
        chattingInputRef,
    } = useRoomChattingContext();
    return (
        <Container>
            <ChattingInput
                ref={chattingInputRef}
                disabled={chatSending}
                type="text"
                spellCheck="false"
                value={chattingInput}
                placeholder="메세지 입력"
                onChange={(e) => {
                    if (e.target.value.length <= 120) {
                        setChattingInput(e.target.value);
                    }
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        sendChatting();
                    }
                }}
            />
            <ChattingSendButton
                onClick={() => {
                    sendChatting();
                }}
            >
                {`전송`}
            </ChattingSendButton>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 0px 25px;
`;

const ChattingInput = styled.input`
    width: 100%;
    height: 100%;
    font-size: 15px;
    font-family: ${(props) => props.theme.subLabelFont};
    border-radius: 5px;
    padding: 0px 80px 0px 12px;
    border: none;
    :focus {
        outline: none;
    }
    ::placeholder {
        font-family: ${(props) => props.theme.subLabelFont};
    }
`;

const ChattingSendButton = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 9px;
    right: 38px;
    width: 60px;
    height: 30px;
    color: white;
    font-family: ${(props) => props.theme.subLabelFont};
    background-color: ${(props) => props.theme.mainBlue};
    border-radius: 5px;
    :hover {
        cursor: pointer;
    }
`;
