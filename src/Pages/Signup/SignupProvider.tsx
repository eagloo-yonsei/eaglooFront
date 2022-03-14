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
    nickNameInput: string;
    realNameInput: string;
    secretSended: boolean;
    secretAuthenticated: boolean;
    completeSettingPassword: boolean;
    secretSending: boolean;
    secretAuthenticating: boolean;
    settingPassword: boolean;
    nickNameAvailable: boolean;
    nickNameValidating: boolean;
    signingUp: boolean;
    setEmailInput: (input: string) => void;
    setSecretInput: (input: string) => void;
    setPasswordInput: (input: string) => void;
    setPasswordConfirmInput: (input: string) => void;
    setNickNameInput: (input: string) => void;
    setRealNameInput: (input: string) => void;
    sendSecret: () => void;
    authenticateSecret: () => void;
    setPassword: () => void;
    checkNickNameDuplicate: () => void;
    setNickNameAvailable: (status: boolean) => void;
    setNickNameAndRealName: () => void;
    setNameAndPassword: () => void;
    emailInputRef?: RefObject<HTMLInputElement>;
    secretInputRef?: RefObject<HTMLInputElement>;
    passwordInputRef?: RefObject<HTMLInputElement>;
}

const InitialSignupContext: SignupContext = {
    emailInput: "",
    secretInput: "",
    passwordInput: "",
    passwordConfirmInput: "",
    nickNameInput: "",
    realNameInput: "",
    secretSended: false,
    secretAuthenticated: false,
    completeSettingPassword: false,
    secretSending: false,
    secretAuthenticating: false,
    settingPassword: false,
    nickNameAvailable: false,
    nickNameValidating: false,
    signingUp: false,
    setEmailInput: () => {},
    setSecretInput: () => {},
    setPasswordInput: () => {},
    setPasswordConfirmInput: () => {},
    setNickNameInput: () => {},
    setRealNameInput: () => {},
    sendSecret: () => {},
    authenticateSecret: () => {},
    setPassword: () => {},
    checkNickNameDuplicate: () => {},
    setNickNameAvailable: () => {},
    setNickNameAndRealName: () => {},
    setNameAndPassword: () => {},
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
    const [nickNameInput, setNickNameInput] = useState<string>("");
    const [realNameInput, setRealNameInput] = useState<string>("");

    const [secretSended, setSecretSended] = useState<boolean>(false);
    const [secretAuthenticated, setSecretAuthenticated] =
        useState<boolean>(false);
    const [completeSettingPassword, setCompleteSettingPassword] =
        useState<boolean>(false);

    const [secretSending, setSecretSending] = useState<boolean>(false);
    const [secretAuthenticating, setSecretAuthenticating] =
        useState<boolean>(false);

    const [settingPassword, setSettingPassword] = useState<boolean>(false);

    const [nickNameAvailable, setNickNameAvailable] = useState<boolean>(false);
    const [nickNameValidating, setNickNameValidating] =
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
        // setSecretSended(true);
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
        // setSecretAuthenticated(true);
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
        // setCompleteSettingPassword(true);
        if (passwordInput !== passwordConfirmInput) {
            toastErrorMessage("비밀번호가 다릅니다");
            return;
        }
        setSettingPassword(true);
        hashedPassword.reset();
        hashedPassword.update(passwordInput);

        await axios
            .put(`${API_ENDPOINT}/api/user/password`, {
                email: emailInput,
                givenPassword: hashedPassword.digest("hex"),
            })
            .then((response) => {
                if (response.data.success) {
                    setCompleteSettingPassword(true);
                } else {
                    toastErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                toastErrorMessage("비밀번호 설정 중 오류가 발생했어요.");
            })
            .finally(() => {
                setSettingPassword(false);
            });
    }

    async function setNickNameAndRealName() {
        if (!nickNameAvailable || nickNameValidating) {
            return;
        }
        setSigningUp(true);
        await axios
            .put(`${API_ENDPOINT}/api/user/nickNameAndRealName`, {
                email: emailInput,
                nickName: nickNameInput ? nickNameInput : undefined,
                realName: realNameInput,
            })
            .then((response) => {
                if (response.data.success) {
                    toastSignupSuccessMessage(emailInput);
                    // TODO (enhancement) 로그인 이후 돌아갈 때 이전 페이지 주소를 받을 수 있는 방법은 없는가?
                    history.push("/");
                    history.push("/login");
                } else {
                    toastErrorMessage(response.data.message);
                    setSigningUp(false);
                }
            })
            .catch((error) => {
                console.error(error);
                toastErrorMessage("추가 정보 설정 중 오류가 발생했어요.");
                setSigningUp(false);
            });
    }

    async function checkNickNameDuplicate() {
        if (nickNameInput.length < 3) {
            return;
        }
        setNickNameValidating(true);
        await axios
            .get<{ success: boolean; message: string }>(
                `${API_ENDPOINT}/api/user/nickName/${nickNameInput}`
            )
            .then((response) => {
                if (response.data.success) {
                    setNickNameAvailable(true);
                } else {
                    toastErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                toastErrorMessage("닉네임 중복 확인 중 오류가 발생했어요");
            })
            .finally(() => {
                setNickNameValidating(false);
            });
    }

    async function setNameAndPassword() {
        await setPassword();
        setNickNameAndRealName();
    }

    const signupContext = {
        emailInput,
        secretInput,
        passwordInput,
        passwordConfirmInput,
        nickNameInput,
        realNameInput,
        secretSended,
        secretAuthenticated,
        completeSettingPassword,
        secretSending,
        secretAuthenticating,
        settingPassword,
        nickNameAvailable,
        nickNameValidating,
        signingUp,
        setEmailInput,
        setSecretInput,
        setPasswordInput,
        setPasswordConfirmInput,
        setNickNameInput,
        setRealNameInput,
        sendSecret,
        authenticateSecret,
        setPassword,
        checkNickNameDuplicate,
        setNickNameAvailable,
        setNickNameAndRealName,
        setNameAndPassword,
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
