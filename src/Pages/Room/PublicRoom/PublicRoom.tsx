import React from "react";
import PublicRoomProvider from "./PublicRoomProvider";
import PublicRoomContainer from "./PublicRoomContainer";

export default function PublicRoom() {
    return (
        <PublicRoomProvider>
            <PublicRoomContainer />
        </PublicRoomProvider>
    );
}
