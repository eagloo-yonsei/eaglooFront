import React, { useEffect, RefObject } from "react";
import styled from "styled-components";
import { useRoomContext } from "./RoomProvider";
import { useAppContext } from "../../Routes/App/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock, faUserAlt } from "@fortawesome/free-solid-svg-icons";

interface RoomPanelProp {
    userStream: RefObject<HTMLVideoElement>;
}

export default function RoomCenterPanel({ userStream }: RoomPanelProp) {
    return (
        <Container>
            <UserStream userStream={userStream} />
            <ControlButtons />
        </Container>
    );
}

function UserStream({ userStream }: RoomPanelProp) {
    // const { userStream, getUserStream } = useAppContext();
    // useEffect(() => {
    //     getUserStream();
    //     return () => {};
    // }, []);

    return (
        // <CamContainer>
        //     {userStream !== undefined ? (
        //         <UserCam ref={userStream} autoPlay playsInline />
        //     ) : (
        //         <></>
        //     )}
        // </CamContainer>
        <CamContainer>
            <UserCam ref={userStream} autoPlay playsInline />
        </CamContainer>
    );
}

function ControlButtons() {
    const { roomNo, seatNo, exitRoom } = useRoomContext();
    return (
        <ControlButtonContainer>
            <RoomInfo>
                <RoomTitle>
                    <FontAwesomeIcon icon={faUnlock} />
                    {`  공용 스터디룸 ${roomNo}`}
                </RoomTitle>
                <RoomPeople>
                    <FontAwesomeIcon icon={faUserAlt} />
                    {`  8/16`}
                </RoomPeople>
            </RoomInfo>
            <MySeat>{`내 자리 : ${seatNo}`}</MySeat>
            <ExitButton
                onClick={() => {
                    exitRoom();
                }}
            >
                나가기
            </ExitButton>
        </ControlButtonContainer>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 68.4%;
    height: 100%;
`;

const CamContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42%;
    height: 92.5%;
    background-color: black;
    border-radius: 15px;
    overflow: hidden;
`;

const UserCam = styled.video`
    max-width: 100%;
    max-height: 100%;
`;

const ControlButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 42%;
    height: 92.5%;
    padding: 40px 0px;
`;

const RoomInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const RoomTitle = styled.div`
    font-size: 30px;
    color: white;
`;

const RoomPeople = styled.div`
    font-size: 20px;
    color: ${(props) => props.theme.loginMessageGray};
`;

const MySeat = styled.div`
    font-size: 20px;
    color: white;
`;

const ExitButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 45px;
    color: white;
    font-size: 24px;
    font-family: ${(props) => props.theme.inButtonFont};
    border-radius: 15px;
    background: ${(props) => props.theme.orangeGradient};
    :hover {
        cursor: pointer;
    }
`;
