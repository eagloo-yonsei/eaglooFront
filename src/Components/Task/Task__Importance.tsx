import React from "react";
import styled from "styled-components";

interface TaskImportanceProp {
    id?: string;
    importance: number;
    importanceSettingFunc: (importance: number) => void;
}

export default function TaskImportance({
    id,
    importance,
    importanceSettingFunc,
}: TaskImportanceProp) {
    const indexes = [1, 2, 3];
    return (
        <Container>
            {indexes.map((index) => {
                return (
                    <ImportanceCircle
                        key={
                            id
                                ? `${id}_impotance${index}`
                                : `newTask_importance${index}`
                        }
                        index={index}
                        importance={importance}
                        importanceSettingFunc={importanceSettingFunc}
                    />
                );
            })}
        </Container>
    );
}

interface ImportanceCircleProp {
    index: number;
    importance: number;
    importanceSettingFunc: (importance: number) => void;
}

function ImportanceCircle({
    index,
    importance,
    importanceSettingFunc,
}: ImportanceCircleProp) {
    const colors = ["#c0daff", "#71af78", "#f9d953", "#f27872"];

    return (
        <ImportanceCircleContainer
            color={index <= importance ? colors[importance] : colors[0]}
            onClick={() => {
                importanceSettingFunc(index);
            }}
        />
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 48px;
    height: 100%;
`;

const ImportanceCircleContainer = styled.div<{ color: string }>`
    width: 10px;
    height: 10px;
    margin: 0 3px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    :hover {
        cursor: pointer;
    }
`;
