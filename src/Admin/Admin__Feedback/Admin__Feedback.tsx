import React from "react";
import AdminFeedbackProvider from "./Admin__FeedbackProvider";
import AdminFeedbackContainer from "./Admin__FeedbackContainer";

export default function AdminFeedback() {
    return (
        <AdminFeedbackProvider>
            <AdminFeedbackContainer />
        </AdminFeedbackProvider>
    );
}
