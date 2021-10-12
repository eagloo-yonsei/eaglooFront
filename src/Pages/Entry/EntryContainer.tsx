import React from "react";
import styled from "styled-components";
import { useEntryContext } from "./EntryProvider";
import EntryHeader from "./Entry__Components/Entry__Header";
import Entry14Seats from "./Entry__Components/Entry__14Seats/Entry__14Seats";
import {
    ModalBackGround,
    SlideUpPageContainer,
} from "../../Styles/StyledComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function EntryContainer() {
    const { stopSelfStream, exitToList } = useEntryContext();

    return (
        <>
            <ModalBackGround
                onClick={() => {
                    stopSelfStream();
                    exitToList();
                }}
            />
            <Container>
                <EntryHeader />
                <Entry14Seats />
                <CloseIcon />
            </Container>
        </>
    );
}

function CloseIcon() {
    const { stopSelfStream, exitToList } = useEntryContext();
    return (
        <EntryClose
            onClick={() => {
                stopSelfStream();
                exitToList();
            }}
        >
            <FontAwesomeIcon icon={faTimes} size="2x" />
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

const EntryClose = styled.div`
    position: absolute;
    top: 40px;
    right: 45px;
    color: ${(props) => props.theme.entryMainBlue};
    cursor: pointer;
`;
