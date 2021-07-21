import React from "react";
import styled from "styled-components";
import { SlideUpPageContainer } from "../../Styles/StyledComponents";
import ListPublic from "./List__Public";
import ListPrivate from "./List__Private";

export default function List() {
    return (
        <Container>
            <UpperButtonRow></UpperButtonRow>
            <ButtonListContainer>
                <ListPublic />
                <ListPrivate />
            </ButtonListContainer>
        </Container>
    );
}

const Container = styled(SlideUpPageContainer)`
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 25px 65px 0px 70px;
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
