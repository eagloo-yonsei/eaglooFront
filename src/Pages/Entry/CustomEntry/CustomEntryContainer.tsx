import React, { useRef, useEffect, RefObject } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
    ModalBackGround,
    SlideUpPageContainer,
    StylelessLink,
} from "../../../Styles/StyledComponents";
import CustomEntryHeader from "./CustomEntry__Header";
import CustomEntry16Seats from "./CustomEntry__16Seats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface CloseButtonProp {
    stopSelfStream: () => void;
}

interface EntryPanelProp {
    userStreamRef: RefObject<HTMLVideoElement>;
    stopSelfStream: () => void;
}

export default function CustomEntryContainer() {
    const history = useHistory();
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
        <>
            <ModalBackGround
                onClick={() => {
                    stopSelfStream();
                    history.push("/list");
                }}
            />
            <Container>
                <CustomEntryHeader />
                <SubContiner>
                    <EntryBody
                        userStreamRef={userStreamRef}
                        stopSelfStream={stopSelfStream}
                    />
                </SubContiner>
                <CloseIcon stopSelfStream={stopSelfStream} />
            </Container>
        </>
    );
}

function EntryBody({ userStreamRef, stopSelfStream }: EntryPanelProp) {
    // TODO (development)
    // 방 자리 수에 따라 렌더링 대상 변경

    // if(roomInfo.maxSeats === 8){
    //     return (<></>)
    // }
    // if(roomInfo.maxSeats === 16){
    //     return (<></>)
    // }

    return (
        <CustomEntry16Seats
            userStreamRef={userStreamRef}
            stopSelfStream={stopSelfStream}
        />
    );
}

function CloseIcon({ stopSelfStream }: CloseButtonProp) {
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

const EntryClose = styled.div`
    position: absolute;
    top: 40px;
    right: 45px;
    color: ${(props) => props.theme.entryMainBlue};
`;
