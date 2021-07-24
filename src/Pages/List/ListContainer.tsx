import React from "react";
import styled from "styled-components";
import ListUpperRow from "./List__UpperRow";
import ListPublic from "./List__Public";
import ListPrivate from "./List__Private";
import { SlideUpPageContainer } from "../../Styles/StyledComponents";

export default function ListContainer() {
    return (
        <Container>
            <ListUpperRow />
            <InnerContainer>
                <ListPublic />
                <ListPrivate />
            </InnerContainer>
        </Container>
    );
}

const Container = styled(SlideUpPageContainer)`
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 35px 65px 0px 70px;
`;

const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`;
