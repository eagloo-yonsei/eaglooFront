import React from "react";
import styled from "styled-components";
import Room16SeatsOuterRow from "./Room__16Seats__OuterRow";
import Room16SeatsOuterColumn from "./Room__16Seats__OuterColumn";
import { Room16SeatsControlPanel } from "./Room__16Seats__ControlPanel";
import { RoomParentProp } from "../../../../Constants";

export default function Room16Seats({
    peersState,
    userStreamRef,
    stopSelfStreamAndExit,
}: RoomParentProp) {
    return (
        <>
            <Room16SeatsOuterRow
                peersState={peersState}
                seatNums={[1, 2, 3, 4, 5, 6]}
            />
            <RoomInnerRow>
                <Room16SeatsOuterColumn
                    peersState={peersState}
                    seatNums={[7, 9]}
                />
                <Room16SeatsControlPanel
                    peersState={peersState}
                    userStreamRef={userStreamRef}
                    stopSelfStreamAndExit={stopSelfStreamAndExit}
                />
                <Room16SeatsOuterColumn
                    peersState={peersState}
                    seatNums={[8, 10]}
                />
            </RoomInnerRow>
            <Room16SeatsOuterRow
                peersState={peersState}
                seatNums={[11, 12, 13, 14, 15, 16]}
            />
        </>
    );
}

const RoomInnerRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50%;
`;
