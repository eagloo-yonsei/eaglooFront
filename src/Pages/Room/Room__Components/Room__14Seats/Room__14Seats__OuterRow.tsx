import React from "react";
import styled from "styled-components";
import RoomSeat from "../Room__Seat";

interface Room14SeatsOuterRowProp {
    seatNums: number[];
}

export default function Room14SeatsOuterRow({
    seatNums,
}: Room14SeatsOuterRowProp) {
    return (
        <Container>
            {seatNums.map((seatNo) => {
                return (
                    <RowSeat key={`seat${seatNo}`}>
                        <RoomSeat seatNo={seatNo} />
                    </RowSeat>
                );
            })}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 20%;
`;

const RowSeat = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14%;
    height: 100%;
    border-radius: 10px;
`;
