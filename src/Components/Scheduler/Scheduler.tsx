import React from "react";
import SchedulerProvider from "./SchedulerProvider";
import SchedulerContainer from "./SchedulerContainer";

export default function Scheduler() {
    return (
        <SchedulerProvider>
            <SchedulerContainer />
        </SchedulerProvider>
    );
}
