import React from "react";
import LoungeProvider from "./LoungeProvider";
import LoungeContainer from "./LoungeContainer";

export default function Lounge() {
    return (
        <LoungeProvider>
            <LoungeContainer />
        </LoungeProvider>
    );
}
