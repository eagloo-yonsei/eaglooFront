import React from "react";
import { SidebarPageContainer } from "../../Styles/StyledComponents/PageContainers";
import AdminFeedbackAllFeedback from "./Admin__Feedback__Contents/Admin__Feedback__AllFeedback";

export default function AdminFeedbackContainer() {
    return (
        <SidebarPageContainer
            contentTitles={["모든 피드백"]}
            contents={[AdminFeedbackAllFeedback()]}
        />
    );
}
