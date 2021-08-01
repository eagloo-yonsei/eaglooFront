import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import axios from "axios";
import { ChildrenProp, CustomRoom, API_ENDPOINT } from "../../../Constants";

interface LocationStateProp {
    roomId: string;
    userSeatNo: number;
}

interface CustomRoomProp {
    roomId: string;
    userSeatNo: number;
    roomInfo: CustomRoom;
}

const InitialCustomRoomContext: CustomRoomProp = {
    roomId: "",
    userSeatNo: 0,
    roomInfo: {
        id: "",
        roomName: "",
        roomDescription: "",
        ownerId: "",
        openToPublic: true,
        usePassword: false,
        password: "",
        enableMic: false,
        seats: [],
    },
};

const CustomRoomContext = createContext<CustomRoomProp>(
    InitialCustomRoomContext
);

export const useCustomRoomContext = () => useContext(CustomRoomContext);

export default function CustomRoomProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const [roomId, setRoomId] = useState<string>("");
    const [userSeatNo, setUserSeatNo] = useState<number>(0);
    const [roomInfo, setRoomInfo] = useState<CustomRoom>({
        id: "",
        roomName: "",
        roomDescription: "",
        ownerId: "",
        openToPublic: true,
        usePassword: false,
        password: "",
        enableMic: false,
        seats: [],
    });

    useEffect(() => {
        // 엔트리 입장시 roomId prop을 받고 온 게 아니면 /list로 push
        const state = location.state as LocationStateProp;
        if (state !== undefined) {
            setRoomId(state.roomId);
            setUserSeatNo(state.userSeatNo);
            getRoomInfo(state.roomId);
        } else {
            history.push("/list");
        }

        return () => {};
    }, []);

    async function getRoomInfo(roomId: string) {
        await axios
            .get<CustomRoom>(`${API_ENDPOINT}/api/customroom/${roomId}`)
            .then((response) => {
                setRoomInfo(response.data);
            });
    }

    const customRoomContext = { roomId, userSeatNo, roomInfo };

    return (
        <CustomRoomContext.Provider value={customRoomContext}>
            {children}
        </CustomRoomContext.Provider>
    );
}
