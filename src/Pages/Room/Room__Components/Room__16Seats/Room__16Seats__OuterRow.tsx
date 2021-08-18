import React from "react";
import styled from "styled-components";
import RoomSeat from "../Room__Seat";

interface Room16SeatsOuterRowProp {
    seatNums: number[];
}

export default function Room16SeatsOuterRow({
    seatNums,
}: Room16SeatsOuterRowProp) {
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
    height: 25%;
`;

const RowSeat = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15.8%;
    height: 100%;
    border-radius: 10px;
`;
