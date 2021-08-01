import React from "react";
import LoginProvider from "./LoginProvider";
import LoginContainer from "./LoginContainer";

export default function Login() {
    return (
        <LoginProvider>
            <LoginContainer />
        </LoginProvider>
    );
}
