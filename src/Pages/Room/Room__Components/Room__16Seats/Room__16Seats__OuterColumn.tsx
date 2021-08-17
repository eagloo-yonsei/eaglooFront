import React from "react";
import styled from "styled-components";
import RoomSeat from "../Room__Seat";

interface Room16SeatsOuterColumnProp {
    seatNums: number[];
}

export default function Room16SeatsOuterColumn({
    seatNums,
}: Room16SeatsOuterColumnProp) {
    return (
        <Container>
            {seatNums.map((seatNo) => {
                return (
                    <ColumnSeat key={`seat${seatNo}`}>
                        <RoomSeat seatNo={seatNo} />
                    </ColumnSeat>
                );
            })}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 15.8%;
    height: 100%;
`;

const ColumnSeat = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50%;
    border-radius: 10px;
`;
