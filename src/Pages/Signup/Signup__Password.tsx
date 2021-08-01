import React from "react";
import styled from "styled-components";
import { SubmitButton } from "../../Styles/StyledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import { useSignupContext } from "./SignupProvider";

export default function SignupPassword() {
    const {
        passwordInput,
        passwordConfirmInput,
        signingUp,
        setPasswordInput,
        setPasswordConfirmInput,
        setPassword,
        passwordInputRef,
    } = useSignupContext();

    return (
        <>
            <PasswordBox
                ref={passwordInputRef}
                type="password"
                value={passwordInput}
                placeholder="비밀번호"
                onChange={(e) => {
                    if (e.target.value.length <= 30) {
                        setPasswordInput(e.target.value);
                    }
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        setPassword();
                    }
                }}
            />
            <PasswordConfirmBox
                type="password"
                value={passwordConfirmInput}
                placeholder="비밀번호 확인"
                onChange={(e) => {
                    if (e.target.value.length <= 30) {
                        setPasswordConfirmInput(e.target.value);
                    }
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        setPassword();
                    }
                }}
            />
            <SubmitButton
                buttonContent={`비밀번호 설정하기`}
                loadingStatus={signingUp}
                submitFunction={setPassword}
                disabledCondition={
                    passwordInput.length < 8 ||
                    passwordInput !== passwordConfirmInput
                }
                fontSize={"18px"}
            />
            <WarningMessageBox />
        </>
    );
}

function WarningMessageBox() {
    const { passwordInput, passwordConfirmInput } = useSignupContext();

    return (
        <>
            {passwordInput.length > 0 && passwordConfirmInput.length > 0 && (
                <WarningMessageOuterContainer>
                    <WarningMessageInnerContainer>
                        {passwordInput.length < 8 && (
                            <WarningMessage
                                warningMessage={`비밀번호는 최소 8자리 이상이어야 합니다`}
                            />
                        )}
                        {passwordInput !== passwordConfirmInput && (
                            <WarningMessage
                                warningMessage={`비밀번호가 일치하지 않습니다`}
                            />
                        )}
                    </WarningMessageInnerContainer>
                </WarningMessageOuterContainer>
            )}
        </>
    );
}

interface WarningMessageProp {
    warningMessage: string;
}

function WarningMessage({ warningMessage }: WarningMessageProp) {
    return (
        <WarningMessageContainer>
            <WarningIcon>
                <FontAwesomeIcon icon={faExclamationCircle} />
            </WarningIcon>
            {warningMessage}
        </WarningMessageContainer>
    );
}

const InputBox = styled.input`
    width: 100%;
    height: 46px;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 12px;
    margin-bottom: 15px;
    border: none;
    border-radius: 8px;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: ${(props) => props.theme.placeholder};
        font-family: ${(props) => props.theme.subLabelFont};
    }
`;

const PasswordBox = styled(InputBox)``;

const PasswordConfirmBox = styled(InputBox)``;

const WarningMessageOuterContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 0px;
`;

const WarningMessageInnerContainer = styled.div`
    position: absolute;
    top: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: orangered;
    font-size: 12px;
    font-family: ${(props) => props.theme.subLabelFont};
`;

const WarningMessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
`;

const WarningIcon = styled.div`
    margin-right: 12px;
`;
