import React from "react";
import styled from "styled-components";
import { useLoungeContext } from "./LoungeProvider";

export default function LoungeContainer() {
    const { comeBackRoom } = useLoungeContext();
    return (
        <Container
            onClick={() => {
                comeBackRoom();
            }}
        >
            {`휴게실`}
            <div></div>
            <div></div>
        </Container>
    );
}

const Container = styled.div``;
