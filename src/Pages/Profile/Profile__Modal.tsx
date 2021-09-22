import React from "react";
import styled from "styled-components";
import { useProfileContext } from "./ProfileProvider";
import { ModalBackGround, SubmitButton } from "../../Styles/StyledComponents";

export default function ProfileModal() {
    const {
        confirmModalOpen,
        updating,
        nickNameAvailable,
        nickNameInput,
        setConfirmModalOpen,
        updateUserInfo,
    } = useProfileContext();
    if (!confirmModalOpen) return null;
    return (
        <ModalOuterContainer>
            <ModalInnerContainer>
                <ModalBackGround
                    onClick={() => {
                        setConfirmModalOpen(false);
                    }}
                />
                <Container>
                    <Header>{`닉네임은 변경할 수 없습니다`}</Header>
                    <Body>
                        {nickNameAvailable && (
                            <InfoRow>
                                <InfoRowTitle>{`닉네임`}</InfoRowTitle>
                                <InputInfo>{nickNameInput}</InputInfo>
                            </InfoRow>
                        )}
                    </Body>
                    <Footer>
                        <ConfirmingMessage>
                            {`정보를 업데이트 할까요?`}
                        </ConfirmingMessage>
                        <ButtonsContainer>
                            <CancelButton
                                onClick={() => {
                                    setConfirmModalOpen(false);
                                }}
                            >
                                {`취소`}
                            </CancelButton>
                            <SubmitButton
                                buttonContent={"확인"}
                                loadingStatus={updating}
                                submitFunction={updateUserInfo}
                                width={"80px"}
                                height={"32px"}
                                fontSize={"15px"}
                                ringSize={15}
                            />
                        </ButtonsContainer>
                    </Footer>
                </Container>
            </ModalInnerContainer>
        </ModalOuterContainer>
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
    flex-direction: column;
    justify-content: space-between;
    width: max(540px, 40%);
    max-width: 640px;
    height: max(320px, 40%);
    max-height: 520px;
    background-color: white;
    border-radius: 30px;
    padding: 35px 60px;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 21px;
    font-family: ${(props) => props.theme.iconFont};
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    width: 100%;
    height: fit-content;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 50px;
    gap: 25px;
`;

const InfoRowTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 100%;
    font-size: 16px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const InputInfo = styled(InfoRowTitle)`
    width: 50%;
    font-size: 28px;
`;

const Footer = styled(Header)`
    justify-content: space-between;
    height: fit-content;
`;

const ConfirmingMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: orange;
    font-size: 15px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const ButtonsContainer = styled.div`
    display: flex;
    width: fit-content;
    height: fit-content;
    gap: 15px;
`;

const CancelButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 32px;
    font-size: 15px;
    font-family: ${(props) => props.theme.subLabelFont};
    color: ${(props) => props.theme.mainBlue};
    border: 2px solid ${(props) => props.theme.mainBlue};
    border-radius: 8px;
    cursor: pointer;
`;
