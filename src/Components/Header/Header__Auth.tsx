import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
import { StylelessLink } from "../../Styles/StyledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

interface LoggedInProp {
    userName: string | undefined;
    setIsLoggedIn: (status: boolean) => void;
    setUserName: (userName: string | undefined) => void;
}

export default function HeaderAuth() {
    const { isLoggedIn, setIsLoggedIn, userName, setUserName } =
        useAppContext();
    return (
        <>
            {isLoggedIn ? (
                <LoggedIn
                    userName={userName}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                />
            ) : (
                <LoggedOut />
            )}
        </>
    );
}

function LoggedIn({ userName, setIsLoggedIn, setUserName }: LoggedInProp) {
    return (
        <Container>
            <AuthMessage>
                {`${userName} 님 `}
                <FontAwesomeIcon icon={faUserAlt} />
            </AuthMessage>
            <LogInOutButton
                onClick={() => {
                    setIsLoggedIn(false);
                    setUserName(undefined);
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
