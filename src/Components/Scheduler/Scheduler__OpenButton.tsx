import React from "react";
import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../Routes/App/AppProvider";
import { todoLessPages } from "../../Constants";

export default function SchedulerOpenButton() {
    if (todoLessPages.includes(useLocation().pathname)) return null;
    const { toggleSchedulerOpen } = useAppContext();
    return (
        <Container
            onClick={() => {
                toggleSchedulerOpen();
            }}
        >
            {/* TODO (code clearance) TODO 버튼 글씨 */}
            <TODOIcon>
                <TODOLetter>{`T`}</TODOLetter>
                <TODOLetter>{`O`}</TODOLetter>
            </TODOIcon>
            <TODOIcon>
                <TODOLetter>{`D`}</TODOLetter>
                <TODOLetter>{`O`}</TODOLetter>
            </TODOIcon>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 120px;
    right: 0;
    width: 65px;
    height: 65px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    background-color: white;
    animation: ${buttonShow} 0.8s ${(props) => props.theme.animationCubic};
    :hover {
        cursor: pointer;
    }
    padding-top: 6px;
`;

const TODOIcon = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 29px;
    height: 20px;
`;

const TODOLetter = styled.div`
    font-size: 18px;
    font-family: ${(props) => props.theme.iconFont};
    color: ${(props) => props.theme.mainBlue};
`;
