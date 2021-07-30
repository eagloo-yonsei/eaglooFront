import React from "react";
import styled from "styled-components";
import ListUpperRow from "./List__UpperRow";
import ListRow from "./List__Row";
import { RoomType } from "../../Constants";
import { SlideUpPageContainer } from "../../Styles/StyledComponents";

export default function ListContainer() {
    return (
        <Container>
            <ListUpperRow />
            <InnerContainer>
                <ListRow roomType={RoomType.PUBLIC} />
                <ListRow roomType={RoomType.CUSTOM} />
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
