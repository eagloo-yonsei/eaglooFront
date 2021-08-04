import React from "react";
import styled from "styled-components";
import EntrySeat from "../Entry__Seat";

interface OuterRowProp {
    seatNums: number[];
}

export default function Entry16SeatsOuterRow({ seatNums }: OuterRowProp) {
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
