import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useEntryContext } from "../EntryProvider";
import TimerPerMinute from "../../../Components/Timer/Timer__PerMinute";
import { Seat, RoomType } from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface EntrySeatProp {
    seatNo: number;
}

interface EntryOccupiedSeatProp {
    seatNo: number;
    occupiedSeatInfo: Seat;
}

export default function EntrySeat({ seatNo }: EntrySeatProp) {
    const { roomInfo } = useEntryContext();
    const [occupiedSeatInfo, setOccupiedSeatInfo] = useState<Seat>({
        seatNo: 0,
        socketId: "",
        userEmail: "",
        endTime: 0,
        streamState: {
            video: false,
            audio: false,
        },
    });

    useEffect(() => {
        const matchedSeat = roomInfo.seats.find((seat) => {
            return seat.seatNo === seatNo;
        });
        if (matchedSeat) {
            setOccupiedSeatInfo(matchedSeat);
        }
    }, [roomInfo]);

    if (occupiedSeatInfo.seatNo !== 0) {
        return (
            <OccupiedSeat seatNo={seatNo} occupiedSeatInfo={occupiedSeatInfo} />
        );
    }

    return <SelectableSeat seatNo={seatNo} />;
}

function SelectableSeat({ seatNo }: EntrySeatProp) {
    const { selectedSeatNo, selectSeat } = useEntryContext();
    return (
        <Container
            onClick={() => {
                selectSeat(seatNo);
            }}
        >
            {seatNo === selectedSeatNo ? (
                <SelectedSeat seatNo={seatNo} />
            ) : (
                <EmptySeat seatNo={seatNo} />
            )}
        </Container>
    );
}

function EmptySeat({ seatNo }: EntrySeatProp) {
    const { roomType } = useEntryContext();
    return (
        <EmptyContainer roomType={roomType}>
            <SeatNo seatNo={seatNo} />
        </EmptyContainer>
    );
}

function SelectedSeat({ seatNo }: EntrySeatProp) {
    const { roomType } = useEntryContext();
    return (
        <SelectedContainer roomType={roomType}>
            <FontAwesomeIcon icon={faCheck} />
            <SeatNo seatNo={seatNo} />
        </SelectedContainer>
    );
}

function OccupiedSeat({ seatNo, occupiedSeatInfo }: EntryOccupiedSeatProp) {
    const { roomType } = useEntryContext();
    return (
        <Container>
            <OccupiedContainer roomType={roomType}>
                <OccupiedMessage>{`사용중`}</OccupiedMessage>
                <TimerContainer>
                    <TimerPerMinute endTime={occupiedSeatInfo.endTime} />
                </TimerContainer>
                <SeatNo seatNo={seatNo} />
            </OccupiedContainer>
        </Container>
    );
}

function SeatNo({ seatNo }: EntrySeatProp) {
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
`;

interface RoomTypeProp {
    roomType: RoomType;
}

const SeatContainer = styled.div<RoomTypeProp>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 100%;
    font-size: 21px;
    border: 4.5px solid
        ${(props) =>
            props.roomType === RoomType.PUBLIC
                ? props.theme.entryLightBlue
                : props.theme.listLightOrange};
    border-radius: 8px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
    overflow: hidden;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        font-size: 16px;
    }
`;

const EmptyContainer = styled(SeatContainer)`
    background-color: none;
    color: ${(props) =>
        props.roomType === RoomType.PUBLIC
            ? props.theme.entryLightBlue
            : props.theme.listLightOrange};
    :hover {
        cursor: pointer;
    }
`;

const SelectedContainer = styled(SeatContainer)`
    color: white;
    font-size: 54px;
    background-color: ${(props) =>
        props.roomType === RoomType.PUBLIC
            ? props.theme.entryLightBlue
            : props.theme.listLightOrange};

    :hover {
        cursor: pointer;
    }
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        font-size: 32px;
    }
`;

const OccupiedContainer = styled(SeatContainer)`
    display: flex;
    flex-direction: column;
    border: 4.5px solid ${(props) => props.theme.loginMessageGray};
    background-color: ${(props) => props.theme.loginMessageGray};
    color: white;
    letter-spacing: 5px;
`;

const OccupiedMessage = styled.span`
    font-size: 18px;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        font-size: 12px;
    }
`;

const TimerContainer = styled.div`
    display: flex;
    width: 100%;
`;

const SeatNoContainer = styled.span`
    position: absolute;
    left: 8px;
    bottom: 8px;
    font-size: 16px;
    letter-spacing: 0px;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        font-size: 12px;
    }
`;
