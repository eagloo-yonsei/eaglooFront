import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

export default function TimerPerMinute({ endTime }: { endTime: number }) {
    const hourRef = useRef(0);
    const minuteRef = useRef(0);
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);

    useEffect(() => {
        const remain = endTime - new Date().getTime();
        minuteRef.current = Math.floor(remain / (1000 * 60)) % 60;
        hourRef.current = Math.floor(remain / (1000 * 60 * 60));
        setMinute(minuteRef.current);
        setHour(hourRef.current);
    }, [endTime]);

    useEffect(() => {
        const tiking = setInterval(countDown, 60000);
        return () => {
            clearInterval(tiking);
        };
    }, []);

    // TODO (code clearance) 타이머 코드를 이렇게까지 해야하나..?
    function countDown() {
        if (minuteRef.current > 0) {
            minuteRef.current -= 1;
            setMinute(minuteRef.current);
        } else {
            if (hourRef.current > 0) {
                minuteRef.current = 59;
                hourRef.current -= 1;
                setMinute(minuteRef.current);
                setHour(hourRef.current);
            }
        }
    }

    if (!endTime) return null;

    return (
        <>
            <Hour>{`${hour >= 10 ? hour : `0${hour}`}`}</Hour>
            {`:`}
            <Minute>{`${minute >= 10 ? minute : `0${minute}`}`}</Minute>
        </>
    );
}

const TimeBox = styled.div`
    display: flex;
    align-items: center;
    width: 47%;
`;

const Hour = styled(TimeBox)`
    justify-content: flex-end;
`;
const Minute = styled(TimeBox)`
    justify-content: flex-start;
`;
