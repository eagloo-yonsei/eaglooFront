import React from "react";
import styled from "styled-components";
import { SlideUpPageContainer } from "../../Styles/StyledComponents/StyledComponents";

export default function Feedback() {
    return <Container>피드백 페이지</Container>;
}

const Container = styled(SlideUpPageContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-family: "JejuGothic";
`;
