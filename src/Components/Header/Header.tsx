import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import HomeIcon from "./Header__HomeIcon";
import MiddleComponents from "./Header__MiddleComponents";
import HeaderAuth from "./Header__Auth";

export default function Header() {
    if (useLocation().pathname === "/login") return null;
    return (
        <HeaderDiv>
            <HomeIcon />
            <MiddleComponents />
            <HeaderAuth />
        </HeaderDiv>
    );
}

const HeaderDiv = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    width: 100%;
    height: ${(props) => props.theme.headerHeight};
    justify-content: space-between;
    align-items: center;
    padding: 0 80px;
    padding-bottom: 20px;
`;
