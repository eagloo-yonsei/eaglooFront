import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    RefObject,
} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { SHA3 } from "sha3";
import { ChildrenProp, API_ENDPOINT } from "../../Constants";
import {
    toastMailSendSuccessMessage,
    toastSecretVerifySuccessMessage,
    toastSignupSuccessMessage,
    toastErrorMessage,
} from "../../Utils";

interface SignupContext {
    emailInput: string;
    secretInput: string;
    passwordInput: string;
    passwordConfirmInput: string;
    secretSended: boolean;
    secretAuthenticated: boolean;
    secretSending: boolean;
    secretAuthenticating: boolean;
    signingUp: boolean;
    setEmailInput: (input: string) => void;
    setSecretInput: (input: string) => void;
    setPasswordInput: (input: string) => void;
    setPasswordConfirmInput: (input: string) => void;
    sendSecret: () => void;
    authenticateSecret: () => void;
    setPassword: () => void;
    emailInputRef?: RefObject<HTMLInputElement>;
    secretInputRef?: RefObject<HTMLInputElement>;
    passwordInputRef?: RefObject<HTMLInputElement>;
}

const InitialSignupContext: SignupContext = {
    emailInput: "",
    secretInput: "",
    passwordInput: "",
    passwordConfirmInput: "",
    secretSended: false,
    secretAuthenticated: false,
    secretSending: false,
    secretAuthenticating: false,
    signingUp: false,
    setEmailInput: () => {},
    setSecretInput: () => {},
    setPasswordInput: () => {},
    setPasswordConfirmInput: () => {},
    sendSecret: () => {},
    authenticateSecret: () => {},
    setPassword: () => {},
};

const SignupContext = createContext<SignupContext>(InitialSignupContext);
export const useSignupContext = () => useContext(SignupContext);

export default function SignupProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const hashedPassword = new SHA3(512);

    const [emailInput, setEmailInput] = useState<string>("");
    const [secretInput, setSecretInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [passwordConfirmInput, setPasswordConfirmInput] =
        useState<string>("");

    const [secretSended, setSecretSended] = useState<boolean>(false);
    const [secretAuthenticated, setSecretAuthenticated] =
        useState<boolean>(false);

    const [secretSending, setSecretSending] = useState<boolean>(false);
    const [secretAuthenticating, setSecretAuthenticating] =
        useState<boolean>(false);
    const [signingUp, setSigningUp] = useState<boolean>(false);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const secretInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        emailInputRef?.current?.focus();
        return () => {};
    }, []);

    async function sendSecret() {
        setSecretSending(true);
        await axios
            .post(`${API_ENDPOINT}/api/user`, {
                email: emailInput,
            })
            .then((response) => {
                setSecretSending(false);
                if (response.data.success) {
                    setSecretSended(true);
                    secretInputRef?.current?.focus();
                    toastMailSendSuccessMessage(emailInput);
                } else {
                    toastErrorMessage(response.data.message);
                    emailInputRef?.current?.focus();
                }
            })
            .catch((error) => {
                setSecretSending(false);
                console.error(error);
                toastErrorMessage("메일 전송 중 오류가 발생했어요.");
            });
    }

    async function authenticateSecret() {
        setSecretAuthenticating(true);
        await axios
            .put(`${API_ENDPOINT}/api/user/secret`, {
                email: emailInput,
                givenSecret: secretInput,
            })
            .then((response) => {
                setSecretAuthenticating(false);
                if (response.data.success) {
                    setSecretAuthenticated(true);
                    passwordInputRef?.current?.focus();
                    toastSecretVerifySuccessMessage();
                } else {
                    toastErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                setSecretAuthenticating(false);
                console.error(error);
                toastErrorMessage("메일 인증 중 오류가 발생했어요.");
            });
    }

    async function setPassword() {
        if (passwordInput !== passwordConfirmInput) {
            toastErrorMessage("비밀번호가 다릅니다");
            return;
        }
        setSigningUp(true);
        hashedPassword.reset();
        hashedPassword.update(passwordInput);

        await axios
            .put(`${API_ENDPOINT}/api/user/password`, {
                email: emailInput,
                givenPassword: hashedPassword.digest("hex"),
            })
            .then((response) => {
                setSigningUp(false);
                if (response.data.success) {
                    toastSignupSuccessMessage(emailInput);
                    history.push("/login");
                } else {
                    toastErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                setSigningUp(false);
                console.error(error);
                toastErrorMessage("비밀번호 설정 중 오류가 발생했어요.");
            });
    }

    const signupContext = {
        emailInput,
        secretInput,
        passwordInput,
        passwordConfirmInput,
        secretSended,
        secretAuthenticated,
        secretSending,
        secretAuthenticating,
        signingUp,
        setEmailInput,
        setSecretInput,
        setPasswordInput,
        setPasswordConfirmInput,
        sendSecret,
        authenticateSecret,
        setPassword,
        emailInputRef,
        secretInputRef,
        passwordInputRef,
    };

    return (
        <SignupContext.Provider value={signupContext}>
            {children}
        </SignupContext.Provider>
    );
}
