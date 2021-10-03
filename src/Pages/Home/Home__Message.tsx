import React from "react";
import styled from "styled-components";

export default function HomeMessage() {
    return (
        <MessageContainer>
            <HomeMainMessage />
            <HomeSubMessage />
        </MessageContainer>
    );
}

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    padding-top: 40px;
    color: white;
`;

export function HomeMainMessage() {
    return (
        <>
            <MainMessageLine12>
                연세대학교
                <br />
                온라인 스터디 서비스
                <br />
            </MainMessageLine12>
            <MainMessageLine3>EAGLOO</MainMessageLine3>
        </>
    );
}

export function HomeSubMessage() {
    return (
        <SubMessage>
            이제 어디서나 스터디 카페를 즐기세요. EAGLOO는 비대면 온라인
            <br />
            시대에 발맞추어 필요한 모든 서비스를 제공하고 있습니다.
            <br />
            온라인스터디룸에서 익숙하면서도 새로운 경험을 해보세요.
        </SubMessage>
    );
}

const MainMessageLine12 = styled.div`
    font-size: 38px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
    line-height: 50px;
    letter-spacing: 1px;
`;

const MainMessageLine3 = styled.div`
    font-size: 42px;
    font-family: ${(props) => props.theme.iconFont};
    letter-spacing: 0px;
    margin-top: 15px;
    margin-bottom: 35px;
`;

const SubMessage = styled.div`
    font-size: 16px;
    font-family: ${(props) => props.theme.plainTextFont};
    line-height: 34px;
    margin-bottom: 40px;
`;
