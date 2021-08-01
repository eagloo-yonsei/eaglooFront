import React from "react";
import styled from "styled-components";
import { StylelessLink } from "../../Styles/StyledComponents";
import loginIcon from "../../Resources/Img/login-icon.png";

export default function EaglooIconBox() {
    return (
        <>
            <EaglooIcon src={loginIcon} alt="login icon" />
            <EaglooLabel>
                <StylelessLink to={"/"}>{`EAGLOO`}</StylelessLink>
            </EaglooLabel>
            <EaglooSubLabel>{`연세대학교 온라인 스터디공간`}</EaglooSubLabel>
        </>
    );
}

const EaglooIcon = styled.img`
    width: 130px;
    margin-bottom: 32px;
`;

const EaglooLabel = styled.h1`
    color: #ffffff;
    font-size: 40px;
    font-family: ${(props) => props.theme.iconFont};
    letter-spacing: 3px;
    margin-bottom: 10px;
`;

const EaglooSubLabel = styled.h2`
    color: #ffffff;
    font-size: 18px;
    font-family: ${(props) => props.theme.subLabelFont};
    margin-bottom: 55px;
`;
