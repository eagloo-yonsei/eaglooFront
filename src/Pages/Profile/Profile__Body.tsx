import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
import { useProfileContext } from "./ProfileProvider";
import { SubmitButton } from "../../Styles/StyledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function ProfileBody() {
    const { userInfo } = useAppContext();
    const {
        nickNameAvailable,
        nickNameValidating,
        updating,
        nickNameInput,
        newPasswordInput,
        newPasswordConfirmInput,
        setNickNameAvailable,
        setNickNameInput,
        setNewPasswordInput,
        setNewPasswordConfirmInput,
        checkNickNameDuplicate,
    } = useProfileContext();

    return (
        <Container>
            <InputRow>
                <InputRowTitle>{`닉네임`}</InputRowTitle>
                {userInfo?.nickName ? (
                    <ExistingValueBox>{`${userInfo.nickName}`}</ExistingValueBox>
                ) : (
                    <>
                        <InputBox
                            disabled={updating || nickNameValidating}
                            type="text"
                            value={nickNameInput}
                            placeholder="닉네임 (3자 이상)"
                            onChange={(e) => {
                                if (e.target.value.length <= 10) {
                                    setNickNameInput(e.target.value);
                                }
                                if (nickNameAvailable) {
                                    setNickNameAvailable(false);
                                }
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    checkNickNameDuplicate();
                                }
                            }}
                        />
                        <NickNameValidationBox
                            nickNameAvailable={nickNameAvailable}
                        >
                            <SubmitButton
                                buttonContent={"중복 확인"}
                                loadingStatus={nickNameValidating}
                                disabledCondition={
                                    nickNameInput.length < 3 ||
                                    nickNameAvailable
                                }
                                submitFunction={checkNickNameDuplicate}
                                width={"80px"}
                                height={"32px"}
                                fontSize={"12px"}
                                ringSize={15}
                            />
                            {nickNameAvailable ? (
                                <>
                                    <FontAwesomeIcon icon={faCheck} />
                                    {`사용 가능한 닉네임입니다`}
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon
                                        icon={faExclamationCircle}
                                    />
                                    {`닉네임 중복을 확인해주세요`}
                                </>
                            )}
                        </NickNameValidationBox>
                    </>
                )}
            </InputRow>
            <InputRow>
                <InputRowTitle>{`실명`}</InputRowTitle>
                <ExistingValueBox>{`${userInfo?.realName}`}</ExistingValueBox>
            </InputRow>
            <InputRow>
                <InputRowTitle>{`비밀번호 변경`}</InputRowTitle>
                <PasswordBox
                    disabled={updating}
                    type="password"
                    value={newPasswordInput}
                    placeholder="새로운 비밀번호"
                    onChange={(e) => {
                        if (e.target.value.length <= 30) {
                            setNewPasswordInput(e.target.value);
                        }
                    }}
                />
            </InputRow>
            <InputRow>
                <InputRowTitle>{`비밀번호 변경 확인`}</InputRowTitle>
                <PasswordBox
                    disabled={updating}
                    type="password"
                    value={newPasswordConfirmInput}
                    placeholder="새로운 비밀번호 확인"
                    onChange={(e) => {
                        if (e.target.value.length <= 30) {
                            setNewPasswordConfirmInput(e.target.value);
                        }
                    }}
                />
                <WarningMessages />
            </InputRow>
        </Container>
    );
}

function WarningMessages() {
    const { newPasswordInput, newPasswordConfirmInput, previousPasswordInput } =
        useProfileContext();

    return (
        <>
            {!!newPasswordInput && !!newPasswordConfirmInput && (
                <WarningMessageBox>
                    {newPasswordInput.length < 8 && (
                        <WarningMessage>
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            {`비밀번호는 8자리 이상이어야 합니다.`}
                        </WarningMessage>
                    )}
                    {newPasswordInput !== newPasswordConfirmInput && (
                        <WarningMessage>
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            {`비밀번호가 일치하지 않습니다.`}
                        </WarningMessage>
                    )}
                    {newPasswordInput === previousPasswordInput && (
                        <WarningMessage>
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            {`이전 비밀번호와 다르게 설정해주세요.`}
                        </WarningMessage>
                    )}
                </WarningMessageBox>
            )}
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    height: fit-content;
    padding: 50px 0px 0px 55px;
    padding-top: max(40px, 2.5%);
    margin-bottom: 20px;
`;

const InputRow = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: fit-content;
    gap: 30px;
    height: 46px;
`;

const InputRowTitle = styled.div`
    display: flex;
    align-items: center;
    width: 150px;
    height: 100%;
    font-size: 18px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const ExistingValueBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 100%;
    font-size: 21px;
    font-family: ${(props) => props.theme.subLabelFont};
`;

const InputBox = styled.input.attrs({
    spellCheck: "false",
})`
    width: 200px;
    height: 100%;
    font-size: 15px;
    font-family: ${(props) => props.theme.subLabelFont};
    text-align: center;
    border: 2px solid gray;
    border-radius: 8px;
    padding: 0 12px;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: gray;
        font-family: ${(props) => props.theme.subLabelFont};
    }
`;

const AdditionalMessageBox = styled.div`
    position: absolute;
    right: -295px;
    display: flex;
    justify-content: flex-start;
    width: 280px;
    height: fit-content;
    gap: 12px;
    font-size: 12px;
    font-family: ${(props) => props.theme.subLabelFont};
`;

const NickNameValidationBox = styled(AdditionalMessageBox)<{
    nickNameAvailable: boolean;
}>`
    align-items: center;
    color: ${(props) => (props.nickNameAvailable ? "green" : "orangered")};
`;

const WarningMessageBox = styled(AdditionalMessageBox)`
    flex-direction: column;
    align-items: flex-start;
    color: orangered;
`;

const WarningMessage = styled.div`
    display: flex;
    gap: 12px;
`;

const PasswordBox = styled(InputBox)`
    text-align: flex-start;
    font-family: Arial, Helvetica, sans-serif;
`;
