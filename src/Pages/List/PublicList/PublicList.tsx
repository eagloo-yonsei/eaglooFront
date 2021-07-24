import React from "react";
import PublicListProvider from "./PublicListProvider";
import PublicListContainer from "./PublicListContainer";

export default function PublicList() {
    return (
        <PublicListProvider>
            <PublicListContainer />
        </PublicListProvider>
    );
}
