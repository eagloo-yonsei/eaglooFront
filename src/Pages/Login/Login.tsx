import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../Routes/App/AppProvider";
import axios from "axios";
import { API_ENDPOINT } from "../../Constants";
import { FullPageContainer } from "../../Styles/StyledComponents";
import { StylelessButton, StylelessLink } from "../../Styles/StyledComponents";
import {
    toastLoginSuccessMessage,
    toastErrorMessage,
} from "../../Styles/StyledComponents";
import CircularProgress from "@material-ui/core/CircularProgress";
import loginIcon from "../../Resources/Img/login-icon.png";

var hash = require("object-hash");

export default function Login() {
    const history = useHistory();
    const emailInputRef = useRef<HTMLInputElement | undefined>();
    const { setIsLoggedIn, setUserName } = useAppContext();
    const [signingIn, setSigningIn] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    useEffect(() => {
        emailInputRef.current?.focus();
        return () => {};
    }, []);

    async function handleLogin() {
        setSigningIn(true);
        axios
            .get(
                `${API_ENDPOINT}/api/user/${emailInput}/${hash(passwordInput)}`
            )
            .then(function ({ data }) {
                if (data.success) {
                    setIsLoggedIn(true);
                    setUserName(emailInput);
                    toastLoginSuccessMessage(emailInput);
                    history.push("/");
                } else {
                    setSigningIn(false);
                    toastErrorMessage(data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Container>
            <LoginContainer>
                <EaglooIcon src={loginIcon} alt="login icon" />
                <EaglooLabel>
                    <StylelessLink to={"/"}>EAGLOO</StylelessLink>
                </EaglooLabel>
                <EaglooSubLabel>연세대학교 온라인 스터디공간</EaglooSubLabel>
                <EmailBoxContainer className="idboxcontainer">
                    <EmailBox
                        ref={emailInputRef}
                        type="text"
                        value={emailInput}
                        placeholder="id"
                        onChange={(e) => setEmailInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                    />
                    <YonseiMailPlaceholder>@yonsei.ac.kr</YonseiMailPlaceholder>
                </EmailBoxContainer>
                <PasswordBox
                    type="password"
                    value={passwordInput}
                    placeholder="password"
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleLogin();
                        }
                    }}
                />
                <SignInButton signingIn={signingIn} handleLogin={handleLogin} />
            </LoginContainer>
        </Container>
    );
}

interface SignInButtonProp {
    signingIn: boolean;
    handleLogin: () => void;
}

function SignInButton({ signingIn, handleLogin }: SignInButtonProp) {
    return (
        <>
            {!signingIn ? (
                <ToSignInButton
                    onClick={() => {
                        handleLogin();
                    }}
                >
                    sign in
                </ToSignInButton>
            ) : (
                <SigningInButton>
                    <CircularProgress color="inherit" size={30} thickness={5} />
                </SigningInButton>
            )}
        </>
    );
}

const Container = styled(FullPageContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`;

const EaglooIcon = styled.img`
    width: 130px;
    padding-bottom: 32px;
`;

const EaglooLabel = styled.h1`
    color: #ffffff;
    font-size: 40px;
    font-family: ${(props) => props.theme.iconFont};
    letter-spacing: 3px;
    padding-bottom: 10px;
`;

const EaglooSubLabel = styled.h2`
    color: #ffffff;
    font-size: 18px;
    font-family: ${(props) => props.theme.subLabelFont};
    padding-bottom: 55px;
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

const ToSignInButton = styled(StylelessButton)`
    width: 100%;
    height: 46px;
    color: #ffffff;
    font-size: 22px;
    font-family: "JejuGothic";
    border-radius: 8px;
    background: ${(props) => props.theme.orangeGradient};
    margin-bottom: 38px;
`;

const SigningInButton = styled(ToSignInButton)`
    :hover {
        cursor: auto;
    }
`;

const UtilButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 92%;
    margin-bottom: 30px;
`;

const UtilButton = styled.div`
    color: ${(props) => props.theme.mainDarkBlue};
    font-size: 16px;
    font-family: "JejuGothic";
`;
