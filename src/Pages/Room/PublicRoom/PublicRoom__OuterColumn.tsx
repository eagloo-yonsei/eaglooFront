import React from "react";
import styled from "styled-components";
import PublicRoomSeat from "./PublicRoom__Seat";
import Peer from "simple-peer";

interface PeersStateProp {
    peer: Peer.Instance;
    seatNo: number;
}

interface OuterColumnProp {
    peersState: PeersStateProp[];
    seatNums: number[];
}

export default function PublicRoomOuterColumn({
    peersState,
    seatNums,
}: OuterColumnProp) {
    return (
        <Container>
            {seatNums.map((seatNo) => {
                return (
                    <ColumnSeat key={`seat${seatNo}`}>
                        <PublicRoomSeat
                            seatNo={seatNo}
                            peersState={peersState}
                        />
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