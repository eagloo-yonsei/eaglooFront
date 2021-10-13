import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
import { useCustomRoomModalContext } from "./CustomRoomModalProvider";
import CustomRoomModalControlButtons from "./CustomRoomModal__ControlButtons";
import CustomRoomModalList from "./CustomRoomModal__List";
import CustomRoomModalCreate from "./CustomRoomModal__Create";
import { ModalBackGround } from "../../Styles/StyledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// TODO (code clearance) Modal 팝업 여부 Home Provider에서 관리
export default function CustomRoomModalContainer() {
    const { showCustomRoomModal, setShowCustomRoomModal } = useAppContext();
    const {
        showList,
        setShowList,
        setSearchingRoomNameInput,
        setSelectedRoomId,
        setRoomNameInput,
        setRoomDescriptionInput,
        setUsePassword,
        setPasswordInput,
        setPasswordConfirmInput,
        setAllowMic,
    } = useCustomRoomModalContext();

    function CloseCustomRoomModal() {
        setShowCustomRoomModal(false);
        setShowList(true);
        setSearchingRoomNameInput("");
        setSelectedRoomId("");
        setRoomNameInput("");
        setRoomDescriptionInput("");
        setUsePassword(false);
        setPasswordInput("");
        setPasswordConfirmInput("");
        setAllowMic(false);
    }

    if (!showCustomRoomModal) return null;
    else
        return (
            <ModalOuterContainer>
                <ModalInnerContainer>
                    <ModalBackGround
                        onClick={() => {
                            CloseCustomRoomModal();
                        }}
                    />
                    <Container>
                        <CustomRoomModalControlButtons />
                        {showList ? (
                            <CustomRoomModalList />
                        ) : (
                            <CustomRoomModalCreate />
                        )}
                        <CloseIcon
                            CloseCustomRoomModal={CloseCustomRoomModal}
                        />
                    </Container>
                </ModalInnerContainer>
            </ModalOuterContainer>
        );
}

interface CloseIconProp {
    CloseCustomRoomModal: () => void;
}

function CloseIcon({ CloseCustomRoomModal }: CloseIconProp) {
    return (
        <ModalClose
            onClick={() => {
                CloseCustomRoomModal();
            }}
        >
            <FontAwesomeIcon icon={faTimes} />
        </ModalClose>
    );
}

const ModalOuterContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const ModalInnerContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: max(720px, 54%);
    max-width: 840px;
    height: max(480px, 54%);
    max-height: 520px;
    background-color: white;
    border-radius: 30px;
    padding: 25px 32px;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`;

const ModalClose = styled.div`
    position: absolute;
    top: 15px;
    right: 24px;
    font-size: 28px;
    color: ${(props) => props.theme.entryMainBlue};
    :hover {
        cursor: pointer;
    }
`;
