import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
    ChildrenProp,
    RoomType,
    Room,
    CustomRoom,
    API_ENDPOINT,
} from "../../Constants";
import { toastRequestLoginMessage, toastErrorMessage } from "../../Utils";
import { useAppContext } from "../../Routes/App/AppProvider";

interface CustomRoomModalContext {
    showList: boolean;
    searchingRoomNameInput: string;
    loadingCustomRooms: boolean;
    customRooms: CustomRoom[];
    searchedRooms: CustomRoom[];
    selectedRoomId: string;
    roomNameInput: string;
    roomDescriptionInput: string;
    usePassword: boolean;
    passwordInput: string;
    passwordConfirmInput: string;
    allowMic: boolean;
    creatingRoom: boolean;
    filteringRoomsByName: () => void;
    setShowList: (status: boolean) => void;
    setSearchingRoomNameInput: (input: string) => void;
    setSelectedRoomId: (input: string) => void;
    selectRoom: (input: string) => void;
    setSearchedRooms: (rooms: CustomRoom[]) => void;
    enterRoom: (roomId: string) => void;
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
    searchedRooms: [],
    selectedRoomId: "",
    roomNameInput: "",
    roomDescriptionInput: "",
    usePassword: false,
    passwordInput: "",
    passwordConfirmInput: "",
    allowMic: false,
    creatingRoom: false,
    filteringRoomsByName: () => {},
    setShowList: () => {},
    setSearchingRoomNameInput: () => {},
    setSelectedRoomId: () => {},
    selectRoom: () => {},
    setSearchedRooms: () => {},
    enterRoom: () => {},
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
    const { isLoggedIn, userInfo, setShowCustomRoomModal } = useAppContext();
    const [showList, setShowList] = useState<boolean>(true);
    const [searchingRoomNameInput, setSearchingRoomNameInput] =
        useState<string>("");
    const [loadingCustomRooms, setLoadingCustomRooms] = useState<boolean>(true);
    const [customRooms, setCustomRooms] = useState<CustomRoom[]>([]);
    const [searchedRooms, setSearchedRooms] = useState<CustomRoom[]>([]);
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
            .get<(Room | CustomRoom)[]>(`${API_ENDPOINT}/api/room`)
            .then((response) => {
                const customRooms: CustomRoom[] = [];
                response.data.forEach((room) => {
                    if ("ownerId" in room) {
                        customRooms.push(room);
                    }
                });
                setCustomRooms(customRooms);
                setSearchedRooms(customRooms);
                setLoadingCustomRooms(false);
            })
            .catch((e) => {
                setCustomRooms([]);
                setLoadingCustomRooms(false);
            });
    }

    function filteringRoomsByName() {
        let searchedRooms: CustomRoom[] = [];
        customRooms.forEach((customRoom) => {
            if (customRoom.roomName.includes(searchingRoomNameInput)) {
                searchedRooms.push(customRoom);
            }
        });
        setSearchedRooms(searchedRooms);
    }

    function selectRoom(roomId: string) {
        if (selectedRoomId === roomId) {
            setSelectedRoomId("");
        } else {
            setSelectedRoomId(roomId);
        }
    }

    function enterRoom(roomId: string) {
        setShowCustomRoomModal(false);
        if (isLoggedIn) {
            history.push({
                pathname: "/entry",
                state: {
                    roomType: RoomType.CUSTOM,
                    roomId: roomId,
                },
            });
        } else {
            toastRequestLoginMessage();
            history.push("/login");
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
        roomId: string;
        message: string;
    }

    async function createRoomAndPushToEntry() {
        setCreatingRoom(true);
        await axios
            .post<ResponseProp>(`${API_ENDPOINT}/api/room`, {
                newRoom: {
                    roomName: roomNameInput,
                    roomDescription: roomDescriptionInput,
                    ownerId: userInfo?.id,
                    openToPublic: true,
                    usePassword: usePassword,
                    password: passwordInput,
                    allowMic,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    history.push({
                        pathname: "/entry",
                        state: {
                            roomType: RoomType.CUSTOM,
                            roomId: response.data.roomId,
                        },
                    });
                } else {
                    setCreatingRoom(false);
                    toastErrorMessage(
                        response.data.message ||
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
        searchedRooms,
        selectedRoomId,
        roomNameInput,
        roomDescriptionInput,
        usePassword,
        passwordInput,
        passwordConfirmInput,
        allowMic,
        creatingRoom,
        filteringRoomsByName,
        setShowList,
        setSearchingRoomNameInput,
        setSelectedRoomId,
        selectRoom,
        setSearchedRooms,
        enterRoom,
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
