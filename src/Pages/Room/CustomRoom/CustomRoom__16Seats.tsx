import React, { RefObject } from "react";
import styled from "styled-components";
import { CustomRoom16SeatsOuterRow } from "./CustomRoom__Components";
import { CustomRoom16SeatsOuterColumn } from "./CustomRoom__Components";
import { CustomRoom16SeatsControlPanel } from "./CustomRoom__Components/CustomRoom__16Seats__ControlPanel";
import { PeersStateProp } from "../../../Constants";

interface CustomRoomProp {
    peersState: PeersStateProp[];
    userStreamRef: RefObject<HTMLVideoElement>;
    stopSelfStreamAndExit: () => void;
}

export default function CustomRoom16Seats({
    peersState,
    userStreamRef,
    stopSelfStreamAndExit,
}: CustomRoomProp) {
    return (
        <>
            <CustomRoom16SeatsOuterRow
                peersState={peersState}
                seatNums={[1, 2, 3, 4, 5, 6]}
            />
            <RoomInnerRow>
                <CustomRoom16SeatsOuterColumn
                    peersState={peersState}
                    seatNums={[7, 9]}
                />
                <CustomRoom16SeatsControlPanel
                    peersState={peersState}
                    userStreamRef={userStreamRef}
                    stopSelfStreamAndExit={stopSelfStreamAndExit}
                />
                <CustomRoom16SeatsOuterColumn
                    peersState={peersState}
                    seatNums={[8, 10]}
                />
            </RoomInnerRow>
            <CustomRoom16SeatsOuterRow
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
