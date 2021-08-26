import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useAppContext } from "../../Routes/App/AppProvider";

export default function AdminHeaderAuth() {
    const history = useHistory();
    const { setIsLoggedIn, setUserInfo } = useAppContext();
    return (
        <LogOutButton
            onClick={() => {
                history.push("/");
                setIsLoggedIn(false);
                setUserInfo(undefined);
            }}
        >{`로그아웃`}</LogOutButton>
    );
}

const LogOutButton = styled.div`
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
