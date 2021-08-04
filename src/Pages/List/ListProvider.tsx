import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../Routes/App/AppProvider";
import { toastRequestLoginMessage } from "../../Utils";
import {
    ChildrenProp,
    Room,
    CustomRoom,
    API_ENDPOINT,
    RoomType,
} from "../../Constants";

interface ListProp {
    loadingPublicRooms: boolean;
    loadingCustomRooms: boolean;
    publicRooms: Room[];
    customRooms: CustomRoom[];
    pushToEntry: (roomType: RoomType, roomId: string) => void;
}

const InitialListContext: ListProp = {
    loadingPublicRooms: true,
    loadingCustomRooms: true,
    publicRooms: [],
    customRooms: [],
    pushToEntry: () => {},
};

const ListContext = createContext<ListProp>(InitialListContext);
export const useListContext = () => useContext(ListContext);

export default function ListProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const { isLoggedIn } = useAppContext();
    const [loadingPublicRooms, setLoadingPublicRooms] = useState<boolean>(true);
    const [loadingCustomRooms, setLoadingCustomRooms] = useState<boolean>(true);
    const [publicRooms, setPublicRooms] = useState<Room[]>([]);
    const [customRooms, setCustomRooms] = useState<CustomRoom[]>([]);

    useEffect(() => {
        getPublicRooms();
        getCustomRooms();
        return () => {};
    }, []);

    async function getPublicRooms() {
        setLoadingPublicRooms(true);
        await axios
            .get<Room[]>(`${API_ENDPOINT}/api/room`)
            .then((response) => {
                setPublicRooms(response.data);
                setLoadingPublicRooms(false);
            })
            .catch((e) => {
                setPublicRooms([]);
                setLoadingPublicRooms(false);
            });
    }

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

    function pushToEntry(roomType: RoomType, roomId: string) {
        if (isLoggedIn) {
            history.push({
                pathname: "/entry",
                state: { roomType: roomType, roomId: roomId },
            });
        } else {
            toastRequestLoginMessage();
            history.push("/login");
        }
    }

    const listContext = {
        loadingPublicRooms,
        loadingCustomRooms,
        publicRooms,
        customRooms,
        pushToEntry,
    };

    return (
        <ListContext.Provider value={listContext}>
            {children}
        </ListContext.Provider>
    );
}
