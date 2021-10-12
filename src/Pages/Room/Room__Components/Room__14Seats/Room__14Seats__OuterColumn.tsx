import React from "react";
import styled from "styled-components";
import RoomSeat from "../Room__Seat";
import RoomControlButtons from "../Room__ControlButtons";

interface Room14SeatsOuterColumnProp {
    seatNums: number[];
}

export default function Room14SeatsOuterColumn({
    seatNums,
}: Room14SeatsOuterColumnProp) {
    return (
        <Container>
            {seatNums.map((seatNo) => {
                return (
                    <ColumnSeat key={`seat${seatNo}`}>
                        <RoomSeat seatNo={seatNo} />
                    </ColumnSeat>
                );
            })}
            {seatNums.length != 4 && (
                <ColumnSeat>
                    <RoomControlButtons />
                </ColumnSeat>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 14%;
    height: 100%;
`;

const ColumnSeat = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 25%;
    border-radius: 10px;
`;
