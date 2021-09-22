import React from "react";
import styled from "styled-components";
import { useProfileContext } from "./ProfileProvider";
import { SubmitButton } from "../../Styles/StyledComponents";

export default function ProfileFoot() {
    const {
        modalOpenCondition,
        updating,
        updatable,
        openConfirmModal,
        updateUserInfo,
    } = useProfileContext();

    return (
        <Container>
            <CancelButton>{`취소`}</CancelButton>
            <SubmitButton
                buttonContent={"정보 변경"}
                loadingStatus={updating}
                submitFunction={
                    modalOpenCondition ? openConfirmModal : updateUserInfo
                }
                disabledCondition={!updatable}
                width={"120px"}
                fontSize={"18px"}
            />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    width: 100%;
    height: fit-content;
    padding: 0px 20px;
`;

const CancelButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 46px;
    font-size: 18px;
    font-family: ${(props) => props.theme.subLabelFont};
    color: ${(props) => props.theme.mainBlue};
    border: 2px solid ${(props) => props.theme.mainBlue};
    border-radius: 8px;
    cursor: pointer;
`;
