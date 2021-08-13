import React, { ReactElement } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

export const FadeIn20 = keyframes`
    from{
        opacity: 0
    }
    to {
        opacity: 0.2
    }
`;

export const FadeInFull = keyframes`
    from{
        opacity: 0
    }
    to {
        opacity: 1
    }
`;

export const SlideUp = keyframes`
    from{
        transform:translateY(1200px);
    }
    to {
        transform:translateY(0px);
    }
`;

export const ModalBackGround = styled.div`
    animation: ${FadeIn20} 0.5s ease-out;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.2;
`;

export const FullScreenContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const PageContainer = styled.div`
    display: flex;
    width: 80%;
    height: 100%;
`;

export const FullPageContainer = styled(PageContainer)`
    animation: ${FadeInFull} 0.5s ease-out;
`;

export const SlideUpPageContainer = styled(PageContainer)`
    /* animation: ${SlideUp} 0.5s ease-out; */
    animation: ${FadeInFull} 0.5s ease-out;
    ${(props) => `height: calc(100% - ${props.theme.headerHeight});`};
    background: white;
    padding: 35px;
    margin-top: ${(props) => props.theme.headerHeight};
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
`;

export const HeaderPageContainer = styled(PageContainer)`
    animation: ${FadeInFull} 0.5s ease-out;
    margin-top: ${(props) => props.theme.headerHeight};
`;

export const StylelessButton = styled.button`
    border: none;
    outline: none;
    color: inherit;
    background-color: inherit;
    font-size: inherit;
    font-family: inherit;
    &:hover {
        cursor: pointer;
    }
`;

interface LinkProps {
    to: string;
    children?: string | ReactElement;
}

export function StylelessLink({ to, children }: LinkProps) {
    return (
        <Link style={{ color: "inherit", textDecoration: "none" }} to={to}>
            {children}
        </Link>
    );
}

interface SubmitButtonProp {
    buttonContent: string;
    loadingStatus?: boolean;
    submitFunction: () => void;
    disabledCondition?: boolean;
    fontSize?: string;
}

export function SubmitButton({
    buttonContent,
    loadingStatus,
    submitFunction,
    disabledCondition,
    fontSize,
}: SubmitButtonProp) {
    if (disabledCondition) {
        return <UnReadyButtonContainer>{buttonContent}</UnReadyButtonContainer>;
    }

    if (loadingStatus) {
        return (
            <SubmittingButtonContainer fontSize={fontSize}>
                <CircularProgress color="inherit" size={30} thickness={5} />
            </SubmittingButtonContainer>
        );
    } else {
        return (
            <ReadyButtonContainer
                onClick={() => {
                    submitFunction();
                }}
            >
                {buttonContent}
            </ReadyButtonContainer>
        );
    }
}

const SubmittingButtonContainer = styled.div<{ fontSize?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 46px;
    color: white;
    font-size: ${(props) => (props.fontSize ? props.fontSize : "22px")};
    font-family: ${(props) => props.theme.subLabelFont};
    border-radius: 8px;
    background: ${(props) => props.theme.orangeGradient};
`;

const ReadyButtonContainer = styled(SubmittingButtonContainer)`
    :hover {
        cursor: pointer;
    }
`;

const UnReadyButtonContainer = styled(SubmittingButtonContainer)`
    background: none;
    background-color: ${(props) => props.theme.loginMessageGray};
`;
