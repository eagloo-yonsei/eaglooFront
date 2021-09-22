import React from "react";
import { useLocation } from "react-router-dom";
import SchedulerProvider from "./SchedulerProvider";
import SchedulerContainer from "./SchedulerContainer";
import { todoLessPages } from "../../Constants";

export default function Scheduler() {
    if (todoLessPages.includes(useLocation().pathname)) return null;

    return (
        <SchedulerProvider>
            <SchedulerContainer />
        </SchedulerProvider>
    );
}
