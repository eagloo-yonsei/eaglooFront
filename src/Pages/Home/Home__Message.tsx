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
                온라인 스터디 공간
                <br />
            </MainMessageLine12>
            <MainMessageLine3>EAGLOO</MainMessageLine3>
        </>
    );
}

export function HomeSubMessage() {
    return (
        <SubMessage>
            이제 어디서나 도서관에 있는 것처럼 함께 공부해요
            <br />
            가상 스터디룸에서 익숙하면서도 새로운 경험을 해보세요
            <br />
            EAGLOO는 비대면 온라인 시대에 발맞추어 필요한 모든 서비스를
            제공하겠습니다
        </SubMessage>
    );
}

const MainMessageLine12 = styled.div`
    font-size: 38px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
    line-height: 50px;
    letter-spacing: 1px;
    z-index: 10;
`;

const MainMessageLine3 = styled.div`
    font-size: 42px;
    font-family: ${(props) => props.theme.iconFont};
    letter-spacing: 0px;
    margin-top: 15px;
    margin-bottom: 35px;
    z-index: 10;
`;

const SubMessage = styled.div`
    font-size: 16px;
    font-family: ${(props) => props.theme.plainLightTextFont};
    line-height: 34px;
    margin-bottom: 40px;
    z-index: 10;
`;
