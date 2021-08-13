import React from "react";
import styled from "styled-components";
import TaskToggleHeader from "./Task__ToggleHeader";
import TaskBody from "./Task__Body";
import TaskInput from "./Task__Input";
import { useTaskContext } from "./TaskProvider";

export default function TaskContainer() {
    const { taskOpen } = useTaskContext();
    return (
        <TaskOuterContainer taskOpen={taskOpen}>
            <TaskInnerContainer>
                <TaskToggleHeader />
                <TaskBody />
                <TaskInput />
            </TaskInnerContainer>
        </TaskOuterContainer>
    );
}

const TaskOuterContainer = styled.div<{ taskOpen: boolean }>`
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: ${(props) => (props.taskOpen ? "calc(100% - 130px)" : "50px")};
    padding: 0px 25px;
    transition: all 0.5s ${(props) => props.theme.animationCubic};
`;

const TaskInnerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
`;
