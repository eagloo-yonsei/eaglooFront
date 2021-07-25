import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";

interface AppProp {
    children: JSX.Element;
}

interface LocationStateProp {
    roomNo: number;
    seatNo: number;
}

interface RoomProp {
    roomNo: number;
    userSeatNo: number;
}

const InitialRoomContext: RoomProp = {
    roomNo: 0,
    userSeatNo: 0,
};

const RoomContext = createContext<RoomProp>(InitialRoomContext);
export const useRoomContext = () => useContext(RoomContext);

export default function RoomProvider({ children }: AppProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const [roomNo, setRoomNo] = useState<number>(0);
    const [userSeatNo, setUserSeatNo] = useState<number>(0);

    useEffect(() => {
        // 엔트리 입장시 roomNo prop을 받고 온 게 아니면 /list로 push
        const state = location.state as LocationStateProp;
        if (state !== undefined) {
            setRoomNo(state.roomNo);
            setUserSeatNo(state.seatNo);
        } else {
            history.push("/list");
        }

        return () => {};
    }, []);

    const roomContext = { roomNo, userSeatNo };

    return (
        <RoomContext.Provider value={roomContext}>
            {children}
        </RoomContext.Provider>
    );
}
