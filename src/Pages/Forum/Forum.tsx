import React from "react";
import styled from "styled-components";
import { SlideUpPageContainer } from "../../Styles/StyledComponents/StyledComponents";

export default function Forum() {
    return <Container>게시판</Container>;
}

const Container = styled(SlideUpPageContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-family: ${(props) => props.theme.plainTextFont};
`;
