import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

export default function TimerPerSecond({
    endTime,
    showSecond,
}: {
    endTime: number;
    showSecond: boolean;
}) {
    const hourRef = useRef(0);
    const minuteRef = useRef(0);
    const secondRef = useRef(0);
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);

    useEffect(() => {
        const remain = endTime - new Date().getTime();
        secondRef.current = Math.floor(remain / 1000) % 60;
        minuteRef.current = Math.floor(remain / (1000 * 60)) % 60;
        hourRef.current = Math.floor(remain / (1000 * 60 * 60));
        setSecond(secondRef.current);
        setMinute(minuteRef.current);
        setHour(hourRef.current);
    }, [endTime]);

    useEffect(() => {
        const tiking = setInterval(countDown, 1000);
        return () => {
            clearInterval(tiking);
        };
    }, []);

    // TODO (code clearance) 타이머 코드를 이렇게까지 해야하나..?
    function countDown() {
        if (secondRef.current > 0) {
            secondRef.current -= 1;
            setSecond(secondRef.current);
        } else {
            if (minuteRef.current > 0) {
                secondRef.current = 59;
                minuteRef.current -= 1;
                setSecond(secondRef.current);
                setMinute(minuteRef.current);
            } else {
                if (hourRef.current > 0) {
                    secondRef.current = 59;
                    minuteRef.current = 59;
                    hourRef.current -= 1;
                    setSecond(secondRef.current);
                    setMinute(minuteRef.current);
                    setHour(hourRef.current);
                }
            }
        }
    }

    if (!endTime) return null;

    return (
        <>
            <TimerTitle>{`남은 시간`}</TimerTitle>
            <TimerTime>
                <Hour>{`${hour >= 10 ? hour : `0${hour}`}`}</Hour>
                {`:`}
                <Minute>{`${minute >= 10 ? minute : `0${minute}`}`}</Minute>
                {showSecond && (
                    <>
                        {`:`}
                        <Second>
                            {`${second >= 10 ? second : `0${second}`}`}
                        </Second>
                    </>
                )}
            </TimerTime>
        </>
    );
}

const TimerTitle = styled.div`
    font-size: 18px;
`;

const TimerTime = styled.div`
    display: flex;
    font-size: inherit;
`;

const TimeBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
`;

const Hour = styled(TimeBox)``;
const Minute = styled(TimeBox)``;
const Second = styled(TimeBox)``;
