import React from "react";
import { SidebarPageContainer } from "../../Styles/StyledComponents/PageContainers";
import AdminUserAllUser from "./Admin__User__Contents/Admin__User__AllUser";
import AdminUserAllConnectedUser from "./Admin__User__Contents/Admin__User__AllConnectedUser";
import AdminUserCreateTestUser from "./Admin__User__Contents/Admin__User__CreateTestUser";

export default function AdminUserContainer() {
    return (
        <SidebarPageContainer
            contentTitles={["모든 유저", "접속 중인 유저", "테스트 유저 생성"]}
            contents={[
                AdminUserAllUser(),
                AdminUserAllConnectedUser(),
                AdminUserCreateTestUser(),
            ]}
        />
    );
}
