import React, { RefObject } from "react";
import styled from "styled-components";
import { usePublicEntryContext } from "./PublicEntryProvider";

interface EntryPanelProp {
    userStreamRef: RefObject<HTMLVideoElement>;
    stopSelfStream: () => void;
}

interface StreamProp {
    userStreamRef: RefObject<HTMLVideoElement>;
}

interface PanelButtonProp {
    stopSelfStream: () => void;
}

export default function PublicEntryControlPanel({
    userStreamRef,
    stopSelfStream,
}: EntryPanelProp) {
    return (
        <Container>
            <CamPreview userStreamRef={userStreamRef} />
            <ControlButtons stopSelfStream={stopSelfStream} />
        </Container>
    );
}

function CamPreview({ userStreamRef }: StreamProp) {
    return (
        <CamContainer>
            {userStreamRef !== undefined ? (
                <UserCam ref={userStreamRef} autoPlay playsInline />
            ) : (
                <></>
            )}
        </CamContainer>
    );
}

function ControlButtons({ stopSelfStream }: PanelButtonProp) {
    return (
        <ControlButtonContainer>
            <EnterButton stopSelfStream={stopSelfStream} />
        </ControlButtonContainer>
    );
}

function EnterButton({ stopSelfStream }: PanelButtonProp) {
    const { roomNo, selectedSeatNo, checkVacancy, enterRoom } =
        usePublicEntryContext();

    return (
        <>
            {selectedSeatNo === 0 ? (
                <EnterButton__Disable>참여하기</EnterButton__Disable>
            ) : (
                <EnterButton__Enable
                    onClick={async function () {
                        if (await checkVacancy(roomNo, selectedSeatNo)) {
                            stopSelfStream();
                            enterRoom(roomNo, selectedSeatNo);
                        }
                    }}
                >
                    참여하기
                </EnterButton__Enable>
            )}
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 68.4%;
    height: 100%;
`;

const CamContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42%;
    height: 92.5%;
    background-color: black;
    border-radius: 15px;
    overflow: hidden;
`;

const UserCam = styled.video`
    max-width: 100%;
    max-height: 100%;
`;

const ControlButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 42%;
    height: 92.5%;
`;

const EnterButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 45px;
    color: white;
    font-size: 24px;
    font-family: ${(props) => props.theme.inButtonFont};
    border-radius: 15px;
`;

const EnterButton__Enable = styled(EnterButtonDiv)`
    background: ${(props) => props.theme.orangeGradient};
    :hover {
        cursor: pointer;
    }
`;

const EnterButton__Disable = styled(EnterButtonDiv)`
    background-color: ${(props) => props.theme.loginMessageGray};
`;
