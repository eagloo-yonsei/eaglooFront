import React from "react";
import styled from "styled-components";
import RoomPostBoard from "../Room__Postboard";

export default function Room14SeatsPostBoard() {
    return (
        <Container>
            <RoomPostBoard />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100%;
    font-size: 30px;
    font-family: ${(props) => props.theme.plainTextFont};
    padding: 12px 2px 0px 2px;
`;
