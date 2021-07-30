import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
import { StylelessLink } from "../../Styles/StyledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

export default function HeaderAuth() {
    const { isLoggedIn } = useAppContext();
    return <>{isLoggedIn ? <LoggedIn /> : <LoggedOut />}</>;
}

function LoggedIn() {
    const { setIsLoggedIn, userEmail, setUserEmail, setUserId } =
        useAppContext();
    return (
        <Container>
            <AuthMessage>
                {`${userEmail} 님 `}
                <FontAwesomeIcon icon={faUserAlt} />
            </AuthMessage>
            <LogInOutButton
                onClick={() => {
                    setIsLoggedIn(false);
                    setUserEmail(undefined);
                    setUserId(undefined);
                }}
            >
                로그아웃
            </LogInOutButton>
        </Container>
    );
}

function LoggedOut() {
    return (
        <Container>
            <AuthMessage>로그인해주세요.</AuthMessage>
            <StylelessLink to={"/login"}>
                <LogInOutButton>로그인</LogInOutButton>
            </StylelessLink>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 260px;
`;

const AuthMessage = styled.div`
    font-size: 13px;
    font-family: ${(props) => props.theme.plainTextFont};
    color: ${(props) => props.theme.loginMessageGray};
    margin-right: 12px;
`;

const LogInOutButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 30px;
    padding: 0px 20px;
    border-radius: 15px;
    font-size: 22px;
    font-family: ${(props) => props.theme.inButtonFont};
    color: ${(props) => props.theme.loginButtonYellow};
    background-color: white;
    :hover {
        cursor: pointer;
    }
`;
