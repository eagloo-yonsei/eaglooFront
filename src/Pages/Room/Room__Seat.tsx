import React from "react";
import styled from "styled-components";

interface SeatProp {
    seatNo: number;
}

export default function RoomSeat({ seatNo }: SeatProp) {
    return (
        <Container>
            <EmptySeat seatNo={seatNo} />
        </Container>
    );
}

function EmptySeat({ seatNo }: SeatProp) {
    return (
        <EmptyContainer>{`${seatNo}번 참여자를 기다리는 중`}</EmptyContainer>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 96%;
    height: 94%;
    background-color: black;
    border-radius: 15px;
`;

const EmptyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 15px;
    font-family: ${(props) => props.theme.plainTextFont};
`;

const ConnectedContainer = styled.video`
    max-width: 100%;
    max-height: 100%;
`;
