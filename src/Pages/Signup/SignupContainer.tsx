import React from "react";
import styled from "styled-components";
import SignupEmailAndSecret from "./Signup__EmailAndSecret";
import SignupPassword from "./Signup__Password";
import EaglooIconBox from "../../Components/EaglooIconBox";
import { useSignupContext } from "./SignupProvider";
import { FullPageContainer } from "../../Styles/StyledComponents";

export default function SignupContainer() {
    const { secretAuthenticated } = useSignupContext();

    return (
        <Container>
            <InnerContainer>
                <EaglooIconBox />
                {!secretAuthenticated ? (
                    <SignupEmailAndSecret />
                ) : (
                    <SignupPassword />
                )}
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
