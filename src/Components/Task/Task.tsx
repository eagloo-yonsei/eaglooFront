import React from "react";
import TaskProvider from "./TaskProvider";
import TaskContainer from "./TaskContainer";

export default function Task() {
    return (
        <TaskProvider>
            <TaskContainer />
        </TaskProvider>
    );
}
