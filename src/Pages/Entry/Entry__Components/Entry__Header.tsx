import React, { useEffect } from "react";
import styled from "styled-components";
import { useEntryContext } from "../EntryProvider";
import { RoomType } from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock, faUserAlt } from "@fortawesome/free-solid-svg-icons";

export default function EntryHeader() {
    const { roomType, roomInfo } = useEntryContext();

    useEffect(() => {
        return () => {};
    }, [roomInfo]);

    return (
        <Container>
            <TitleIcon roomType={roomType}>
                <FontAwesomeIcon
                    icon={
                        "usePassword" in roomInfo && roomInfo.usePassword
                            ? faLock
                            : faUnlock
                    }
                />
            </TitleIcon>
            <Title roomType={roomType}>{`${roomInfo.roomName}`}</Title>
            <SubTitle roomType={roomType}>{`대기실`}</SubTitle>
            <StateIcon>
                <FontAwesomeIcon icon={faUserAlt} />
            </StateIcon>
            <StateNumber>{`${roomInfo.seats.length}/14`}</StateNumber>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 35px;
    margin-bottom: 40px;
`;

interface RoomTypeProp {
    roomType: RoomType;
}

const TitleIcon = styled.div<RoomTypeProp>`
    color: ${(props) =>
        props.roomType === RoomType.PUBLIC
            ? props.theme.entryMainBlue
            : props.theme.listMainOrange};
    font-size: 28px;
    margin-right: 12px;
`;

const Title = styled.span<RoomTypeProp>`
    color: ${(props) =>
        props.roomType === RoomType.PUBLIC
            ? props.theme.entryMainBlue
            : props.theme.listMainOrange};
    font-size: 30px;
    margin-right: 12px;
`;

const SubTitle = styled.span<RoomTypeProp>`
    color: ${(props) =>
        props.roomType === RoomType.PUBLIC
            ? props.theme.entryLightBlue
            : props.theme.listLightOrange};
    font-size: 26px;
    margin-right: 24px;
`;

const StateIcon = styled.div`
    color: ${(props) => props.theme.loginMessageGray};
    font-size: 20px;
    margin-right: 12px;
`;

const StateNumber = styled.div`
    color: ${(props) => props.theme.loginMessageGray};
    font-size: 24px;
`;
