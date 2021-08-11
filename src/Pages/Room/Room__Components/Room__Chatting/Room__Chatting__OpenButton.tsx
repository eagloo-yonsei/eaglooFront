import React from "react";
import styled, { keyframes } from "styled-components";
import { useRoomContext } from "../../RoomProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function RoomChattingOpenButton() {
    const { setChattingOpen } = useRoomContext();
    return (
        <Container
            onClick={() => {
                setChattingOpen(true);
            }}
        >
            <FontAwesomeIcon icon={faCommentDots} size="2x" />
        </Container>
    );
}

const buttonShow = keyframes`
    from{
        transform: translateX(65px);
    }
    to{
        transform: translateX(0);
    }
`;

const Container = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 60px;
    right: 0;
    width: 65px;
    height: 65px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    color: #ffffff;
    background-color: ${(props) => props.theme.mainBlue};
    animation: ${buttonShow} 0.8s ${(props) => props.theme.animationCubic};
    :hover {
        cursor: pointer;
    }
`;
