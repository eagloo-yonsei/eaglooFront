import React from "react";
import styled from "styled-components";
import { StylelessLink } from "../../Styles/StyledComponents";

export default function HomeIcon() {
    return (
        <Container>
            <StylelessLink to={"/"} children={"EAGLOO"}></StylelessLink>
        </Container>
    );
}

const Container = styled.div`
    color: white;
    font-size: 30px;
    font-weight: bold;
    font-family: "RecipeKorea";
    width: 140px;
`;
