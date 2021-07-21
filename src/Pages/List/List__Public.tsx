import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

interface RowProp {
    roomNoList: number[];
}

interface RoomProp {
    roomNo: number;
}

export default function ListPublic() {
    const exampleRoom = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    ];

    return (
        <Container>
            <Title />
            <RoomButtonRow roomNoList={exampleRoom} />
        </Container>
    );
}

function Title() {
    return (
        <TitleContainer>
            <FormerTitle>기본 </FormerTitle>
            <RearTitle>스터디룸</RearTitle>
        </TitleContainer>
    );
}

function RoomButtonRow({ roomNoList }: RowProp) {
    return (
        <ButtonRowContainer>
            {roomNoList.map((roomNo) => {
                return (
                    <RoomButton roomNo={roomNo} key={`room${roomNo}_button`} />
                );
            })}
        </ButtonRowContainer>
    );
}

function RoomButton({ roomNo }: RoomProp) {
    const history = useHistory();

    function pushToEntry(roomNo: number) {
        history.push({
            pathname: "/entry",
            state: { roomNo: roomNo },
        });
    }

    return (
        <ButtonContainer
            onClick={() => {
                pushToEntry(roomNo);
            }}
        >
            <ButtonIcon />
            <ButtonTitle>{`스터디룸 ${roomNo}`}</ButtonTitle>
        </ButtonContainer>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const TitleContainer = styled.div`
    font-size: 28px;
    margin-bottom: 24px;
`;

const FormerTitle = styled.span`
    color: ${(props) => props.theme.entryMainBlue};
`;

const RearTitle = styled.span`
    color: ${(props) => props.theme.entryLightBlue};
`;

const ButtonRowContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    margin-bottom: 55px;
    :hover {
        cursor: pointer;
    }
`;

const ButtonIcon = styled.div`
    width: 90%;
    aspect-ratio: 1;
    background-color: ${(props) => props.theme.loginMessageGray};
    border-radius: 18%;
    margin-bottom: 10px;
`;

const ButtonTitle = styled.div`
    font-size: 15px;
    color: ${(props) => props.theme.mainBlue};
`;
