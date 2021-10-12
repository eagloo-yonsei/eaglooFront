import React from "react";
import styled from "styled-components";
import EntrySeat from "../Entry__Seat";

interface OuterRowProp {
    seatNums: number[];
}

export default function Entry14SeatsOuterRow({ seatNums }: OuterRowProp) {
    return (
        <Container>
            {seatNums.map((seatNo) => {
                return (
                    <RowSeat key={`seat${seatNo}`}>
                        <EntrySeat seatNo={seatNo} />
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
