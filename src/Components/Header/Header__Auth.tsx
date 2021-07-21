import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
import { StylelessLink } from "../../Styles/StyledComponents";

export default function HeaderAuth() {
    const { isLoggedIn } = useAppContext();
    return <>{isLoggedIn ? <LoggedIn /> : <LoggedOut />}</>;
}

function LoggedOut() {
    return (
        <Container>
            <LoginMessage>로그인해주세요.</LoginMessage>
            <StylelessLink to={"/login"}>
                <LoginButton>로그인</LoginButton>
            </StylelessLink>
        </Container>
    );
}

function LoggedIn() {
    return <>안녕하세요, ?? 님</>;
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginMessage = styled.div`
    font-size: 13px;
    font-family: ${(props) => props.theme.plainTextFont};
    color: ${(props) => props.theme.loginMessageGray};
`;

const LoginButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95px;
    height: 30px;
    border-radius: 15px;
    font-size: 22px;
    font-family: ${(props) => props.theme.inButtonFont};
    color: ${(props) => props.theme.loginButtonYellow};
    background-color: white;
    margin-left: 12px;
`;
