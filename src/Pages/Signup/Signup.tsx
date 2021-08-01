import React from "react";
import SignupProvider from "./SignupProvider";
import SignupContainer from "./SignupContainer";

export default function Signup() {
    return (
        <SignupProvider>
            <SignupContainer />
        </SignupProvider>
    );
}
