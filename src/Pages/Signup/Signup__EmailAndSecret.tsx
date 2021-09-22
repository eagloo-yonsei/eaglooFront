import React from "react";
import styled from "styled-components";
import { SubmitButton } from "../../Styles/StyledComponents";
import { useSignupContext } from "./SignupProvider";

export default function SignupEmailAndSecret() {
    return (
        <>
            <Email />
            <Secret />
        </>
    );
}

function Email() {
    const {
        emailInput,
        secretSended,
        secretSending,
        setEmailInput,
        sendSecret,
        emailInputRef,
    } = useSignupContext();

    return (
        <>
            <EmailBoxContainer className="idboxcontainer">
                <EmailBox
                    ref={emailInputRef}
                    disabled={secretSended || secretSending}
                    mutable={!secretSended}
                    type="text"
                    spellCheck="false"
                    value={emailInput}
                    placeholder="연세 메일 주소"
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            sendSecret();
                        }
                    }}
                />
                <YonseiMailPlaceholder>{`@yonsei.ac.kr`}</YonseiMailPlaceholder>
            </EmailBoxContainer>
            {!secretSended && (
                <SubmitButton
                    buttonContent={`인증 메일 보내기`}
                    loadingStatus={secretSending}
                    submitFunction={sendSecret}
                    fontSize={"18px"}
                />
            )}
        </>
    );
}

function Secret() {
    const {
        secretInput,
        secretSended,
        secretAuthenticating,
        setSecretInput,
        authenticateSecret,
        secretInputRef,
    } = useSignupContext();

    if (!secretSended) {
        return null;
    }

    return (
        <>
            <SecretBox
                ref={secretInputRef}
                disabled={!secretSended || secretAuthenticating}
                mutable={secretSended}
                type="text"
                spellCheck="false"
                value={secretInput}
                placeholder="인증 단어"
                onChange={(e) => {
                    setSecretInput(e.target.value);
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        authenticateSecret();
                    }
                }}
            />
            <SubmitButton
                buttonContent={`메일 인증하기`}
                loadingStatus={secretAuthenticating}
                submitFunction={authenticateSecret}
                fontSize={"18px"}
            />
        </>
    );
}

const EmailBoxContainer = styled.div`
    position: relative;
    width: 100%;
`;

interface InputBoxProp {
    mutable: boolean;
}

const InputBox = styled.input<InputBoxProp>`
    width: 100%;
    height: 46px;
    font-size: 18px;
    font-family: ${(props) => props.theme.subLabelFont};
    background-color: ${(props) =>
        props.mutable ? "none" : props.theme.loginMessageGray};
    padding: 0 12px;
    border: none;
    border-radius: 8px;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: ${(props) => props.theme.placeholder};
    }
`;

const EmailBox = styled(InputBox)``;

const SecretBox = styled(InputBox)``;

const YonseiMailPlaceholder = styled.h4`
    position: absolute;
    top: 15px;
    right: 12px;
    color: ${(props) => props.theme.mailPlaceholder};
    font-size: 18px;
    font-family: ${(props) => props.theme.subLabelFont};
`;
