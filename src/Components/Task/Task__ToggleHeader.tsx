import React from "react";
import styled from "styled-components";
import { useTaskContext } from "./TaskProvider";

export default function TaskToggleHeader() {
    // const { taskOpen, toggleTaskOpen } = useTaskContext();
    return (
        <Container />
        // <Container
        //     onClick={() => {
        //         toggleTaskOpen();
        //     }}
        // >
        //     {taskOpen ? `접기` : `펼치기`}
        // </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: -30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    color: white;
    background-color: white;
    font-size: 14px;
    font-family: ${(props) => props.theme.subLabelFont};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    /* :hover {
        cursor: pointer;
    } */
`;
