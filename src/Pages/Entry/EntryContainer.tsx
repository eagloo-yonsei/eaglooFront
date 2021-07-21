import React from "react";
import styled from "styled-components";
import {
    SlideUpPageContainer,
    StylelessLink,
} from "../../Styles/StyledComponents";
import EntryHeader from "./Entry__Header";
import EntryOuterRow from "./Entry__OuterRow";
import EntryOuterColumn from "./Entry__OuterColumn";
import EntryController from "./Entry__Controller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function EntryContainer() {
    return (
        <Container>
            <EntryHeader />
            <SubContiner>
                <EntryOuterRow seatNums={[1, 2, 3, 4, 5, 6]} />
                <EntryInnerRow>
                    <EntryOuterColumn seatNums={[7, 9]} />
                    <EntryController />
                    <EntryOuterColumn seatNums={[8, 10]} />
                </EntryInnerRow>
                <EntryOuterRow seatNums={[11, 12, 13, 14, 15, 16]} />
            </SubContiner>
            <CloseIcon />
        </Container>
    );
}

function CloseIcon() {
    return (
        <EntryClose>
            <StylelessLink to={"/list"}>
                <FontAwesomeIcon icon={faTimes} size="2x" />
            </StylelessLink>
        </EntryClose>
    );
}

const Container = styled(SlideUpPageContainer)`
    display: flex;
    flex-direction: column;
    position: relative;
    font-family: ${(props) => props.theme.plainBoldTextFont};
    padding: 0px 80px;
    padding-top: 60px;
    padding-bottom: 30px;
`;

const SubContiner = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 85%;
`;

const EntryInnerRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50%;
`;

const EntryClose = styled.div`
    position: absolute;
    top: 40px;
    right: 45px;
    color: ${(props) => props.theme.entryMainBlue};
`;
