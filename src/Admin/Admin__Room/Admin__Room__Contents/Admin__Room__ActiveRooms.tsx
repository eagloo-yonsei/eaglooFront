import React, { useState } from "react";
import styled from "styled-components";
import { useAdminRoomContext } from "../Admin__RoomProvider";
import { Room, CustomRoom, Seat } from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

export default function AdminRoomActiveRooms() {
    const { allActiveRoom } = useAdminRoomContext();

    return (
        <>
            <RoomDataHeader />
            {allActiveRoom.map((roomInfo, index) => {
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
    const { getAllRoom } = useAdminRoomContext();

    return (
        <HeaderRowContainer>
            <Index>{`순번`}</Index>
            <RoomName>{`방 이름`}</RoomName>
            <EnteredUser>{`접속 유저 수`}</EnteredUser>
            <Refresh
                onClick={() => {
                    getAllRoom();
                }}
            >
                <FontAwesomeIcon icon={faRedoAlt} />
            </Refresh>
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
    const [showDetail, setShowDetail] = useState<boolean>(false);

    function toggleShowDetail() {
        setShowDetail(!showDetail);
    }

    return (
        <>
            <RowContainer
                onClick={() => {
                    toggleShowDetail();
                }}
            >
                <Index>{`${index + 1}`}</Index>
                <RoomName>{`${roomInfo.roomName}`}</RoomName>
                <EnteredUser>{`${roomInfo.seats.length}`}</EnteredUser>
            </RowContainer>
            <RoomDetail
                roomId={roomInfo.id}
                seats={roomInfo.seats}
                showDetail={showDetail}
            />
        </>
    );
}

function RoomDetail({
    roomId,
    seats,
    showDetail,
}: {
    roomId: string;
    seats: Seat[];
    showDetail: boolean;
}) {
    return (
        <DetailContainer showDetail={showDetail}>
            {seats.map((seat) => {
                return (
                    <EnteredUserRow
                        key={seat.socketId}
                        roomId={roomId}
                        seatInfo={seat}
                    />
                );
            })}
        </DetailContainer>
    );
}

function EnteredUserRow({
    roomId,
    seatInfo,
}: {
    roomId: string;
    seatInfo: Seat;
}) {
    const { getAllRoom, exileUser } = useAdminRoomContext();
    const [reaskExile, setReaskExile] = useState<boolean>(false);
    return (
        <SubRowContainer>
            <SeatNo>{`${seatInfo.seatNo}번`}</SeatNo>
            <Email>{`${seatInfo.userEmail}`}</Email>
            {!reaskExile ? (
                <ExileButton
                    onClick={() => {
                        setReaskExile(true);
                    }}
                >{`퇴출`}</ExileButton>
            ) : (
                <ConfirmExileContainer>
                    {`정말 퇴출하시겠습니까?`}
                    <ConfirmExileButton
                        onClick={async () => {
                            if (await exileUser(roomId, seatInfo.seatNo)) {
                                getAllRoom();
                            }
                        }}
                    >{`퇴출`}</ConfirmExileButton>
                    <CancelExileButton
                        onClick={() => {
                            setReaskExile(false);
                        }}
                    >{`취소`}</CancelExileButton>
                </ConfirmExileContainer>
            )}
        </SubRowContainer>
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
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 15px;
    font-family: ${(props) => props.theme.plainTextFont};
    cursor: pointer;
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

const Refresh = styled(RowBox)`
    width: 15%;
    border: none;
    cursor: pointer;
`;

const DetailContainer = styled.div<{ showDetail: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: ${(props) => (props.showDetail ? "fit-content" : "0px")};
    overflow: hidden;
    transition: all 0.5s ${(props) => props.theme.animationCubic};
`;

const SubRowContainer = styled(RowContainer)`
    height: 40px;
    padding-left: 120px;
    background-color: whitesmoke;
    cursor: auto;
`;

const SeatNo = styled(RowBox)`
    width: 10%;
    border: none;
`;

const Email = styled(RowBox)`
    width: 35%;
    border: none;
`;

const ExileButton = styled(RowBox)`
    width: 10%;
    border: none;
    cursor: pointer;
`;

const ConfirmExileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 40%;
    height: 100%;
`;

const ConfirmExileButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 80%;
    border-radius: 8px;
    color: white;
    background-color: orangered;
    cursor: pointer;
`;

const CancelExileButton = styled(ConfirmExileButton)`
    color: gray;
    background-color: white;
    border: 2.5px solid gray;
`;
