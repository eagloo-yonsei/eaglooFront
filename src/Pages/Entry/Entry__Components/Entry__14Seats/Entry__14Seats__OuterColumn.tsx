import React from "react";
import styled from "styled-components";
import EntrySeat from "../Entry__Seat";

interface OuterColumnProp {
    seatNums: number[];
}

export default function Entry14SeatsOuterColumn({ seatNums }: OuterColumnProp) {
    return (
        <Container>
            {seatNums.map((seatNo) => {
                return (
                    <ColumnSeat key={`seat${seatNo}`}>
                        <EntrySeat seatNo={seatNo} />
                    </ColumnSeat>
                );
            })}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
