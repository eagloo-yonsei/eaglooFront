import React from "react";
import styled from "styled-components";
import { useAdminUserContext } from "../Admin__UserProvider";
import { ConnectedUser } from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

export default function AdminUserAllConnectedUser() {
    const { allConnectedUser } = useAdminUserContext();

    return (
        <>
            <ConnectedUserDataHeader />
            {allConnectedUser.map((connectedUser, index) => {
                return (
                    <ConnectedUserDataRow
                        connectedUser={connectedUser}
                        index={index}
                        key={`${connectedUser.userInfo.id}`}
                    />
                );
            })}
        </>
    );
}

function ConnectedUserDataHeader() {
    const { getAllConnectedUser } = useAdminUserContext();

    return (
        <HeaderRowContainer>
            <Index>{`순번`}</Index>
            <Email>{`이메일`}</Email>
            <RoomName>{`접속 방`}</RoomName>
            <SeatNo>{`자리`}</SeatNo>
            <Refresh
                onClick={() => {
                    getAllConnectedUser();
                }}
            >
                <FontAwesomeIcon icon={faRedoAlt} />
            </Refresh>
        </HeaderRowContainer>
    );
}

function ConnectedUserDataRow({
    index,
    connectedUser,
}: {
    index: number;
    connectedUser: ConnectedUser;
}) {
    return (
        <RowContainer>
            <Index>{`${index + 1}`}</Index>
            <Email>{`${connectedUser.userInfo.email}`}</Email>
            <RoomName>{`${connectedUser.roomId || `-`}`}</RoomName>
            <SeatNo>{`${connectedUser.seatNo || `-`}`}</SeatNo>
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

const Email = styled(RowBox)`
    width: 25%;
`;

const RoomName = styled(RowBox)`
    width: 30%;
`;

const SeatNo = styled(RowBox)`
    width: 15%;
    border: none;
`;

const Refresh = styled(RowBox)`
    width: 15%;
    border: none;
    cursor: pointer;
`;
