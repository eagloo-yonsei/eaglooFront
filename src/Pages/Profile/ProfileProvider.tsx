import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { SHA3 } from "sha3";
import { useHistory } from "react-router";
import { useAppContext } from "../../Routes/App/AppProvider";
import { API_ENDPOINT, ChildrenProp } from "../../Constants";
import { toastErrorMessage, toastSuccessMessage } from "../../Utils";

interface ProfileContextProp {
    confirmModalOpen: boolean;
    nickNameAvailable: boolean;
    nickNameValidating: boolean;
    modalOpenCondition: boolean;
    updatable: boolean;
    updating: boolean;
    nickNameInput: string;
    realNameInput: string;
    newPasswordInput: string;
    newPasswordConfirmInput: string;
    previousPasswordInput: string;
    openConfirmModal: () => void;
    setConfirmModalOpen: (status: boolean) => void;
    setNickNameAvailable: (status: boolean) => void;
    setNickNameInput: (input: string) => void;
    setRealNameInput: (input: string) => void;
    setNewPasswordInput: (input: string) => void;
    setNewPasswordConfirmInput: (input: string) => void;
    setPreviousNewPasswordInput: (input: string) => void;
    checkNickNameDuplicate: () => void;
    updateUserInfo: () => void;
}

const InitialProfileContext: ProfileContextProp = {
    confirmModalOpen: false,
    nickNameAvailable: false,
    nickNameValidating: false,
    modalOpenCondition: false,
    updatable: false,
    updating: false,
    nickNameInput: "",
    realNameInput: "",
    newPasswordInput: "",
    newPasswordConfirmInput: "",
    previousPasswordInput: "",
    openConfirmModal: () => {},
    setConfirmModalOpen: () => {},
    setNickNameAvailable: () => {},
    setNickNameInput: () => {},
    setRealNameInput: () => {},
    setNewPasswordInput: () => {},
    setNewPasswordConfirmInput: () => {},
    setPreviousNewPasswordInput: () => {},
    checkNickNameDuplicate: () => {},
    updateUserInfo: () => {},
};

const ProfileContext = createContext<ProfileContextProp>(InitialProfileContext);
export const useProfileContext = () => useContext(ProfileContext);

export default function ProfileProvider({ children }: ChildrenProp) {
    const { userInfo, setUserInfo } = useAppContext();
    const history = useHistory();
    const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
    const [nickNameAvailable, setNickNameAvailable] = useState<boolean>(false);
    const [nickNameValidating, setNickNameValidating] =
        useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);
    const [nickNameInput, setNickNameInput] = useState<string>("");
    const [realNameInput, setRealNameInput] = useState<string>("");
    const [newPasswordInput, setNewPasswordInput] = useState<string>("");
    const [newPasswordConfirmInput, setNewPasswordConfirmInput] =
        useState<string>("");
    const [previousPasswordInput, setPreviousNewPasswordInput] =
        useState<string>("");

    const hashedNewPassword = new SHA3(512);
    const hashedPreviousPassword = new SHA3(512);

    const modalOpenCondition: boolean = !!nickNameInput || !!realNameInput;

    const updatable: boolean =
        (!!userInfo?.nickName || !nickNameInput || nickNameAvailable) &&
        ((!newPasswordInput && !newPasswordConfirmInput) ||
            (newPasswordInput.length >= 8 &&
                newPasswordInput === newPasswordConfirmInput &&
                newPasswordInput !== previousPasswordInput)) &&
        !!previousPasswordInput;

    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        }
        return () => {};
    }, [userInfo]);

    function openConfirmModal() {
        setConfirmModalOpen(true);
    }

    function resetConditions() {
        setConfirmModalOpen(false);
        setNickNameAvailable(false);
        setNickNameValidating(false);
        setUpdating(false);
        setNickNameInput("");
        setRealNameInput("");
        setNewPasswordInput("");
        setNewPasswordConfirmInput("");
        setPreviousNewPasswordInput("");
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

    async function updateUserInfo() {
        setUpdating(true);
        hashedNewPassword.reset();
        hashedNewPassword.update(newPasswordInput);
        hashedPreviousPassword.reset();
        hashedPreviousPassword.update(previousPasswordInput);
        await axios
            .put<{ success: boolean; message: string }>(
                `${API_ENDPOINT}/api/user/userInfo`,
                {
                    email: userInfo?.email,
                    nickName: nickNameInput
                        ? nickNameInput
                        : userInfo?.nickName,
                    realName: realNameInput
                        ? realNameInput
                        : userInfo?.realName,
                    newPassword: newPasswordInput
                        ? hashedNewPassword.digest("hex")
                        : undefined,
                    previousPassword: hashedPreviousPassword.digest("hex"),
                }
            )
            .then((response) => {
                if (response.data.success) {
                    resetConditions();
                    if (userInfo) {
                        setUserInfo({
                            ...userInfo,
                            nickName: nickNameInput
                                ? nickNameInput
                                : userInfo.nickName,
                            realName: realNameInput
                                ? realNameInput
                                : userInfo.realName,
                        });
                    }
                    toastSuccessMessage(response.data.message);
                } else {
                    toastErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                toastErrorMessage("닉네임 중복 확인 중 오류가 발생했어요");
            })
            .finally(() => {
                setUpdating(false);
            });
    }

    const profileContext = {
        confirmModalOpen,
        nickNameAvailable,
        nickNameValidating,
        modalOpenCondition,
        updatable,
        updating,
        nickNameInput,
        realNameInput,
        newPasswordInput,
        newPasswordConfirmInput,
        previousPasswordInput,
        openConfirmModal,
        setConfirmModalOpen,
        setNickNameAvailable,
        setNickNameInput,
        setRealNameInput,
        setNewPasswordInput,
        setNewPasswordConfirmInput,
        setPreviousNewPasswordInput,
        checkNickNameDuplicate,
        updateUserInfo,
    };

    return (
        <ProfileContext.Provider value={profileContext}>
            {children}
        </ProfileContext.Provider>
    );
}
