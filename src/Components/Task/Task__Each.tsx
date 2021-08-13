import React, { useState } from "react";
import styled from "styled-components";
import { useTaskContext } from "./TaskProvider";
import TaskImportance from "./Task__Importance";
import { Task } from "../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TaskEach({ task }: { task: Task }) {
    const { updateTask, deleteTask } = useTaskContext();
    const [taskDone, setTaskDone] = useState<boolean>(task.done);
    const [previousTaskContent, setPreviousTaskContent] = useState<string>(
        task.content
    );
    const [taskContentInput, setTaskContentInput] = useState<string>(
        task.content
    );
    const [taskImportance, setTaskImportance] = useState<number>(
        task.importance
    );
    const [updating, setUpdating] = useState<boolean>(false);

    async function updateImportance(importance: number) {
        if (updating) {
            return;
        }
        if (
            await updateTask(task.id, taskDone, previousTaskContent, importance)
        ) {
            setTaskImportance(importance);
        }
    }

    // TODO (code clearance) Task update 시 건드리지 않는 인자는 안 보내도록 설정
    return (
        <Container>
            <ContainerLeft>
                <CheckBox
                    onClick={async () => {
                        if (updating) {
                            return;
                        }
                        setUpdating(true);
                        if (
                            updateTask(
                                task.id,
                                !taskDone,
                                previousTaskContent,
                                taskImportance
                            )
                        ) {
                            setTaskDone(!taskDone);
                        }
                        setUpdating(false);
                    }}
                >
                    {taskDone && <FontAwesomeIcon icon={faCheck} />}
                </CheckBox>
                <TaskContent
                    disabled={updating}
                    type="text"
                    spellCheck="false"
                    value={taskContentInput}
                    taskDone={taskDone}
                    onChange={(e) => {
                        if (e.target.value.length <= 30) {
                            setTaskContentInput(e.target.value);
                        }
                    }}
                    onKeyPress={async (e) => {
                        if (e.key === "Enter") {
                            setUpdating(true);
                            if (
                                updateTask(
                                    task.id,
                                    taskDone,
                                    taskContentInput,
                                    taskImportance
                                )
                            ) {
                                setPreviousTaskContent(taskContentInput);
                            }
                            setUpdating(false);
                        }
                    }}
                />
            </ContainerLeft>
            {previousTaskContent === taskContentInput ? (
                <ContainerRight>
                    <TaskImportance
                        id={task.id}
                        importance={taskImportance}
                        importanceSettingFunc={updateImportance}
                    />
                    <RemoveIcon>
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => {
                                if (updating) {
                                    return;
                                }
                                deleteTask(task.id);
                            }}
                        />
                    </RemoveIcon>
                </ContainerRight>
            ) : (
                <ContainerRight>
                    <ConfirmButton
                        onClick={() => {
                            if (updating) {
                                return;
                            }
                            setUpdating(true);
                            if (
                                updateTask(
                                    task.id,
                                    taskDone,
                                    taskContentInput,
                                    taskImportance
                                )
                            ) {
                                setPreviousTaskContent(taskContentInput);
                            }
                            setUpdating(false);
                        }}
                    >{`변경`}</ConfirmButton>
                    <CancelButton
                        onClick={() => {
                            setTaskContentInput(previousTaskContent);
                        }}
                    >{`취소`}</CancelButton>
                </ContainerRight>
            )}
        </Container>
    );
}

const RemoveIcon = styled.div`
    font-size: 16px;
    color: #79a4d8;
    :hover {
        color: #3e7bb7;
    }
    opacity: 0;
    transition: opacity 0.2s linear;
    margin-left: 15px;
    cursor: pointer;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 54px;
    padding: 10px 12px;
    &:hover {
        ${RemoveIcon} {
            opacity: 1;
        }
    }
`;

const ContainerLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 70%;
`;

const ContainerRight = styled(ContainerLeft)`
    justify-content: flex-end;
    width: 30%;
`;

const CheckBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin-right: 12px;
    border: 2.5px solid white;
    border-radius: 25%;
    color: white;
    cursor: pointer;
`;

const TaskContent = styled.input<{ taskDone: boolean }>`
    width: calc(100% - 56px);
    border: none;
    color: ${(props) => (props.taskDone ? "#79a4d8" : "black")};
    font-size: 18px;
    font-family: ${(props) => props.theme.subLabelFont};
    background-color: inherit;
    :focus {
        outline: none;
    }
`;

const ConfirmButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 30px;
    color: white;
    font-size: 16px;
    font-family: ${(props) => props.theme.inButtonFont};
    background-color: ${(props) => props.theme.mainBlue};
    border-radius: 6px;
    cursor: pointer;
`;

const CancelButton = styled(ConfirmButton)`
    background-color: red;
    margin-left: 12px;
`;
