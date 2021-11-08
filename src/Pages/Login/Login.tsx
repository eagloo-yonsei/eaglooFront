import React from "react";
import styled from "styled-components";
import LoginProvider from "./LoginProvider";
import LoginContainer from "./LoginContainer";
import HomeBanner from "../Home/Home__Banner";
import { HeaderPageContainer } from "../../Styles/StyledComponents/StyledComponents";

export default function Login() {
    return (
        <>
            <LoginProvider>
                <LoginContainer />
            </LoginProvider>
            <BannerContainer>
                <HomeBanner background_image={false}/>
            </BannerContainer>
        </>
    );
}

const BannerContainer = styled(HeaderPageContainer)`
    position : absolute;
    z-index: 0;
    width:320px;
    top : 20px;
    right : 100px;
`;