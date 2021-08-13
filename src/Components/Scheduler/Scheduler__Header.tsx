// Shceduler Header 높이에 맞춰서 Task 높이도 수정
import React from "react";
import styled from "styled-components";

export default function SchedulerHeader() {
    const dayName = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
    ];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = dayName[today.getDay()];
    return (
        <Container>
            <DateContainer>
                <YearMonth>{`${year}년 ${month}월`}</YearMonth>
                <Day>{`${date}일 ${day}`}</Day>
            </DateContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: fit-content;
    margin-top: 18px;
    margin-bottom: 15px;
`;

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const YearMonth = styled.div`
    color: ${(props) => props.theme.mainLightBlue};
    font-size: 16.5px;
    margin-bottom: 12px;
`;

const Day = styled.div`
    font-size: 25px;
`;
