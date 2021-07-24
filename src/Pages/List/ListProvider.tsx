import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../Constants";

interface AppProp {
    children: JSX.Element;
}

interface Seat {
    seatNo: number;
    socketId: string;
    userName?: string;
}

interface Room {
    roomNo: number;
    seats: Seat[];
}

interface ListProp {
    publicRooms: Room[];
}

const InitialListContext: ListProp = {
    publicRooms: [],
};

const ListContext = createContext<ListProp>(InitialListContext);
export const useListContext = () => useContext(ListContext);

export default function ListProvider({ children }: AppProp) {
    const [publicRooms, setPublicRooms] = useState<Room[]>([]);

    useEffect(() => {
        getPublicRooms();
        return () => {};
    }, []);

    async function getPublicRooms() {
        await axios.get<Room[]>(`${API_ENDPOINT}/api/room`).then((response) => {
            setPublicRooms(response.data);
        });
    }

    const listContext = {
        publicRooms,
    };

    return (
        <ListContext.Provider value={listContext}>
            {children}
        </ListContext.Provider>
    );
}
