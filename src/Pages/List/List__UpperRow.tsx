import React from "react";
import styled from "styled-components";
import { StylelessLink } from "../../Styles/StyledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ListUpperRow() {
    return (
        <Container>
            <CloseIcon />
        </Container>
    );
}

function CloseIcon() {
    return (
        <ListClose>
            <StylelessLink to={"/"}>
                <FontAwesomeIcon icon={faTimes} size="2x" />
            </StylelessLink>
        </ListClose>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    width: 100%;
    height: 60px;
    padding: 0px 45px;
    margin-bottom: 15px;
`;

const ListClose = styled.div`
    position: absolute;
    top: 40px;
    right: 45px;
    color: ${(props) => props.theme.entryMainBlue};
`;
