import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Room, CustomRoom, API_ENDPOINT } from "../../Constants";
import { useHistory } from "react-router-dom";

interface AppProp {
    children: JSX.Element;
}

interface ListProp {
    loadingPublicRooms: boolean;
    loadingCustomRooms: boolean;
    publicRooms: Room[];
    customRooms: CustomRoom[];
    pushToPublicRoomEntry: (roomNo: number) => void;
    pushToCustomRoomEntry: (roomId: string) => void;
}

const InitialListContext: ListProp = {
    loadingPublicRooms: true,
    loadingCustomRooms: true,
    publicRooms: [],
    customRooms: [],
    pushToPublicRoomEntry: () => {},
    pushToCustomRoomEntry: () => {},
};

const ListContext = createContext<ListProp>(InitialListContext);
export const useListContext = () => useContext(ListContext);

export default function ListProvider({ children }: AppProp) {
    const history = useHistory();
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

    function pushToPublicRoomEntry(roomNo: number) {
        history.push({
            pathname: "/entry__public",
            state: { roomNo: roomNo },
        });
    }

    function pushToCustomRoomEntry(roomId: string) {
        history.push({
            pathname: "/entry__custom",
            state: { roomId: roomId },
        });
    }

    const listContext = {
        loadingPublicRooms,
        loadingCustomRooms,
        publicRooms,
        customRooms,
        pushToPublicRoomEntry,
        pushToCustomRoomEntry,
    };

    return (
        <ListContext.Provider value={listContext}>
            {children}
        </ListContext.Provider>
    );
}
