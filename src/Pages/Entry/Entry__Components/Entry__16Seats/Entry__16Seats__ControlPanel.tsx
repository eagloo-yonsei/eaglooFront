import React from "react";
import styled from "styled-components";
import { RoomType } from "../../../../Constants";
import { useEntryContext } from "../../EntryProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default function Entry16SeatsControlPanel() {
    return (
        <Container>
            <CamPreview />
            <ControlButtons />
        </Container>
    );
}

function CamPreview() {
    const { camAccepted, userStreamRef } = useEntryContext();
    if (!camAccepted) {
        return <CamContainer>{`카메라 권한을 허용해주세요`}</CamContainer>;
    }

    return (
        <CamContainer>
            {userStreamRef && (
                <UserCam ref={userStreamRef} muted autoPlay playsInline />
            )}
        </CamContainer>
    );
}

function ControlButtons() {
    return (
        <ControlButtonsContainer>
            <TimeSelectorRow />
            <EnterButton />
        </ControlButtonsContainer>
    );
}

function TimeSelectorRow() {
    const { roomType, timeToStudy, decreaseTimeToStudy, increaseTimeToStudy } =
        useEntryContext();

    return (
        <TimeSelectorRowContainer>
            <TimeSelectorTitle roomType={roomType}>
                {`시간선택`}
            </TimeSelectorTitle>
            <TimeSelector>
                <ArrowIcon
                    roomType={roomType}
                    onClick={() => {
                        decreaseTimeToStudy();
                    }}
                >
                    <FontAwesomeIcon icon={faCaretLeft} />
                </ArrowIcon>
                <SelectedTime>{`${timeToStudy} H`}</SelectedTime>
                <ArrowIcon
                    roomType={roomType}
                    onClick={() => {
                        increaseTimeToStudy();
                    }}
                >
                    <FontAwesomeIcon icon={faCaretRight} />
                </ArrowIcon>
            </TimeSelector>
        </TimeSelectorRowContainer>
    );
}

function EnterButton() {
    const { selectedSeatNo, camAccepted, checkVacancy, enterRoom } =
        useEntryContext();

    return (
        <>
            {selectedSeatNo === 0 || !camAccepted ? (
                <EnterButton__Disable>{`참여하기`}</EnterButton__Disable>
            ) : (
                <EnterButton__Enable
                    onClick={async function () {
                        if (await checkVacancy()) {
                            enterRoom();
                        }
                    }}
                >
                    {`참여하기`}
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    width: 42%;
    height: 92.5%;
    color: white;
    font-size: 14px;
    font-family: ${(props) => props.theme.inButtonFont};
    background-color: black;
    border-radius: 15px;
    overflow: hidden;
`;

const UserCam = styled.video`
    max-width: 100%;
    max-height: 100%;
`;

const ControlButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: 42%;
    height: 92.5%;
    padding: 30px 0px;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        padding: 15px 0px;
    }
`;

const TimeSelectorRowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: fit-content;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        flex-direction: column;
        align-items: center;
    }
`;

const TimeSelectorTitle = styled.div<{ roomType: RoomType }>`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 90px;
    height: 40px;
    color: ${(props) =>
        props.roomType === RoomType.PUBLIC
            ? props.theme.entryLightBlue
            : props.theme.listLightOrange};
    font-size: 24px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        font-size: 18px;
    }
`;

const TimeSelector = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 160px;
    height: 40px;
    gap: 10px;
`;

const SelectedTime = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    font-size: 22px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const ArrowIcon = styled.div<{ roomType: RoomType }>`
    color: ${(props) =>
        props.roomType === RoomType.PUBLIC
            ? props.theme.arrowBlue
            : props.theme.listMainOrange};
    font-size: 40px;
    cursor: pointer;
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
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        width: 100px;
        height: 40px;
        font-size: 18px;
        border-radius: 8px;
    }
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
