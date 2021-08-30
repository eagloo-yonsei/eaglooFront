import React from "react";
import AdminRoomProvider from "./Admin__RoomProvider";
import AdminRoomContainer from "./Admin__RoomContainer";

export default function AdminRoom() {
    return (
        <AdminRoomProvider>
            <AdminRoomContainer />
        </AdminRoomProvider>
    );
}
