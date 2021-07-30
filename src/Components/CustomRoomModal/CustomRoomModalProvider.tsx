import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CustomRoom, API_ENDPOINT } from "../../Constants";
import { toastErrorMessage } from "../../Styles/StyledComponents";
import { useAppContext } from "../../Routes/App/AppProvider";

interface AppProp {
    children: JSX.Element;
}

interface CustomRoomModalContext {
    showList: boolean;
    setShowList: (status: boolean) => void;
    searchingRoomNameInput: string;
    setsearchingRoomNameInput: (input: string) => void;
    loadingCustomRooms: boolean;
    customRooms: CustomRoom[];
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
    creatingRoom: boolean;
    createRoomAndPushToEntry: () => void;
}

const InitialCustomRoomModalContext: CustomRoomModalContext = {
    showList: true,
    setShowList: () => {},
    searchingRoomNameInput: "",
    setsearchingRoomNameInput: () => {},
    loadingCustomRooms: true,
    customRooms: [],
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
    creatingRoom: false,
    createRoomAndPushToEntry: () => {},
};

const CustomRoomModalContext = createContext<CustomRoomModalContext>(
    InitialCustomRoomModalContext
);
export const useCustomRoomModalContext = () =>
    useContext(CustomRoomModalContext);

export default function CustomRoomModalProvider({ children }: AppProp) {
    const history = useHistory();
    const { userId } = useAppContext();
    const [showList, setShowList] = useState<boolean>(true);
    const [searchingRoomNameInput, setsearchingRoomNameInput] =
        useState<string>("");
    const [loadingCustomRooms, setLoadingCustomRooms] = useState<boolean>(true);
    const [customRooms, setCustomRooms] = useState<CustomRoom[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<string>("");
    const [roomNameInput, setRoomNameInput] = useState<string>("");
    const [roomDescriptionInput, setRoomDescriptionInput] =
        useState<string>("");
    const [usePassword, setUsePassword] = useState<boolean>(false);
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [passwordConfirmInput, setPasswordConfirmInput] =
        useState<string>("");
    const [allowMic, setAllowMic] = useState<boolean>(false);
    const [creatingRoom, setCreatingRoom] = useState<boolean>(false);

    useEffect(() => {
        getCustomRooms();
        return () => {};
    }, []);

    async function getCustomRooms() {
        setLoadingCustomRooms(true);
        await axios
            .get<CustomRoom[]>(`${API_ENDPOINT}/api/customroom`)
            .then((response) => {
                setCustomRooms(response.data);
                setLoadingCustomRooms(false);
            })
            .catch((e) => {
                setCustomRooms([]);
                setLoadingCustomRooms(false);
            });
    }

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

    interface ResponseProp {
        success: boolean;
        errorMessage?: string;
    }

    async function createRoomAndPushToEntry() {
        setCreatingRoom(true);
        await axios
            .post<ResponseProp>(`${API_ENDPOINT}/api/customroom`, {
                roomName: roomNameInput,
                roomDescription: roomDescriptionInput,
                ownerId: userId,
                openToPublic: true,
                usePassword: usePassword,
                password: passwordInput,
                allowMic,
            })
            .then((response) => {
                if (response.data.success) {
                    history.push({
                        pathname: "/entry__custom",
                        state: {},
                    });
                } else {
                    setCreatingRoom(false);
                    toastErrorMessage(
                        response.data.errorMessage ||
                            "방을 만드는 도중 오류가 발생했어요."
                    );
                }
            })
            .catch((error) => {
                console.error(error);
                setCreatingRoom(false);
                toastErrorMessage("방을 만드는 도중 오류가 발생했어요.");
            });
        return;
    }

    const customRoomModalContext = {
        showList,
        setShowList,
        searchingRoomNameInput,
        setsearchingRoomNameInput,
        loadingCustomRooms,
        customRooms,
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
        creatingRoom,
        createRoomAndPushToEntry,
    };

    return (
        <CustomRoomModalContext.Provider value={customRoomModalContext}>
            {children}
        </CustomRoomModalContext.Provider>
    );
}
