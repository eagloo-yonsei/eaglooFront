import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChildrenProp, CustomRoom, API_ENDPOINT } from "../../Constants";
import { toastRequestLoginMessage, toastErrorMessage } from "../../Utils";
import { useAppContext } from "../../Routes/App/AppProvider";

interface CustomRoomModalContext {
    showList: boolean;
    searchingRoomNameInput: string;
    loadingCustomRooms: boolean;
    customRooms: CustomRoom[];
    selectedRoomId: string;
    roomNameInput: string;
    roomDescriptionInput: string;
    usePassword: boolean;
    passwordInput: string;
    passwordConfirmInput: string;
    allowMic: boolean;
    creatingRoom: boolean;
    setShowList: (status: boolean) => void;
    setsearchingRoomNameInput: (input: string) => void;
    setSelectedRoomId: (input: string) => void;
    selectRoom: (input: string) => void;
    joinRoom: (roomId: string) => void;
    setRoomNameInput: (input: string) => void;
    setRoomDescriptionInput: (input: string) => void;
    setUsePassword: (status: boolean) => void;
    toggleUsePassword: () => void;
    setPasswordInput: (input: string) => void;
    setPasswordConfirmInput: (input: string) => void;
    setAllowMic: (status: boolean) => void;
    toggleAllowMic: () => void;
    createRoomAndPushToEntry: () => void;
}

const InitialCustomRoomModalContext: CustomRoomModalContext = {
    showList: true,
    searchingRoomNameInput: "",
    loadingCustomRooms: true,
    customRooms: [],
    selectedRoomId: "",
    roomNameInput: "",
    roomDescriptionInput: "",
    usePassword: false,
    passwordInput: "",
    passwordConfirmInput: "",
    allowMic: false,
    creatingRoom: false,
    setShowList: () => {},
    setsearchingRoomNameInput: () => {},
    setSelectedRoomId: () => {},
    selectRoom: () => {},
    joinRoom: () => {},
    setRoomNameInput: () => {},
    setRoomDescriptionInput: () => {},
    setUsePassword: () => {},
    toggleUsePassword: () => {},
    setPasswordInput: () => {},
    setPasswordConfirmInput: () => {},
    setAllowMic: () => {},
    toggleAllowMic: () => {},
    createRoomAndPushToEntry: () => {},
};

const CustomRoomModalContext = createContext<CustomRoomModalContext>(
    InitialCustomRoomModalContext
);
export const useCustomRoomModalContext = () =>
    useContext(CustomRoomModalContext);

export default function CustomRoomModalProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const { isLoggedIn, userId, setShowCustomRoomModal } = useAppContext();
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

    function joinRoom(roomId: string) {
        setShowCustomRoomModal(false);
        // TODO (bug) 비로그인 상태에서 엔트리 입장시 로그인 페이지로
        if (!isLoggedIn) {
            history.push("/login");
            // toastRequestLoginMessage();
        }
        history.push({
            pathname: "/entry__custom",
            state: {
                roomId: roomId,
            },
        });
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
        roomId: string;
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
                        state: {
                            roomId: response.data.roomId,
                        },
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
        searchingRoomNameInput,
        loadingCustomRooms,
        customRooms,
        selectedRoomId,
        roomNameInput,
        roomDescriptionInput,
        usePassword,
        passwordInput,
        passwordConfirmInput,
        allowMic,
        creatingRoom,
        setShowList,
        setsearchingRoomNameInput,
        setSelectedRoomId,
        selectRoom,
        joinRoom,
        setRoomNameInput,
        setRoomDescriptionInput,
        setUsePassword,
        toggleUsePassword,
        setPasswordInput,
        setPasswordConfirmInput,
        setAllowMic,
        toggleAllowMic,
        createRoomAndPushToEntry,
    };

    return (
        <CustomRoomModalContext.Provider value={customRoomModalContext}>
            {children}
        </CustomRoomModalContext.Provider>
    );
}