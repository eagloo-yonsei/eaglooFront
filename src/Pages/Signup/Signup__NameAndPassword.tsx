import React from "react";
import styled from "styled-components";
import { SubmitButton } from "../../Styles/StyledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useSignupContext } from "./SignupProvider";

export default function SignupNickNameAndRealName() {
    const {
        nickNameInput,
        realNameInput,
        nickNameAvailable,
        nickNameValidating,
        signingUp,
        setNickNameInput,
        setRealNameInput,
        checkNickNameDuplicate,
        setNickNameAvailable,
        setNameAndPassword,
        
        passwordInput,
        passwordConfirmInput,
        setPasswordInput,
        setPasswordConfirmInput,
        passwordInputRef,
    } = useSignupContext();

    return (
        <>
            <NickNameRow>
                <NickNameBox
                    type="text"
                    placeholder="닉네임 (3자 이상)"
                    value={nickNameInput}
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
                <NickNameValidationBox nickNameAvailable={nickNameAvailable}>
                    <SubmitButton
                        buttonContent={"중복 확인"}
                        loadingStatus={nickNameValidating}
                        disabledCondition={
                            nickNameInput.length < 3 || nickNameAvailable
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
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            {`닉네임 중복을 확인해주세요`}
                        </>
                    )}
                </NickNameValidationBox>
            </NickNameRow>
            <RealNameBox
                type="text"
                placeholder="실명"
                value={realNameInput}
                onChange={(e) => {
                    setRealNameInput(e.target.value);
                }}
            />
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
                        //setPassword();
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
                        //setPassword();
                    }
                }}
            />
            <WarningMessageBox />

            <SubmitButton
                buttonContent={`이글루 시작하기`}
                loadingStatus={signingUp}
                submitFunction={setNameAndPassword}
                disabledCondition={
                    (!!nickNameInput && !nickNameAvailable) || !realNameInput || passwordInput.length < 8 
                    || passwordInput !== passwordConfirmInput
                }
                fontSize={"18px"}
            />
        </>
    );
}

const InputBox = styled.input.attrs({
    spellCheck: "false",
})`
    width: 100%;
    height: 46px;
    font-size: 18px;
    font-family: ${(props) => props.theme.subLabelFont};
    padding: 0 12px;
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

const NickNameBox = styled(InputBox)``;

const RealNameBox = styled(InputBox)``;

const NickNameRow = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 46px;
`;

const NickNameValidationBox = styled.div<{
    nickNameAvailable: boolean;
}>`
    position: absolute;
    right: -195px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 280px;
    height: fit-content;
    gap: 15px;
    font-size: 12px;
    font-family: ${(props) => props.theme.subLabelFont};
    color: ${(props) => (props.nickNameAvailable ? "white" : "orangered")};
`;



function WarningMessageBox() {
    const { passwordInput, passwordConfirmInput } = useSignupContext();

    return (
        <>
            {passwordInput.length > 0 && passwordConfirmInput.length > 0 && (
                <WarningMessageOuterContainer>
                    <WarningMessageInnerContainer style={{bottom: "83px"}}>
                        {passwordInput.length < 8 && (
                            <WarningMessage
                                warningMessage={`비밀번호는 최소 8자리 이상이어야 합니다`}
                            />
                        )}
                    </WarningMessageInnerContainer>
                    <WarningMessageInnerContainer style={{bottom: "23px"}}>
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

const PasswordInputBox = styled.input`
    width: 100%;
    height: 46px;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 12px;
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


const PasswordBox = styled(PasswordInputBox)``;

const PasswordConfirmBox = styled(PasswordInputBox)``;

const WarningMessageOuterContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 0px;
`;

const WarningMessageInnerContainer = styled.div`
    position: absolute;
    left:310px;
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
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
`;

const WarningIcon = styled.div`
    margin-right: 12px;
`;
