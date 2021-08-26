import React, { createContext, useContext } from "react";
import { ChildrenProp } from "../../Constants";

interface AdminHomeContextProp {}

const InitialAdminHomeContext: AdminHomeContextProp = {};

const AdminHomeContext = createContext<AdminHomeContextProp>(
    InitialAdminHomeContext
);
export const useAdminHomeContext = () => useContext(AdminHomeContext);

export default function AdminHomeProvider({ children }: ChildrenProp) {
    const adminHomeContext = {};

    return (
        <AdminHomeContext.Provider value={adminHomeContext}>
            {children}
        </AdminHomeContext.Provider>
    );
}
