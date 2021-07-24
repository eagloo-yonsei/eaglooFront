import React from "react";
import ListProvider from "./ListProvider";
import ListContainer from "./ListContainer";

export default function List() {
    return (
        <ListProvider>
            <ListContainer />
        </ListProvider>
    );
}
