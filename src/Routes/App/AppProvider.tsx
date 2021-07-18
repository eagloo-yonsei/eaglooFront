import React, { createContext, useContext, useState } from "react";

interface AppProp {
    children: JSX.Element;
}

interface AppContext {
    isLoggedIn: boolean;
    setIsLoggedIn: (status: boolean) => void;
    isAdmin: boolean;
    setIsAdmin: (status: boolean) => void;
    token?: string;
}

const InitialAppContext: AppContext = {
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    isAdmin: false,
    setIsAdmin: () => {},
};

const AppContext = createContext<AppContext>(InitialAppContext);
export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: AppProp) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const appContext = { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
