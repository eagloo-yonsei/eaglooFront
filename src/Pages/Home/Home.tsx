import React from "react";
import styled from "styled-components";
import HomeMessage from "./Home__Message";
import HomeEntry from "./Home__Entry";
import { HeaderPageContainer } from "../../Styles/StyledComponents/StyledComponents";
import HomeImg__Yonsei from "../../Resources/Img/HomeImg__Yonsei.jpg";

export default function Home() {
    return (
        <Container>
            <HomeMessage />
            <HomeEntry />
            <HomeImgContainer>
                <HomeImg src={HomeImg__Yonsei} alt="Yonsei Univ Image" />
            </HomeImgContainer>
        </Container>
    );
}

const Container = styled(HeaderPageContainer)`
    display: flex;
    flex-direction: column;
    position: relative;
`;

const HomeImgContainer = styled.div`
    z-index: 1;
    position: absolute;
    right: 0;
    top: 0;
    width: 60%;
    height: 60%;
    text-align: right;
    opacity: 0.4;
    overflow: hidden;
`;

const HomeImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 35px;
`;
