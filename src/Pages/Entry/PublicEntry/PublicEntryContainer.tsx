import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
    ModalBackGround,
    SlideUpPageContainer,
    StylelessLink,
} from "../../../Styles/StyledComponents";
import PublicEntryHeader from "./PublicEntry__Header";
import PublicEntryOuterRow from "./PublicEntry__OuterRow";
import PublicEntryOuterColumn from "./PublicEntry__OuterColumn";
import PublicEntryControlPanel from "./PublicEntry__ControlPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface PanelButtonProp {
    stopSelfStream: () => void;
}

export default function PublicEntryContainer() {
    const history = useHistory();
    const userStreamRef = useRef<HTMLVideoElement>(null);

    // TODO (enhancement)
    // stream 객체를 AppProvider에서 관리할 수 있도록 수정
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
        <>
            <ModalBackGround
                onClick={() => {
                    stopSelfStream();
                    history.push("/list");
                }}
            />
            <Container>
                <PublicEntryHeader />
                <SubContiner>
                    <PublicEntryOuterRow seatNums={[1, 2, 3, 4, 5, 6]} />
                    <EntryInnerRow>
                        <PublicEntryOuterColumn seatNums={[7, 9]} />
                        <PublicEntryControlPanel
                            userStreamRef={userStreamRef}
                            stopSelfStream={stopSelfStream}
                        />
                        <PublicEntryOuterColumn seatNums={[8, 10]} />
                    </EntryInnerRow>
                    <PublicEntryOuterRow seatNums={[11, 12, 13, 14, 15, 16]} />
                </SubContiner>
                <CloseIcon stopSelfStream={stopSelfStream} />
            </Container>
        </>
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