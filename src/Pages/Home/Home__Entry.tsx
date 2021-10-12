import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
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
            <EntryTitle>{`오픈 스터디룸`}</EntryTitle>
            <EntryMessage>
                {`누구나 입장할 수 있는 오픈 스터디룸입니다. 이글루에서 자체적으로 제공하는 공용 스터디룸과 사용자가 직접 만든 스터디룸에 참여해 보세요!`}
            </EntryMessage>
            <StylelessLink to={"/list"}>
                <PublicButton>{`참가하기`}</PublicButton>
            </StylelessLink>
        </PublicDiv>
    );
}

function PrivateEntry() {
    const { setShowCustomRoomModal } = useAppContext();
    return (
        <PrivateDiv>
            <EntryTitle>{`스터디룸 만들기/검색`}</EntryTitle>
            <EntryMessage>{`사용자 설정 스터디룸을 검색하거나, 직접 생성할 수도 있습니다! 같은 목표를 가진 사람들과 함께 공부해 보세요!`}</EntryMessage>
            <PrivateButton
                onClick={() => {
                    setShowCustomRoomModal(true);
                }}
            >
                {`만들기/찾기`}
            </PrivateButton>
        </PrivateDiv>
    );
}

const Container = styled.div`
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
    flex-wrap: wrap;
    font-size: 17px;
    line-height: 24px;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        font-size: 14px;
        line-height: 21px;
    }
    margin-bottom: 10px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
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
    :hover {
        cursor: pointer;
    }
`;
