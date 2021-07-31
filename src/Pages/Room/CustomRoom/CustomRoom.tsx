import React from "react";
import CustomRoomProvider from "./CustomRoomProvider";
import CustomRoomContainer from "./CustomRoomContainer";

export default function CustomRoom() {
    return (
        <CustomRoomProvider>
            <CustomRoomContainer />
        </CustomRoomProvider>
    );
}
