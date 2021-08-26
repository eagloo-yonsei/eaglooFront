import React from "react";
import AdminUserProvider from "./Admin__UserProvider";
import AdminUserContainer from "./Admin__UserContainer";

export default function AdminUser() {
    return (
        <AdminUserProvider>
            <AdminUserContainer />
        </AdminUserProvider>
    );
}
