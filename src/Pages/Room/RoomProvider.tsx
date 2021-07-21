import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import io, { Socket } from "socket.io-client";

interface AppProp {
    children: JSX.Element;
}

interface LocationStateProp {
    roomNo: number;
    seatNo: number;
}

interface RoomProp {
    roomNo: number;
    seatNo: number;
    exitRoom: () => void;
}

const InitialRoomContext: RoomProp = {
    roomNo: 0,
    seatNo: 0,
    exitRoom: () => {},
};

const RoomContext = createContext<RoomProp>(InitialRoomContext);
export const useRoomContext = () => useContext(RoomContext);

export default function RoomProvider({ children }: AppProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const socketRef = useRef<Socket>();
    const [roomNo, setRoomNo] = useState<number>(0);
    const [seatNo, setSeatNo] = useState<number>(0);

    function exitRoom() {
        history.push("/list");
    }

    useEffect(() => {
        // 방 입장시 roomNo, seatNo prop을 받고 온 게 아니면 /list로 push
        const state = location.state as LocationStateProp;
        if (state !== undefined) {
            setRoomNo(state.roomNo);
            setSeatNo(state.seatNo);
        } else {
            history.push("/list");
        }

        // socketRef.current = io(API_ENDPOINT);

        return () => {};
    }, []);

    const roomContext = { roomNo, seatNo, exitRoom };

    return (
        <RoomContext.Provider value={roomContext}>
            {children}
        </RoomContext.Provider>
    );
}
