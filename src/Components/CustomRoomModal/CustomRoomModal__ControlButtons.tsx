import React from "react";
import styled from "styled-components";
import { useCustomRoomModalContext } from "./CustomRoomModalProvider";
import CircularProgress from "@material-ui/core/CircularProgress";

// TODO (bug)
// Buttons 대신 주석 처리한 부분으로 하면 showList state 변경이 안 됨
// 근데 if 조건문 ! 위치 맞바꾸면 작동함 (???????)

export default function CustomRoomModalControlButtons() {
    return (
        <Container>
            <UpperButtonsContainer>
                <UpperButtons />
                {/* <ShowListButton />
                <RoomCreateButton /> */}
            </UpperButtonsContainer>
            <EnterButton />
        </Container>
    );
}

function UpperButtons() {
    const { showList, setShowList, setSelectedRoomId, creatingRoom } =
        useCustomRoomModalContext();
    if (creatingRoom) {
        return (
            <>
                <UnSelectedButton>검색하기</UnSelectedButton>
                <SelectedButton>방만들기</SelectedButton>
            </>
        );
    } else {
        return (
            <>
                {showList ? (
                    <>
                        <SelectedButton>검색하기</SelectedButton>
                        <UnSelectedButton
                            onClick={() => {
                                setShowList(false);
                                setSelectedRoomId("");
                            }}
                        >
                            방만들기
                        </UnSelectedButton>
                    </>
                ) : (
                    <>
                        <UnSelectedButton
                            onClick={() => {
                                setShowList(true);
                            }}
                        >
                            검색하기
                        </UnSelectedButton>
                        <SelectedButton>방만들기</SelectedButton>
                    </>
                )}
            </>
        );
    }
}

// function ShowListButton() {
//     const { showList, setShowList } = useCustomRoomModalContext();
//     if (showList) return <SelectedButton>검색하기</SelectedButton>;
//     else {
//         return (
//             <UnSelectedButton
//                 onClick={() => {
//                     setShowList(false);
//                 }}
//             >
//                 검색하기
//             </UnSelectedButton>
//         );
//     }
// }

// function RoomCreateButton() {
//     const { showList, setShowList } = useCustomRoomModalContext();
//     if (!showList) return <SelectedButton>방만들기</SelectedButton>;
//     else {
//         return (
//             <UnSelectedButton
//                 onClick={() => {
//                     setShowList(true);
//                 }}
//             >
//                 방만들기
//             </UnSelectedButton>
//         );
//     }
// }

function EnterButton() {
    const { showList, creatingRoom } = useCustomRoomModalContext();
    if (creatingRoom) {
        return <CreatingProgressButton />;
    } else {
        return <>{showList ? <JoinButton /> : <CreateButton />}</>;
    }
}

function JoinButton() {
    const { enterRoom, selectedRoomId } = useCustomRoomModalContext();
    if (!!selectedRoomId) {
        return (
            <ReadyButton
                onClick={() => {
                    enterRoom(selectedRoomId);
                }}
            >
                참여하기
            </ReadyButton>
        );
    } else {
        return <UnReadyButton>참여하기</UnReadyButton>;
    }
}

function CreateButton() {
    const {
        roomNameInput,
        usePassword,
        passwordInput,
        passwordConfirmInput,
        createRoomAndPushToEntry,
    } = useCustomRoomModalContext();
    if (
        roomNameInput !== "" &&
        (!usePassword ||
            (usePassword &&
                passwordInput.length === 4 &&
                passwordInput === passwordConfirmInput))
    ) {
        return (
            <ReadyButton
                onClick={() => {
                    createRoomAndPushToEntry();
                }}
            >
                시작하기
            </ReadyButton>
        );
    } else {
        return <UnReadyButton>시작하기</UnReadyButton>;
    }
}

function CreatingProgressButton() {
    return (
        <CreatingButton>
            <CircularProgress color="inherit" size={30} thickness={5} />
        </CreatingButton>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 170px;
    height: 100%;
    margin-right: 30px;
`;

const UpperButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const ControlButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 24px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
    border-radius: 18px;
    margin-bottom: 10px;
`;

const SelectedButton = styled(ControlButton)`
    background-color: ${(props) => props.theme.entryMainBlue};
    color: white;
`;

const UnSelectedButton = styled(ControlButton)`
    border: 1px solid ${(props) => props.theme.entryMainBlue};
    background-color: white;
    color: ${(props) => props.theme.entryMainBlue};
    :hover {
        cursor: pointer;
    }
`;

const ReadyButton = styled(ControlButton)`
    background: ${(props) => props.theme.orangeGradient};
    color: white;
    :hover {
        cursor: pointer;
    }
`;

const UnReadyButton = styled(ControlButton)`
    background-color: ${(props) => props.theme.loginMessageGray};
    color: white;
`;

const CreatingButton = styled(ControlButton)`
    background: ${(props) => props.theme.orangeGradient};
    color: white;
`;
