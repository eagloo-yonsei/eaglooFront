import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
import SchedulerHeader from "./Scheduler__Header";
import Task from "../Task";

export default function SchedulerContainer() {
    const { schedulerOpen } = useAppContext();
    return (
        <SchedulerOuterContainer schedulerOpen={schedulerOpen}>
            <SchedulerInnerContainer>
                <Container>
                    <SchedulerHeader />
                </Container>
                <Task />
            </SchedulerInnerContainer>
        </SchedulerOuterContainer>
    );
}

const SchedulerOuterContainer = styled.div<{ schedulerOpen: boolean }>`
    position: absolute;
    top: 120px;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: ${(props) => props.theme.slideMenuWidth};
    height: calc(100% - 190px);
    background-color: white;
    padding: 10px 20px 0px 20px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    transform: translate(
        ${(props) => {
            return props.schedulerOpen ? "0" : props.theme.slideMenuWidth;
        }}
    );
    transition: all 0.5s ${(props) => props.theme.animationCubic};
    box-shadow: ${(props) =>
        props.schedulerOpen && "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"};
`;

const SchedulerInnerContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
`;
