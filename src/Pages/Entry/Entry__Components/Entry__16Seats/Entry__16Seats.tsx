import React from "react";
import styled from "styled-components";
import Entry16SeatsOuterRow from "./Entry__16Seats__OuterRow";
import Entry16SeatsOuterColumn from "./Entry__16Seats__OuterColumn";
import Entry16SeatsControlPanel from "./Entry__16Seats__ControlPanel";

export default function Entry16Seats() {
    return (
        <Container>
            <Entry16SeatsOuterRow seatNums={[1, 2, 3, 4, 5, 6]} />
            <EntryInnerRow>
                <Entry16SeatsOuterColumn seatNums={[7, 9]} />
                <Entry16SeatsControlPanel />
                <Entry16SeatsOuterColumn seatNums={[8, 10]} />
            </EntryInnerRow>
            <Entry16SeatsOuterRow seatNums={[11, 12, 13, 14, 15, 16]} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 85%;
`;

const EntryInnerRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50%;
`;
