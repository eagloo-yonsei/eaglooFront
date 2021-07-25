import React from "react";
import styled from "styled-components";
import EntrySeat from "./Entry__Seat";
import { Room } from "../../Constants";

interface OuterRowProp {
    room: Room | undefined;
    seatNums: number[];
}

export default function EntryOuterRow({ room, seatNums }: OuterRowProp) {
    return (
        <Container>
            {seatNums.map((seatNo) => {
                return (
                    <RowSeat key={`seat${seatNo}`}>
                        <EntrySeat room={room} seatNo={seatNo} />
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
