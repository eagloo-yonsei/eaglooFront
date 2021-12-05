import React from "react";
import styled from "styled-components";
import Room14SeatsOuterRow from "./Room__14Seats__OuterRow";
import Room14SeatsOuterColumn from "./Room__14Seats__OuterColumn";
import Room14SeatsPostBoard from "./Room__14Seats__PostBoard";

export default function Room14Seats() {
    return (
        <>
            <Room14SeatsOuterRow seatNums={[5, 6, 7, 8, 9, 10, 11]} />
            <RoomInnerRow>
                <Room14SeatsOuterColumn seatNums={[4, 3, 2, 1]} />
                <Room14SeatsPostBoard />
                <Room14SeatsOuterColumn seatNums={[12, 13, 14]} />
            </RoomInnerRow>
        </>
    );
}

// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     height: 100%;
// `;

const RoomInnerRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80%;
`;
