import React from "react";
import styled from "styled-components";
import { StylelessLink } from "../../Styles/StyledComponents";

export default function AdminHeaderMiddleComponents() {
    return (
        <Container>
            <LinkButton>
                <StylelessLink to={"/user"} children={"유저 관리"} />
            </LinkButton>
            <LinkButton>
                <StylelessLink to={"/room"} children={"방 관리"} />
            </LinkButton>
            <LinkButton>
                <StylelessLink to={"/feedback"} children={"피드백 관리"} />
            </LinkButton>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 45%;
    height: 100%;
`;

const LinkButton = styled.div`
    color: white;
    font-size: 15px;
    font-family: ${(props) => props.theme.plainTextFont};
`;
