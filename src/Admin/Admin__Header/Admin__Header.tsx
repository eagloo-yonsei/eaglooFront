import React from "react";
import styled from "styled-components";
import AdminHeaderHomeIcon from "./Admin__Header__HomeIcon";
import AdminHeaderMiddleComponents from "./Admin__Header__MiddleComponents";
import AdminHeaderAuth from "./Admin__Header__Auth";

export default function AdminHeader() {
    return (
        <Container>
            <AdminHeaderHomeIcon />
            <AdminHeaderMiddleComponents />
            <AdminHeaderAuth />
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${(props) => props.theme.adminHeaderHeight};
    padding: 0px 30px;
`;
