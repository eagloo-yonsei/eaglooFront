import React from "react";
import CustomRoomModalProvider from "./CustomRoomModalProvider";
import CustomRoomModalContainer from "./CustomRoomModalContainer";

export default function CustomRoomModal() {
    return (
        <CustomRoomModalProvider>
            <CustomRoomModalContainer />
        </CustomRoomModalProvider>
    );
}
