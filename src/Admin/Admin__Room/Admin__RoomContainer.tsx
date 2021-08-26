import React from "react";
import { SidebarPageContainer } from "../../Styles/StyledComponents/PageContainers";
import AdminRoomAllRoom from "./Admin__Room__Contents/Admin__Room__AllRoom";
import AdminRoomActiveRooms from "./Admin__Room__Contents/Admin__Room__ActiveRooms";

export default function AdminRoomContainer() {
    return (
        <SidebarPageContainer
            contentTitles={["모든 방", "활성화된 방"]}
            contents={[AdminRoomAllRoom(), AdminRoomActiveRooms()]}
        />
    );
}
