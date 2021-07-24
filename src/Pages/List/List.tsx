import React from "react";
import styled from "styled-components";
import {
    SlideUpPageContainer,
    StylelessLink,
} from "../../Styles/StyledComponents";
import ListPublic from "./List__Public";
import ListPrivate from "./List__Private";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function List() {
    return (
        <Container>
            <UpperButtonRow></UpperButtonRow>
            <ButtonListContainer>
                <ListPublic />
                <ListPrivate />
            </ButtonListContainer>
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

const Container = styled(SlideUpPageContainer)`
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 45px 65px 0px 70px;
`;

const UpperButtonRow = styled.div`
    width: 100%;
    height: 60px;
`;

const ButtonListContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`;

const ListClose = styled.div`
    position: absolute;
    top: 40px;
    right: 45px;
    color: ${(props) => props.theme.entryMainBlue};
`;
