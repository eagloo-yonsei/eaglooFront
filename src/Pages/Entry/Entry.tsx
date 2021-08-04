import React from "react";
import EntryProvider from "./EntryProvider";
import EntryContainer from "./EntryContainer";

export default function Entry() {
    return (
        <EntryProvider>
            <EntryContainer />
        </EntryProvider>
    );
}
