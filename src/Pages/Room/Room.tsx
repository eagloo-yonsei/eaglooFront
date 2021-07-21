import React from "react";
import RoomProvider from "./RoomProvider";
import RoomContainer from "./RoomContainer";

export default function Room() {
    return (
        <RoomProvider>
            <RoomContainer />
        </RoomProvider>
    );
}
