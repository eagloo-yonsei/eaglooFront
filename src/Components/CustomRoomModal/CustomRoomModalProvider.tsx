import React, { createContext, useContext, useState } from "react";

interface AppProp {
    children: JSX.Element;
}

interface CustomRoomModalContext {
    showList: boolean;
    setShowList: (status: boolean) => void;
    searchingRoomNameInput: string;
    setsearchingRoomNameInput: (input: string) => void;
    selectedRoomId: string;
    setSelectedRoomId: (input: string) => void;
    selectRoom: (input: string) => void;
    roomNameInput: string;
    setRoomNameInput: (input: string) => void;
    roomDescriptionInput: string;
    setRoomDescriptionInput: (input: string) => void;
    usePassword: boolean;
    setUsePassword: (status: boolean) => void;
    toggleUsePassword: () => void;
    passwordInput: string;
    setPasswordInput: (input: string) => void;
    passwordConfirmInput: string;
    setPasswordConfirmInput: (input: string) => void;
    allowMic: boolean;
    setAllowMic: (status: boolean) => void;
    toggleAllowMic: () => void;
}

const InitialCustomRoomModalContext: CustomRoomModalContext = {
    showList: true,
    setShowList: () => {},
    searchingRoomNameInput: "",
    setsearchingRoomNameInput: () => {},
    selectedRoomId: "",
    setSelectedRoomId: () => {},
    selectRoom: () => {},
    roomNameInput: "",
    setRoomNameInput: () => {},
    roomDescriptionInput: "",
    setRoomDescriptionInput: () => {},
    usePassword: false,
    setUsePassword: () => {},
    toggleUsePassword: () => {},
    passwordInput: "",
    setPasswordInput: () => {},
    passwordConfirmInput: "",
    setPasswordConfirmInput: () => {},
    allowMic: false,
    setAllowMic: () => {},
    toggleAllowMic: () => {},
};

const CustomRoomModalContext = createContext<CustomRoomModalContext>(
    InitialCustomRoomModalContext
);
export const useCustomRoomModalContext = () =>
    useContext(CustomRoomModalContext);

export default function CustomRoomModalProvider({ children }: AppProp) {
    const [showList, setShowList] = useState<boolean>(true);
    const [searchingRoomNameInput, setsearchingRoomNameInput] =
        useState<string>("");
    const [selectedRoomId, setSelectedRoomId] = useState<string>("");
    const [roomNameInput, setRoomNameInput] = useState<string>("");
    const [roomDescriptionInput, setRoomDescriptionInput] =
        useState<string>("");
    const [usePassword, setUsePassword] = useState<boolean>(false);
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [passwordConfirmInput, setPasswordConfirmInput] =
        useState<string>("");
    const [allowMic, setAllowMic] = useState<boolean>(false);

    function selectRoom(roomId: string) {
        if (selectedRoomId === roomId) {
            setSelectedRoomId("");
        } else {
            setSelectedRoomId(roomId);
        }
    }

    function toggleUsePassword() {
        if (usePassword) {
            setUsePassword(false);
        } else {
            setUsePassword(true);
        }
    }

    function toggleAllowMic() {
        if (allowMic) {
            setAllowMic(false);
        } else {
            setAllowMic(true);
        }
    }

    const customRoomModalContext = {
        showList,
        setShowList,
        searchingRoomNameInput,
        setsearchingRoomNameInput,
        selectedRoomId,
        setSelectedRoomId,
        selectRoom,
        roomNameInput,
        setRoomNameInput,
        roomDescriptionInput,
        setRoomDescriptionInput,
        usePassword,
        setUsePassword,
        toggleUsePassword,
        passwordInput,
        setPasswordInput,
        passwordConfirmInput,
        setPasswordConfirmInput,
        allowMic,
        setAllowMic,
        toggleAllowMic,
    };

    return (
        <CustomRoomModalContext.Provider value={customRoomModalContext}>
            {children}
        </CustomRoomModalContext.Provider>
    );
}
