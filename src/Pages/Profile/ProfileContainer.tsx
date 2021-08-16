import React from "react";
import styled from "styled-components";
import { useProfileContext } from "./ProfileProvider";
import {
    SlideUpPageContainer,
    SubmitButton,
} from "../../Styles/StyledComponents";
import ProfileBody from "./Profile__Body";
import ProfileModal from "./Profile__Modal";

export default function ProfileContainer() {
    const {
        modalOpenCondition,
        updating,
        updatable,
        openConfirmModal,
        updateUserInfo,
    } = useProfileContext();

    return (
        <>
            <Container>
                <Header>
                    <Title>{`내 정보 관리`}</Title>
                </Header>
                <ProfileBody />
                <Footer>
                    <CancelButton>{`취소`}</CancelButton>
                    <SubmitButton
                        buttonContent={"정보 변경"}
                        loadingStatus={updating}
                        submitFunction={
                            modalOpenCondition
                                ? openConfirmModal
                                : updateUserInfo
                        }
                        disabledCondition={!updatable}
                        width={"120px"}
                        fontSize={"18px"}
                    />
                </Footer>
            </Container>
            <ProfileModal />
        </>
    );
}

const Container = styled(SlideUpPageContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-family: ${(props) => props.theme.subLabelFont};
    padding: 80px 120px 40px 120px;
`;

const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    height: fit-content;
`;

const Footer = styled(Header)`
    justify-content: flex-end;
    gap: 15px;
    height: fit-content;
    padding: 0px 20px;
`;

const Title = styled.div`
    font-size: 30px;
    font-family: ${(props) => props.theme.iconFont};
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
