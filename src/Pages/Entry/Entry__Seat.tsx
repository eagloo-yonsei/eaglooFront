import React from "react";
import styled from "styled-components";
import { useEntryContext } from "./EntryProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface SeatProp {
    seatNo: number;
}

export default function EntrySeat({ seatNo }: SeatProp) {
    const { selectedSeat, selectSeat } = useEntryContext();

    return (
        <Container
            onClick={() => {
                selectSeat(seatNo);
            }}
        >
            {seatNo === selectedSeat ? (
                <SelectedSeat seatNo={seatNo} />
            ) : (
                <EmptySeat seatNo={seatNo} />
            )}
        </Container>
    );
}

function EmptySeat({ seatNo }: SeatProp) {
    return (
        <EmptyContainer>
            <SeatNo seatNo={seatNo} />
        </EmptyContainer>
    );
}

function SelectedSeat({ seatNo }: SeatProp) {
    return (
        <SelectedContainer>
            <FontAwesomeIcon icon={faCheck} size="3x" />
            <SeatNo seatNo={seatNo} />
        </SelectedContainer>
    );
}

function SeatNo({ seatNo }: SeatProp) {
    return (
        <>
            {seatNo < 10 ? (
                <SeatNoContainer>{`0${seatNo}`}</SeatNoContainer>
            ) : (
                <SeatNoContainer>{seatNo}</SeatNoContainer>
            )}
        </>
    );
}

const Container = styled.div`
    width: 96%;
    height: 94%;
    :hover {
        cursor: pointer;
    }
`;

const SeatContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 4.5px solid ${(props) => props.theme.entryLightBlue};
    border-radius: 8px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
    overflow: hidden;
`;

const EmptyContainer = styled(SeatContainer)`
    background-color: none;
    color: ${(props) => props.theme.entryLightBlue};
`;

const SelectedContainer = styled(SeatContainer)`
    background-color: ${(props) => props.theme.entryLightBlue};
    color: white;
`;

const SeatNoContainer = styled.span`
    position: absolute;
    left: 8px;
    bottom: 8px;
    font-size: 16px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;
