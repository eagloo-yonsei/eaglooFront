import React from "react";
import styled from "styled-components";
import { StylelessLink } from "../../Styles/StyledComponents";

export default function HomeEntry() {
    return (
        <Container>
            <PublicEntry />
            <PrivateEntry />
        </Container>
    );
}

function PublicEntry() {
    return (
        <PublicDiv>
            <EntryTitle>공용 스터디룸</EntryTitle>
            <EntryMessage>
                이글루에서 자체적으로 제공하는 스터디룸입니다.
            </EntryMessage>
            <StylelessLink to={"/list"}>
                <PublicButton>참가하기</PublicButton>
            </StylelessLink>
        </PublicDiv>
    );
}

function PrivateEntry() {
    return (
        <PrivateDiv>
            <EntryTitle>개인 스터디룸</EntryTitle>
            <EntryMessage>사용자가 설정한 스터디룸입니다.</EntryMessage>
            <EntryMessage>
                같은 목적을 가진 사람들과 함께 공부해 보세요!
            </EntryMessage>
            <StylelessLink to={"/"}>
                <PrivateButton>만들기/찾기</PrivateButton>
            </StylelessLink>
        </PrivateDiv>
    );
}

const Container = styled.div`
    z-index: 10;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const OuterDiv = styled.div`
    flex-direction: column;
    position: relative;
    width: 48%;
    height: 190px;
    padding: 25px;
    border-radius: 5px;
`;

const PublicDiv = styled(OuterDiv)`
    color: white;
    background: ${(props) => props.theme.orangeGradient};
`;

const PrivateDiv = styled(OuterDiv)`
    color: ${(props) => props.theme.entryMainBlue};
    background: white;
`;

const EntryTitle = styled.div`
    font-size: 32px;
    margin-bottom: 18px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const EntryMessage = styled.div`
    font-size: 17px;
    margin-bottom: 10px;
    font-family: ${(props) => props.theme.plainTextFont};
`;

const EntryButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 25px;
    bottom: 20px;
    border-radius: 15px;
    width: 140px;
    height: 40px;
    font-size: 22px;
    font-family: ${(props) => props.theme.inButtonFont};
`;

const PublicButton = styled(EntryButton)`
    color: #f15a24;
    background: white;
`;

const PrivateButton = styled(EntryButton)`
    color: white;
    background: ${(props) => props.theme.mainBlue};
`;
