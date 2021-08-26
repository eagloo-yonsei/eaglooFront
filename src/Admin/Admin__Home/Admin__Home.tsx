import React from "react";
import AdminHomeProvider from "./Admin__HomeProvider";
import AdminHomeContainer from "./Admin__HomeContainer";

export default function AdminHome() {
    return (
        <AdminHomeProvider>
            <AdminHomeContainer />
        </AdminHomeProvider>
    );
}
