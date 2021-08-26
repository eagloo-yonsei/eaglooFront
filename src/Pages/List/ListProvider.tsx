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

interface ListContextProp {
    loadingRooms: boolean;
    publicRooms: Room[];
    customRooms: CustomRoom[];
    enterEntry: (roomType: RoomType, roomId: string) => void;
}

const InitialListContext: ListContextProp = {
    loadingRooms: true,
    publicRooms: [],
    customRooms: [],
    enterEntry: () => {},
};

const ListContext = createContext<ListContextProp>(InitialListContext);
export const useListContext = () => useContext(ListContext);

export default function ListProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const { isLoggedIn } = useAppContext();
    const [loadingRooms, setLoadingRooms] = useState<boolean>(true);
    const [publicRooms, setPublicRooms] = useState<Room[]>([]);
    const [customRooms, setCustomRooms] = useState<CustomRoom[]>([]);

    useEffect(() => {
        getAllRoom();
        return () => {};
    }, []);

    async function getAllRoom() {
        setLoadingRooms(true);
        await axios
            .get<(Room | CustomRoom)[]>(`${API_ENDPOINT}/api/room`)
            .then((response) => {
                const publicRooms: Room[] = [];
                const customRooms: CustomRoom[] = [];
                response.data.forEach((room) => {
                    if ("ownerId" in room) {
                        customRooms.push(room);
                    } else {
                        publicRooms.push(room);
                    }
                });
                setPublicRooms(publicRooms);
                setCustomRooms(customRooms);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoadingRooms(false);
            });
    }

    function enterEntry(roomType: RoomType, roomId: string) {
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
        loadingRooms,
        publicRooms,
        customRooms,
        enterEntry,
    };

    return (
        <ListContext.Provider value={listContext}>
            {children}
        </ListContext.Provider>
    );
}
