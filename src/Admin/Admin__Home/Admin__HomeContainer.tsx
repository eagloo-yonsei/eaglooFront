import React from "react";
import styled from "styled-components";
import { StylelessLink } from "../../Styles/StyledComponents";

export default function AdminHomeContainer() {
    return (
        <Container>
            {`Eagloo 관리자 페이지`}
            <MenuRow>
                <StylelessLink to={"/user"}>
                    <UserLink>{"유저 관리"}</UserLink>
                </StylelessLink>
                <StylelessLink to={"/room"}>
                    <RoomLink>{"방 관리"}</RoomLink>
                </StylelessLink>
                <StylelessLink to={"/feedback"}>
                    <FeedbackLink>{"피드백 관리"}</FeedbackLink>
                </StylelessLink>
            </MenuRow>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 54px;
    color: white;
    font-size: 32px;
    font-family: ${(props) => props.theme.iconFont};
`;

const MenuRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 28%;
    gap: 40px;
`;

const MenuBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    font-size: 18px;
    border-radius: 12px;
    aspect-ratio: 1;
`;

const UserLink = styled(MenuBox)`
    background-color: orange;
`;

const RoomLink = styled(MenuBox)`
    background-color: green;
`;

const FeedbackLink = styled(MenuBox)`
    background-color: brown;
`;
