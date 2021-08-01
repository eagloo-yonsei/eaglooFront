import React from "react";
import styled from "styled-components";
import CustomRoomSeat from "./CustomRoom__Seat";
import Peer from "simple-peer";

interface PeersStateProp {
    peer: Peer.Instance;
    seatNo: number;
}

interface OuterRowProp {
    peersState: PeersStateProp[];
    seatNums: number[];
}

export function CustomRoom16SeatsOuterRow({
    peersState,
    seatNums,
}: OuterRowProp) {
    return (
        <Container>
            {seatNums.map((seatNo) => {
                return (
                    <RowSeat key={`seat${seatNo}`}>
                        <CustomRoomSeat
                            seatNo={seatNo}
                            peersState={peersState}
                        />
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