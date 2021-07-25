import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useEntryContext } from "./EntryProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Room } from "../../Constants";

interface EntrySeatProp {
    room: Room | undefined;
    seatNo: number;
}

interface SeatContainerProp {
    seatNo: number;
}

export default function EntrySeat({ room, seatNo }: EntrySeatProp) {
    const { roomInfo } = useEntryContext();
    const [occupied, setOccupied] = useState<boolean>(false);
    roomInfo?.seats.forEach((seat) => {
        if (seat.seatNo === seatNo) {
            console.log(`${seatNo} has its matched seat`);
            // setOccupied(true);  -> IT MAKES INFINITE LOOP ERROR
        }
    });

    return (
        <>
            {occupied ? (
                <OccupiedSeat seatNo={seatNo} />
            ) : (
                <SelectableSeat seatNo={seatNo} />
            )}
        </>
    );
}

function SelectableSeat({ seatNo }: SeatContainerProp) {
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

function EmptySeat({ seatNo }: SeatContainerProp) {
    return (
        <EmptyContainer>
            <SeatNo seatNo={seatNo} />
        </EmptyContainer>
    );
}

function SelectedSeat({ seatNo }: SeatContainerProp) {
    return (
        <SelectedContainer>
            <FontAwesomeIcon icon={faCheck} size="3x" />
            <SeatNo seatNo={seatNo} />
        </SelectedContainer>
    );
}

function OccupiedSeat({ seatNo }: SeatContainerProp) {
    return (
        <OccupiedContainer>
            {`사용중`}
            <SeatNo seatNo={seatNo} />
        </OccupiedContainer>
    );
}

function SeatNo({ seatNo }: SeatContainerProp) {
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

const OccupiedContainer = styled(SeatContainer)`
    border: ${(props) => props.theme.loginMessageGray};
    background-color: ${(props) => props.theme.loginMessageGray};
    color: white;
`;

const SeatNoContainer = styled.span`
    position: absolute;
    left: 8px;
    bottom: 8px;
    font-size: 16px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;
