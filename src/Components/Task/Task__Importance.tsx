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
            color={index <= importance ? colors[importance] : "white"}
            filled={index <= importance ? true : false}
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

const ImportanceCircleContainer = styled.div<{
    color?: string;
    filled: boolean;
}>`
    width: 20px;
    aspect-ratio: 1;
    margin: 0 1.5px;
    border: ${(props) =>
        props.filled ? `1px solid ${props.color}` : "1px solid #c0daff"};
    border-radius: 20%;
    background-color: ${(props) => props.color};
    :hover {
        cursor: pointer;
    }
`;
