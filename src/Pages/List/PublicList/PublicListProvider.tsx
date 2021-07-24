import React, { createContext, useContext, useState } from "react";

interface AppProp {
    children: JSX.Element;
}

interface PublicListProp {}

const InitialPublicListContext: PublicListProp = {};

const PublicListContext = createContext<PublicListProp>(
    InitialPublicListContext
);

export default function PublicListProvider({ children }: AppProp) {
    return <>{children}</>;
}
