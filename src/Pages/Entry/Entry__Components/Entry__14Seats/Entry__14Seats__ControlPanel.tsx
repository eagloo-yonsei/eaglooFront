import React from "react";
import styled from "styled-components";
import { RoomType } from "../../../../Constants";
import { useEntryContext } from "../../EntryProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default function Entry14SeatsControlPanel() {
    return (
        <Container>
            <CamPreview />
            <ControlButtons />
        </Container>
    );
}

function CamPreview() {
    const { camAccepted, userStreamHTMLRef } = useEntryContext();
    if (!camAccepted) {
        return <CamContainer>{`카메라 권한을 허용해주세요`}</CamContainer>;
    }

    return (
        <CamContainer>
            {userStreamHTMLRef && (
                <UserCam ref={userStreamHTMLRef} muted autoPlay playsInline />
            )}
        </CamContainer>
    );
}

function ControlButtons() {
    return (
        <ControlButtonsContainer>
            <TimeSelectorRow />
            <PasswordRow />
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

function PasswordRow() {
    const { roomType, roomInfo, roomPasswordInput, setRoomPasswordInput } =
        useEntryContext();
    if ("usePassword" in roomInfo && roomInfo.usePassword) {
        return (
            <PasswordRowContainer>
                <PasswordTitle roomType={roomType}>{`비밀번호`}</PasswordTitle>
                <EntryRowContent>
                    <PasswordInput
                        type="password"
                        value={roomPasswordInput}
                        onChange={(e) => {
                            if (
                                // TODO (bug?) 숫자 비밀번호 입력 제한 조건 설정시 0으로 시작이 안 됨.
                                e.target.value === "" ||
                                e.target.value === "0" ||
                                (Number(e.target.value) &&
                                    e.target.value.length <= 4)
                            ) {
                                setRoomPasswordInput(e.target.value);
                            }
                        }}
                    />
                </EntryRowContent>
            </PasswordRowContainer>
        );
    } else {
        return null;
    }
}

function EnterButton() {
    const {
        roomInfo,
        roomPasswordInput,
        selectedSeatNo,
        camAccepted,
        checkVacancy,
        enterRoom,
    } = useEntryContext();

    if (
        ("usePassword" in roomInfo &&
            roomInfo.usePassword &&
            roomPasswordInput.length !== 4) ||
        selectedSeatNo === 0 ||
        !camAccepted
    ) {
        return <EnterButton__Disable>{`참여하기`}</EnterButton__Disable>;
    } else {
        return (
            <EnterButton__Enable
                onClick={async function () {
                    if (await checkVacancy()) {
                        enterRoom();
                    }
                }}
            >
                {`참여하기`}
            </EnterButton__Enable>
        );
    }
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
    justify-content: center;
    align-items: center;
    gap: 48px;
    width: 50%;
    height: 92.5%;
    padding: 30px 0px;
    @media (max-width: ${(props) => props.theme.tabletWidth}) {
        padding: 15px 0px;
    }
`;

const GuideMessage = styled.div``;

const EntryRowContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 40px;
`;

const TimeSelectorRowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: fit-content;
    /* @media (max-width: ${(props) => props.theme.tabletWidth}) {
        flex-direction: column;
        align-items: center;
    } */
`;

const TimeSelectorTitle = styled.div<{ roomType: RoomType }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    /* min-width: 90px; */
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
    width: 60%;
    /* min-width: 160px; */
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

const PasswordRowContainer = styled(TimeSelectorRowContainer)``;

const PasswordTitle = styled(TimeSelectorTitle)``;

const PasswordInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 70%;
    height: 40px;
    text-align: center;
    border: 3.5px solid ${(props) => props.theme.listLightOrange};
    border-radius: 8px;
    :focus {
        outline: none;
    }
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
