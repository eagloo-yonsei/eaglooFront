import React from "react";
import PublicEntryProvider from "./PublicEntryProvider";
import PublicEntryContainer from "./PublicEntryContainer";

export default function PublicEntry() {
    return (
        <PublicEntryProvider>
            <PublicEntryContainer />
        </PublicEntryProvider>
    );
}
