import React from "react";
import styled from "styled-components";
import { StylelessButton, StylelessLink } from "../../Styles/StyledComponents";

export default function MiddleComponents() {
    return (
        <Container>
            <LinkButton>
                <StylelessLink to={"/"} children={"홈"} />
            </LinkButton>
            <LinkButton>
                <StylelessLink to={"/"} children={"서비스"} />
            </LinkButton>
            <LinkButton>
                <StylelessLink to={"/forum"} children={"게시판"} />
            </LinkButton>
            <LinkButton>
                <StylelessLink to={"/"} children={"연세 바로가기"} />
            </LinkButton>
            <LinkButton>
                <StylelessLink to={"/about"} children={"어바웃 어스"} />
            </LinkButton>
            <LinkButton>
                <StylelessLink to={"/feedback"} children={"피드백"} />
            </LinkButton>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 720px;
    padding-left: 20px;
    padding-right: 40px;
`;

const LinkButton = styled(Container)`
    width: fit-content;
    color: white;
    font-size: 15px;
    font-family: "JejuGothic";
`;
