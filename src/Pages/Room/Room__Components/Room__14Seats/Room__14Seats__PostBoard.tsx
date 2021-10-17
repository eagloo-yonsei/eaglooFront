import React from "react";
import styled from "styled-components";
import PostBoardPreviewImg from "../../../../Resources/Img/PostBoardPreview.png";

export default function Room14SeatsPostBoard() {
    return (
        <Container>
            <PostBoardPreview src={PostBoardPreviewImg} />
            <PreparingMessage>{`포스트보드 기능이 준비 중입니다! 기대해주세요!`}</PreparingMessage>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100%;
    font-size: 30px;
    font-family: ${(props) => props.theme.plainTextFont};
    padding: 20px;
    padding-bottom: 45px;
`;

const PostBoardPreview = styled.img`
    position: absolute;
    top: 45px;
    max-width: 100%;
    max-height: 100%;
    opacity: 0.6;
`;

const PreparingMessage = styled.div`
    position: absolute;
    top: 270px;
    color: white;
`;
