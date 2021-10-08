import React from "react";
import styled from "styled-components";
import HomeImg__Yonsei from "../../Resources/Img/HomeImg__Yonsei-min.png";

export default function HomeBanner() {
    return (
        <HomeImgContainer>
            <HomeImg src={HomeImg__Yonsei} alt="Yonsei Univ Image" />
        </HomeImgContainer>
    );
}

const HomeImgContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 480px;
    text-align: right;
    opacity: 0.4;
    overflow: hidden;
`;

const HomeImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 35px;
`;
