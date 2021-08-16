import React, {
    createContext,
    RefObject,
    useContext,
    useRef,
    useState,
} from "react";
import axios from "axios";
import { useAppContext } from "../../Routes/App/AppProvider";
import { ChildrenProp, API_ENDPOINT, FeedbackCategory } from "../../Constants";
import { toastErrorMessage, toastSuccessMessage } from "../../Utils";

interface FeedbackContextProp {
    category: FeedbackCategory;
    feedbackInput: string;
    submitting: boolean;
    setCategory: (category: FeedbackCategory) => void;
    setFeedbackInput: (input: string) => void;
    submitFeedback: () => Promise<boolean>;
    feedbackInputRef?: RefObject<HTMLTextAreaElement>;
}

const InitialFeedbackContext: FeedbackContextProp = {
    category: FeedbackCategory.GENERAL,
    feedbackInput: "",
    submitting: false,
    setCategory: () => {},
    setFeedbackInput: () => {},
    submitFeedback: () => {
        return new Promise(() => {
            false;
        });
    },
};

const FeedbackContext = createContext<FeedbackContextProp>(
    InitialFeedbackContext
);
export const useFeedbackContext = () => useContext(FeedbackContext);

export default function FeedbackProvider({ children }: ChildrenProp) {
    const { userInfo } = useAppContext();
    const [category, setCategory] = useState<FeedbackCategory>(
        FeedbackCategory.GENERAL
    );
    const [feedbackInput, setFeedbackInput] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

    async function submitFeedback() {
        setSubmitting(true);
        const response = await axios
            .post<{ success: boolean; message: string }>(
                `${API_ENDPOINT}/api/feedback`,
                {
                    email: userInfo?.email,
                    content: feedbackInput,
                    category,
                }
            )
            .catch((error) => {
                console.error(error);
                return {
                    data: {
                        success: false,
                        message: "피드백 제출 중 오류가 발생했습니다.",
                    },
                };
            })
            .finally(() => {
                setSubmitting(false);
            });
        if (response.data.success) {
            setCategory(FeedbackCategory.GENERAL);
            setFeedbackInput("");
            toastSuccessMessage(response.data.message);
            return true;
        } else {
            toastErrorMessage(response.data.message);
            return false;
        }
    }

    const feedbackContext = {
        category,
        feedbackInput,
        submitting,
        setCategory,
        setFeedbackInput,
        submitFeedback,
        feedbackInputRef,
    };

    return (
        <FeedbackContext.Provider value={feedbackContext}>
            {children}
        </FeedbackContext.Provider>
    );
}
