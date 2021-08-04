import React from "react";
import styled from "styled-components";
import { useEntryContext } from "../EntryProvider";
import { RoomType } from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface EntrySeatProp {
    seatNo: number;
}

interface MiddleWareProp {
    occupiedSeatNums: number[];
    seatNo: number;
}

export default function EntrySeat({ seatNo }: EntrySeatProp) {
    const { occupiedSeatNums } = useEntryContext();

    return <MiddleWare occupiedSeatNums={occupiedSeatNums} seatNo={seatNo} />;
}

// TODO (enhancement) 함수명 최적화 + state 안 넘겨주고 최적화
function MiddleWare({ occupiedSeatNums, seatNo }: MiddleWareProp) {
    if (occupiedSeatNums.includes(seatNo)) {
        return <OccupiedSeat seatNo={seatNo} />;
    } else return <SelectableSeat seatNo={seatNo} />;
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
            <FontAwesomeIcon icon={faCheck} size="3x" />
            <SeatNo seatNo={seatNo} />
        </SelectedContainer>
    );
}

function OccupiedSeat({ seatNo }: EntrySeatProp) {
    const { roomType } = useEntryContext();
    return (
        <Container>
            <OccupiedContainer roomType={roomType}>
                {`사용중`}
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
    width: 100%;
    height: 100%;
    border: 4.5px solid
        ${(props) =>
            props.roomType === RoomType.PUBLIC
                ? props.theme.entryLightBlue
                : props.theme.listLightOrange};
    border-radius: 8px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
    overflow: hidden;
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
    background-color: ${(props) =>
        props.roomType === RoomType.PUBLIC
            ? props.theme.entryLightBlue
            : props.theme.listLightOrange};
    :hover {
        cursor: pointer;
    }
    color: white;
`;

const OccupiedContainer = styled(SeatContainer)`
    border: 4.5px solid ${(props) => props.theme.loginMessageGray};
    background-color: ${(props) => props.theme.loginMessageGray};
    color: white;
    font-size: 24px;
    letter-spacing: 5px;
`;

const SeatNoContainer = styled.span`
    position: absolute;
    left: 8px;
    bottom: 8px;
    font-size: 16px;
    letter-spacing: 0px;
`;
