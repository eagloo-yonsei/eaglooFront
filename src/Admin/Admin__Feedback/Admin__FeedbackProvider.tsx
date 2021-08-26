import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ChildrenProp, Feedback, API_ENDPOINT } from "../../Constants";

interface AdminFeedbackContextProp {
    allFeedback: Feedback[];
}

const InitialAdminFeedbackContext: AdminFeedbackContextProp = {
    allFeedback: [],
};

const AdminFeedbackContext = createContext<AdminFeedbackContextProp>(
    InitialAdminFeedbackContext
);
export const useAdminFeedbackContext = () => useContext(AdminFeedbackContext);

export default function AdminFeedbackProvider({ children }: ChildrenProp) {
    const [allFeedback, setAllFeedback] = useState<Feedback[]>([]);

    useEffect(() => {
        getAllFeedback();
        return () => {};
    }, []);

    async function getAllFeedback() {
        await axios
            .get<{ success: boolean; allFeedback: Feedback[] }>(
                `${API_ENDPOINT}/api/feedback`
            )
            .then((response) => {
                if (response.data.success) {
                    setAllFeedback(response.data.allFeedback as Feedback[]);
                }
            });
    }

    const adminFeedbackContext = { allFeedback };

    return (
        <AdminFeedbackContext.Provider value={adminFeedbackContext}>
            {children}
        </AdminFeedbackContext.Provider>
    );
}
