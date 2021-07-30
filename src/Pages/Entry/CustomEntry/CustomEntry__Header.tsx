import React from "react";
import styled from "styled-components";
import { useCustomEntryContext } from "./CustomEntryProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock, faUserAlt } from "@fortawesome/free-solid-svg-icons";

export default function CustomEntryHeader() {
    const { roomInfo, occupiedSeatNums } = useCustomEntryContext();

    return (
        <Container>
            <TitleIcon>
                <FontAwesomeIcon icon={faUnlock} />
            </TitleIcon>
            <Title>{`${roomInfo.roomName}`}</Title>
            <SubTitle>대기실</SubTitle>
            <StateIcon>
                <FontAwesomeIcon icon={faUserAlt} />
            </StateIcon>
            <StateNumber>{`${occupiedSeatNums.length}/16`}</StateNumber>
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

const TitleIcon = styled.div`
    color: ${(props) => props.theme.listMainOrange};
    font-size: 28px;
    margin-right: 12px;
`;

const Title = styled.span`
    color: ${(props) => props.theme.listMainOrange};
    font-size: 30px;
    margin-right: 12px;
`;

const SubTitle = styled.span`
    color: ${(props) => props.theme.listLightOrange};
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
