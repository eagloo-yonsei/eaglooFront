import React from "react";
import styled from "styled-components";
import Entry14SeatsOuterRow from "./Entry__14Seats__OuterRow";
import Entry14SeatsOuterColumn from "./Entry__14Seats__OuterColumn";
import Entry14SeatsControlPanel from "./Entry__14Seats__ControlPanel";

export default function Entry14Seats() {
    return (
        <Container>
            <Entry14SeatsOuterRow seatNums={[5, 6, 7, 8, 9, 10, 11]} />
            <EntryInnerRow>
                <Entry14SeatsOuterColumn seatNums={[4, 3, 2, 1]} />
                <Entry14SeatsControlPanel />
                <Entry14SeatsOuterColumn seatNums={[12, 13, 14]} />
            </EntryInnerRow>
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
    height: 80%;
`;
