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
    const { isLoggedIn, userInfo, setIsLoggedIn, setUserInfo } =
        useAppContext();
    return (
        <Container>
            <AuthMessage>
                <IdBox>{`${
                    userInfo?.nickName ? userInfo?.nickName : userInfo?.email
                }`}</IdBox>
                {` 님`}
                <IconBox>
                    <FontAwesomeIcon icon={faUserAlt} />
                </IconBox>
                <StylelessLink to={`/profile`}>
                    <ProfileButton>{`내 정보`}</ProfileButton>
                </StylelessLink>
            </AuthMessage>
            <LogInOutButton
                isLoggedIn={isLoggedIn}
                onClick={() => {
                    setIsLoggedIn(false);
                    setUserInfo(undefined);
                }}
            >
                {`로그아웃`}
            </LogInOutButton>
        </Container>
    );
}

function LoggedOut() {
    const { isLoggedIn } = useAppContext();
    return (
        <Container>
            <AuthMessage>{`로그인해주세요`}.</AuthMessage>
            <StylelessLink to={"/login"}>
                <LogInOutButton
                    isLoggedIn={isLoggedIn}
                >{`로그인`}</LogInOutButton>
            </StylelessLink>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 350px;
    height: 50px;
`;

const AuthMessage = styled.div`
    display: flex;
    font-size: 13px;
    font-family: ${(props) => props.theme.plainTextFont};
    color: ${(props) => props.theme.loginMessageGray};
    margin-right: 18px;
`;

const IdBox = styled.div`
    display: flex;
    width: 100px;
    justify-content: flex-end;
    color: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const IconBox = styled.div`
    margin-left: 12px;
    margin-right: 15px;
`;

const ProfileButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
`;

const LogInOutButton = styled.div<{ isLoggedIn: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.isLoggedIn ? "120px" : "fit-content")};
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
