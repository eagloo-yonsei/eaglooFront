import React from "react";
import styled from "styled-components";
import Room16SeatsOuterRow from "./Room__16Seats__OuterRow";
import Room16SeatsOuterColumn from "./Room__16Seats__OuterColumn";
import { Room16SeatsControlPanel } from "./Room__16Seats__ControlPanel";

export default function Room16Seats() {
    return (
        <>
            <Room16SeatsOuterRow seatNums={[1, 2, 3, 4, 5, 6]} />
            <RoomInnerRow>
                <Room16SeatsOuterColumn seatNums={[7, 9]} />
                <Room16SeatsControlPanel />
                <Room16SeatsOuterColumn seatNums={[8, 10]} />
            </RoomInnerRow>
            <Room16SeatsOuterRow seatNums={[11, 12, 13, 14, 15, 16]} />
        </>
    );
}

const RoomInnerRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50%;
`;
