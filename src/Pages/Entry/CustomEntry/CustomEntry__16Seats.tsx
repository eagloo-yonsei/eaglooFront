import React, { RefObject } from "react";
import styled from "styled-components";
import { CustomEntry16SeatsOuterRow } from "./CustomEntry__Components";
import { CustomEntry16SeatsOuterColumn } from "./CustomEntry__Components";
import { CustomEntry16SeatsControlPanel } from "./CustomEntry__Components";

interface EntryPanelProp {
    userStreamRef: RefObject<HTMLVideoElement>;
    stopSelfStream: () => void;
}

export default function CustomEntry16Seats({
    userStreamRef,
    stopSelfStream,
}: EntryPanelProp) {
    return (
        <>
            <CustomEntry16SeatsOuterRow seatNums={[1, 2, 3, 4, 5, 6]} />
            <Entry16SeatsInnerRow>
                <CustomEntry16SeatsOuterColumn seatNums={[7, 9]} />
                <CustomEntry16SeatsControlPanel
                    userStreamRef={userStreamRef}
                    stopSelfStream={stopSelfStream}
                />
                <CustomEntry16SeatsOuterColumn seatNums={[8, 10]} />
            </Entry16SeatsInnerRow>
            <CustomEntry16SeatsOuterRow seatNums={[11, 12, 13, 14, 15, 16]} />
        </>
    );
}

const Entry16SeatsInnerRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50%;
`;
