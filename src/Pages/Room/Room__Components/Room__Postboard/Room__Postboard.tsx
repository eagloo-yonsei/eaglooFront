import React from "react";
import RoomPostboardProvider from "./Room__PostboardProvider";
import RoomPostBoardContainer from "./Room__PostboardContainer";

export default function RoomPostBoard() {
    return (
        <RoomPostboardProvider>
            <RoomPostBoardContainer />
        </RoomPostboardProvider>
    );
}
