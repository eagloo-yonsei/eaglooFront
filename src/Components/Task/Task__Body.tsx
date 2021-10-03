import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
import { useTaskContext } from "./TaskProvider";
import TaskEach from "./Task__Each";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function TaskBody() {
    const { isLoggedIn } = useAppContext();
    const { taskOpen, tasks, taskLoading, taskLoadingError } = useTaskContext();

    if (!isLoggedIn) {
        return <Unauthorized />;
    }

    if (taskLoading) {
        return <TaskLoading />;
    }

    if (taskLoadingError) {
        return <TaskLoadingError />;
    }

    if (!taskLoading && tasks.length === 0) {
        return <TaskEmpty />;
    }

    return (
        <Container taskOpen={taskOpen}>
            <TaskSorter />
            <ScrollContainer>
                {tasks.map((task) => {
                    return <TaskEach key={task.id} task={task} />;
                })}
            </ScrollContainer>
        </Container>
    );
}

// TODO (code clearance) task body 예쁘게 케이싱할 것

function Unauthorized() {
    const { taskOpen } = useTaskContext();
    return (
        <Container
            taskOpen={taskOpen}
        >{`이글루 회원이 되어 스케쥴러 기능을 사용해보세요!`}</Container>
    );
}

function TaskLoading() {
    const { taskOpen } = useTaskContext();
    return (
        <Container taskOpen={taskOpen}>{`일정을 가져오는 중입니다`}</Container>
    );
}

function TaskLoadingError() {
    const { taskOpen } = useTaskContext();
    return (
        <Container taskOpen={taskOpen}>
            {`일정을 불러오는 데 실패했습니다.`}
        </Container>
    );
}

function TaskEmpty() {
    const { taskOpen } = useTaskContext();
    return (
        <Container taskOpen={taskOpen}>
            {`아직 일정이 없습니다. 새로운 일정을 추가해 보세요!`}
        </Container>
    );
}

function TaskSorter() {
    const { taskSorted, sortedByImportanceAscending, sortTasksByImportance } =
        useTaskContext();
    return (
        <TaskSorterContainer>
            <TaskSortMessage
                onClick={() => {
                    sortTasksByImportance(true);
                }}
            >{`중요도순`}</TaskSortMessage>
            {taskSorted && (
                <FontAwesomeIcon
                    icon={sortedByImportanceAscending ? faCaretUp : faCaretDown}
                />
            )}
        </TaskSorterContainer>
    );
}

const Container = styled.div<{ taskOpen: boolean }>`
    position: absolute;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
    font-family: ${(props) => props.theme.subLabelFont};
    padding: 0px 16px 50px 16px; // TaskInput heigth
    padding-top: ${(props) => (props.taskOpen ? "15px" : "0px")};
    overflow: hidden;
`;

const TaskSorterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 9px;
    width: 100%;
    height: 50px;
    color: ${(props) => props.theme.taskLightBlue};
`;

const TaskSortMessage = styled.div`
    font-size: 16px;
    cursor: pointer;
`;

const ScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: auto;
`;
