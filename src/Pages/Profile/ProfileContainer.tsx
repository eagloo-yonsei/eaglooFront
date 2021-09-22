import React from "react";
import styled from "styled-components";
import { SlideUpPageContainer } from "../../Styles/StyledComponents";
import ProfileBody from "./Profile__Body";
import ProfileFoot from "./Profile__Foot";
import ProfileModal from "./Profile__Modal";

export default function ProfileContainer() {
    return (
        <>
            <Container>
                <Header>
                    <Title>{`내 정보 관리`}</Title>
                </Header>
                <ProfileBody />
                <ProfileFoot />
            </Container>
            <ProfileModal />
        </>
    );
}

const Container = styled(SlideUpPageContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-family: ${(props) => props.theme.subLabelFont};
    padding: 80px 120px 40px 120px;
`;

const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    height: fit-content;
`;

const Title = styled.div`
    font-size: 30px;
    font-family: ${(props) => props.theme.iconFont};
`;
