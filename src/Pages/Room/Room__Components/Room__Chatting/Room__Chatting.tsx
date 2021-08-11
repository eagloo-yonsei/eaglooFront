import React from "react";
import RoomChattingProvider from "./Room__ChattingProvider";
import RoomChattingContainer from "./Room__ChattingContainer";

export default function RoomChatting() {
    return (
        <RoomChattingProvider>
            <RoomChattingContainer />
        </RoomChattingProvider>
    );
}
