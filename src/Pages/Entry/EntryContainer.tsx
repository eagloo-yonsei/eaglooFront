import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import {
    SlideUpPageContainer,
    StylelessLink,
} from "../../Styles/StyledComponents";
import EntryHeader from "./Entry__Header";
import EntryOuterRow from "./Entry__OuterRow";
import EntryOuterColumn from "./Entry__OuterColumn";
import EntryCenterPanel from "./Entry__CenterPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface PanelButtonProp {
    stopSelfStream: () => void;
}

export default function EntryContainer() {
    const userStreamRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                userStreamRef.current!.srcObject = stream;
            });
        return () => {};
    }, []);

    function stopSelfStream() {
        const selfStream = userStreamRef.current?.srcObject as MediaStream;
        const tracks = selfStream?.getTracks();
        if (tracks) {
            tracks.forEach((track) => {
                track.stop();
            });
        }
    }

    return (
        <Container>
            <EntryHeader />
            <SubContiner>
                <EntryOuterRow seatNums={[1, 2, 3, 4, 5, 6]} />
                <EntryInnerRow>
                    <EntryOuterColumn seatNums={[7, 9]} />
                    <EntryCenterPanel
                        userStreamRef={userStreamRef}
                        stopSelfStream={stopSelfStream}
                    />
                    <EntryOuterColumn seatNums={[8, 10]} />
                </EntryInnerRow>
                <EntryOuterRow seatNums={[11, 12, 13, 14, 15, 16]} />
            </SubContiner>
            <CloseIcon stopSelfStream={stopSelfStream} />
        </Container>
    );
}

function CloseIcon({ stopSelfStream }: PanelButtonProp) {
    return (
        <EntryClose
            onClick={() => {
                stopSelfStream();
            }}
        >
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
