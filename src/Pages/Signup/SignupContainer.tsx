import React from "react";
import styled from "styled-components";
import SignupEmailAndSecret from "./Signup__EmailAndSecret";
import SignupPassword from "./Signup__Password";
import SignupNickNameAndRealName from "./Signup__NickNameAndRealName";
import SignupNameAndPassword from "./Signup__NameAndPassword"
import EaglooIconBox from "../../Components/EaglooIconBox";
import { useSignupContext } from "./SignupProvider";
import { FullPageContainer } from "../../Styles/StyledComponents";

export default function SignupContainer() {
    return (
        <Container>
            <InnerContainer>
                <EaglooIconBox />
                <InputSwitcher />
            </InnerContainer>
        </Container>
    );
}

function InputSwitcher() {
    const { secretAuthenticated, completeSettingPassword } = useSignupContext();

    if (!secretAuthenticated) {
        return <SignupEmailAndSecret />;
    } else {
        return <SignupNameAndPassword/>;
    }
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
    gap: 15px;
    width: 300px;
`;
