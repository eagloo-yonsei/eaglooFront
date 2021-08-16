import React from "react";
import styled from "styled-components";
import { StylelessLink } from "../../Styles/StyledComponents";

export default function MiddleComponents() {
    return (
        <Container>
            <LinkBlock>
                <StylelessLink to={"/"} children={"홈"} />
            </LinkBlock>
            <LinkBlock>
                <StylelessLink to={"/forum"} children={"게시판"} />
            </LinkBlock>
            <YonseiLinkBlock>
                {`연세 바로가기`}
                <LinkButtons>
                    {/* <LinkButton
                        content={"연세대학교 홈"}
                        url={"https://www.yonsei.kr"}
                    /> */}
                    <LinkButton
                        content={"LearnUs"}
                        url={"https://learnus.org/"}
                    />
                    <LinkButton
                        content={"연세 포탈"}
                        url={"https://portal.yonsei.ac.kr"}
                    />
                    <LinkButton
                        content={"연세대학교 도서관"}
                        url={"https://library.yonsei.ac.kr/"}
                    />
                </LinkButtons>
            </YonseiLinkBlock>
            <LinkBlock>
                <StylelessLink to={"/about"} children={"어바웃 어스"} />
            </LinkBlock>
            <LinkBlock>
                <StylelessLink to={"/feedback"} children={"피드백"} />
            </LinkBlock>
        </Container>
    );
}

function LinkButton({ content, url }: { content: string; url: string }) {
    return (
        <LinkButtonContainer
            href={url}
            target="_blank"
            rel="noreferrer noopener"
        >{`${content}`}</LinkButtonContainer>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: calc(100% - 460px);
    height: 50px;
    padding-left: 50px;
    padding-right: 20px;
`;

const LinkBlock = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 45px;
    width: fit-content;
    height: 100%;
    color: white;
    font-size: 14px;
    font-family: ${(props) => props.theme.plainTextFont};
`;

const LinkButtonContainer = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0px;
    color: white;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    background-color: ${(props) => props.theme.mainDarkBlue};
    transition: all 0.25s ${(props) => props.theme.animationCubic};
`;

const LinkButtons = styled.div`
    z-index: 10;
    position: absolute;
    top: 50px;
    left: 0px;
    display: flex;
    flex-direction: column;
    width: 180px;
    height: fit-content;
    background-color: white;
    overflow: hidden;
    &:hover {
        ${LinkButtonContainer} {
            height: 60px;
        }
    }
`;

const YonseiLinkBlock = styled(LinkBlock)`
    cursor: pointer;
    &:hover {
        ${LinkButtonContainer} {
            height: 60px;
        }
    }
`;
