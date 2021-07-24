import React, { createContext, useContext, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import io, { Socket } from "socket.io-client";
import Peer from "simple-peer";
import { useAppContext } from "../../Routes/App/AppProvider";

interface AppProp {
    children: JSX.Element;
}

interface LocationStateProp {
    roomNo: number;
    seatNo: number;
}

interface PeersStateProp {
    peer: Peer.Instance;
    seatNo: number;
}

interface PeersRefProp {
    peer: Peer.Instance;
    socketId: string;
    seatNo: number;
}

interface RoomProp {
    roomNo: number;
    seatNo: number;
    exitRoom: () => void;
    peersState: PeersStateProp[];
}

const InitialRoomContext: RoomProp = {
    roomNo: 0,
    seatNo: 0,
    exitRoom: () => {},
    peersState: [],
};

const RoomContext = createContext<RoomProp>(InitialRoomContext);
export const useRoomContext = () => useContext(RoomContext);

export default function RoomProvider({ children }: AppProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const state = location.state as LocationStateProp;
    const socketRef = useRef<Socket>();
    const [roomNo, setRoomNo] = useState<number>(state?.roomNo);
    const [seatNo, setSeatNo] = useState<number>(state?.seatNo);
    const [peersState, setPeersState] = useState<PeersStateProp[]>([]);

    function exitRoom() {
        history.push("/list");
    }

    const roomContext = { roomNo, seatNo, exitRoom, peersState };

    return (
        <RoomContext.Provider value={roomContext}>
            {children}
        </RoomContext.Provider>
    );
}
