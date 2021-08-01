import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import { ChildrenProp } from "../../../Constants";

interface LocationStateProp {
    roomNo: number;
    userSeatNo: number;
}

interface PublicRoomProp {
    roomNo: number;
    userSeatNo: number;
}

const InitialPublicRoomContext: PublicRoomProp = {
    roomNo: 0,
    userSeatNo: 0,
};

const PublicRoomContext = createContext<PublicRoomProp>(
    InitialPublicRoomContext
);
export const usePublicRoomContext = () => useContext(PublicRoomContext);

export default function PublicRoomProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const [roomNo, setRoomNo] = useState<number>(0);
    const [userSeatNo, setUserSeatNo] = useState<number>(0);

    useEffect(() => {
        // 엔트리 입장시 roomNo prop을 받고 온 게 아니면 /list로 push
        const state = location.state as LocationStateProp;
        if (state !== undefined) {
            setRoomNo(state.roomNo);
            setUserSeatNo(state.userSeatNo);
        } else {
            history.push("/list");
        }

        return () => {};
    }, []);

    const publicRoomContext = { roomNo, userSeatNo };

    return (
        <PublicRoomContext.Provider value={publicRoomContext}>
            {children}
        </PublicRoomContext.Provider>
    );
}
