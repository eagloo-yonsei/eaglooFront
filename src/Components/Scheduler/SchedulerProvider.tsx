import React, { createContext, useContext } from "react";

import { ChildrenProp } from "../../Constants";

interface SchedulerContextProp {}

const InitialSchedulerContext: SchedulerContextProp = {};

const SchedulerContext = createContext<SchedulerContextProp>(
    InitialSchedulerContext
);
export const useSchedulerContext = () => useContext(SchedulerContext);

export default function SchedulerProvider({ children }: ChildrenProp) {
    const schedulerContext = {};

    return (
        <SchedulerContext.Provider value={schedulerContext}>
            {children}
        </SchedulerContext.Provider>
    );
}
