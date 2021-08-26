import React from "react";
import styled from "styled-components";
import { useAdminRoomContext } from "../Admin__RoomProvider";
import { Room, CustomRoom } from "../../../Constants";

export default function AdminRoomAllRoom() {
    const { allRoom } = useAdminRoomContext();

    return (
        <>
            <RoomDataHeader />
            {allRoom.map((roomInfo, index) => {
                return (
                    <RoomDataRow
                        roomInfo={roomInfo}
                        index={index}
                        key={`${index}th_${roomInfo.roomName}`}
                    />
                );
            })}
        </>
    );
}

function RoomDataHeader() {
    return (
        <HeaderRowContainer>
            <Index>{`순번`}</Index>
            <RoomName>{`방 이름`}</RoomName>
            <EnteredUser>{`접속 유저 수`}</EnteredUser>
        </HeaderRowContainer>
    );
}

function RoomDataRow({
    index,
    roomInfo,
}: {
    index: number;
    roomInfo: Room | CustomRoom;
}) {
    return (
        <RowContainer>
            <Index>{`${index + 1}`}</Index>
            <RoomName>{`${roomInfo.roomName}`}</RoomName>
            <EnteredUser>{`${roomInfo.seats.length}`}</EnteredUser>
        </RowContainer>
    );
}

const HeaderRowContainer = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    font-size: 18px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const RowContainer = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    font-size: 15px;
    font-family: ${(props) => props.theme.plainTextFont};
`;

const RowBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-width: 60px;
    height: 100%;
    padding: 0px 12px;
    border-right: 2px solid gray;
`;

const Index = styled(RowBox)`
    width: 15%;
`;

const RoomName = styled(RowBox)`
    width: 45%;
`;

const EnteredUser = styled(RowBox)`
    width: 25%;
    border: none;
`;
