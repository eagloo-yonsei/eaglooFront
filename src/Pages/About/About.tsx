import React from "react";
import styled from "styled-components";
import { HeaderPageContainer } from "../../Styles/StyledComponents/StyledComponents";

export default function About() {
    return <Container>ABOUT EAGLOO</Container>;
}

const Container = styled(HeaderPageContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 40px;
    font-family: ${(props) => props.theme.plainTextFont};
`;
