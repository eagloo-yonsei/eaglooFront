import React, { useEffect } from "react";
import styled from "styled-components";
import EaglooIconBox from "../../Components/EaglooIconBox";
import {
    FullPageContainer,
    SubmitButton,
    StylelessLink,
} from "../../Styles/StyledComponents";
import { useLoginContext } from "./LoginProvider";

export default function LoginContainer() {
    const {
        emailInput,
        passwordInput,
        signingIn,
        setEmailInput,
        setPasswordInput,
        signIn,
        emailInputRef,
    } = useLoginContext();

    useEffect(() => {
        emailInputRef?.current?.focus();
        return () => {};
    }, []);

    return (
        <Container>
            <InnerContainer>
                <EaglooIconBox />
                <EmailBoxContainer className="idboxcontainer">
                    <EmailBox
                        ref={emailInputRef}
                        type="text"
                        spellCheck="false"
                        value={emailInput}
                        placeholder="id"
                        onChange={(e) => setEmailInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                signIn();
                            }
                        }}
                    />
                    <YonseiMailPlaceholder>{`@yonsei.ac.kr`}</YonseiMailPlaceholder>
                </EmailBoxContainer>
                <PasswordBox
                    type="password"
                    value={passwordInput}
                    placeholder="password"
                    onChange={(e) => {
                        setPasswordInput(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            signIn();
                        }
                    }}
                />
                <SubmitButton
                    buttonContent={`로그인`}
                    loadingStatus={signingIn}
                    submitFunction={signIn}
                />
                <UtilButtonsContainer>
                    <UtilButton>
                        <StylelessLink to={`/signup`}>
                            {`회원가입`}
                        </StylelessLink>
                    </UtilButton>
                </UtilButtonsContainer>
            </InnerContainer>
        </Container>
    );
}

const Container = styled(FullPageContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`;

const EmailBoxContainer = styled.div`
    position: relative;
    width: 100%;
`;

const YonseiMailPlaceholder = styled.h4`
    position: absolute;
    top: 15px;
    right: 12px;
    color: ${(props) => props.theme.mailPlaceholder};
    font-size: 18px;
    font-family: ${(props) => props.theme.subLabelFont};
`;

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
    }
`;

const EmailBox = styled(InputBox)``;

const PasswordBox = styled(InputBox)``;

const UtilButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    /* justify-content: space-between; */
    width: 92%;
    margin-top: 45px;
    /* margin-bottom: 30px; */
`;

const UtilButton = styled.div`
    color: ${(props) => props.theme.entryLightBlue};
    font-size: 16px;
    font-family: "JejuGothic";
`;
