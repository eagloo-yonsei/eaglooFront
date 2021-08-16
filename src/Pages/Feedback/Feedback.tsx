import React from "react";
import FeedbackProvider from "./FeedbackProvider";
import FeedbackContainer from "./FeedbackContainer";

export default function Feedback() {
    return (
        <FeedbackProvider>
            <FeedbackContainer />
        </FeedbackProvider>
    );
}
