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
            여기에는 대강의 서비스 소개가 들어갈 예정입니다
            <br />
            두 줄 쓰면 너무 정 없어 보이고
            <br />
            한국인이면 세 줄 정도 써주면 딱 맞아떨어지지 않으려나 Lorem ipsum
        </SubMessage>
    );
}

const JejuGothic = styled.div`
    font-family: "JejuGothic";
`;

const SamlipHopang = styled.div`
    font-family: "SamlipHopang";
`;

const MainMessageLine12 = styled(JejuGothic)`
    font-size: 42px;
    line-height: 50px;
    letter-spacing: -2px;
    z-index: 10;
`;

const MainMessageLine3 = styled(SamlipHopang)`
    font-size: 54px;
    letter-spacing: 2px;
    margin-top: 15px;
    margin-bottom: 30px;
    z-index: 10;
`;

const SubMessage = styled(JejuGothic)`
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 45px;
    z-index: 10;
`;
