import React from "react";
import styled from "styled-components";
import { StylelessLink } from "../../Styles/StyledComponents";

export default function AdminHeaderHomeIcon() {
    return (
        <Container>
            <StylelessLink to={"/"}>{`Eagloo Admin`}</StylelessLink>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 30px;
    font-weight: bold;
    font-family: ${(props) => props.theme.iconFont};
    width: 240px;
`;
