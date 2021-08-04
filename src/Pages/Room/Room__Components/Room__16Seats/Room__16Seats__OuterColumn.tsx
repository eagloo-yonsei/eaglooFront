import React from "react";
import styled from "styled-components";
import RoomSeat from "../Room__Seat";
import { PeerStateProp } from "../../../../Constants";

interface Room16SeatsOuterColumnProp {
    peersState: PeerStateProp[];
    seatNums: number[];
}

export default function Room16SeatsOuterColumn({
    peersState,
    seatNums,
}: Room16SeatsOuterColumnProp) {
    return (
        <Container>
            {seatNums.map((seatNo) => {
                return (
                    <ColumnSeat key={`seat${seatNo}`}>
                        <RoomSeat seatNo={seatNo} peersState={peersState} />
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
