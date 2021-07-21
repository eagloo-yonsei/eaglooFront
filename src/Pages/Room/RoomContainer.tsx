import React from "react";
import styled from "styled-components";
import { FullScreenContainer } from "../../Styles/StyledComponents";
import RoomOuterRow from "./Room__OuterRow";
import RoomOuterColumn from "./Room__OuterColumn";
import RoomController from "./Room__Controller";

export default function RoomContainer() {
    return (
        <Container>
            <RoomOuterRow seatNums={[1, 2, 3, 4, 5, 6]} />
            <RoomInnerRow>
                <RoomOuterColumn seatNums={[7, 9]} />
                <RoomController />
                <RoomOuterColumn seatNums={[8, 10]} />
            </RoomInnerRow>
            <RoomOuterRow seatNums={[11, 12, 13, 14, 15, 16]} />
        </Container>
    );
}

const Container = styled(FullScreenContainer)`
    display: flex;
    flex-direction: column;
    font-family: ${(props) => props.theme.plainTextFont};
    padding: 50px 30px;
`;

const RoomInnerRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50%;
`;
