import React, {
    createContext,
    useContext,
    RefObject,
    useRef,
    useState,
    useEffect,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import axios from "axios";
import io, { Socket } from "socket.io-client";
import {
    RoomType,
    Room,
    CustomRoom,
    ChildrenProp,
    API_ENDPOINT,
} from "../../Constants";

interface RoomLocationStateProp {
    roomType: RoomType;
    roomId: string;
    userSeatNo: number;
}

interface RoomContextProp {
    socketRef?: RefObject<Socket | undefined>;
    roomType: RoomType;
    roomId: string;
    roomInfo: Room | CustomRoom;
    userSeatNo: number;
    chattingOpen: boolean;
    setChattingOpen: (status: boolean) => void;
}

const InitialRoomContext: RoomContextProp = {
    roomType: RoomType.PUBLIC,
    roomId: "",
    roomInfo: {
        id: "",
        roomName: "",
        seats: [],
    },
    userSeatNo: 0,
    chattingOpen: false,
    setChattingOpen: () => {},
};

const RoomContext = createContext<RoomContextProp>(InitialRoomContext);
export const useRoomContext = () => useContext(RoomContext);

export default function RoomProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const socketRef = useRef<Socket | undefined>();
    const [roomType, setRoomType] = useState<RoomType>(RoomType.PUBLIC);
    const [roomId, setRoomId] = useState<string>("");
    const [roomInfo, setRoomInfo] = useState<Room | CustomRoom>({
        id: "",
        roomName: "",
        seats: [],
    });
    const [userSeatNo, setUserSeatNo] = useState<number>(0);
    const [chattingOpen, setChattingOpen] = useState<boolean>(false);

    useEffect(() => {
        // 엔트리 입장시 roomId prop을 받고 온 게 아니면 /list로 push
        const state = location.state as RoomLocationStateProp;
        if (state !== undefined) {
            setRoomType(state.roomType);
            setRoomId(state.roomId);
            setUserSeatNo(state.userSeatNo);
            getRoomInfo(state.roomType, state.roomId);
        } else {
            history.push("/list");
        }

        socketRef.current = io(
            state.roomType === RoomType.PUBLIC
                ? `${API_ENDPOINT}/publicroom`
                : `${API_ENDPOINT}/customroom`
        );

        return () => {};
    }, []);

    async function getRoomInfo(roomType: RoomType, roomId: string) {
        await axios
            .get<Room | CustomRoom>(
                roomType === RoomType.PUBLIC
                    ? `${API_ENDPOINT}/api/room/${roomId}`
                    : `${API_ENDPOINT}/api/customroom/${roomId}`
            )
            .then((response) => {
                setRoomInfo(response.data);
            });
    }

    const roomContext = {
        socketRef,
        roomType,
        roomId,
        roomInfo,
        userSeatNo,
        chattingOpen,
        setChattingOpen,
    };

    return (
        <RoomContext.Provider value={roomContext}>
            {children}
        </RoomContext.Provider>
    );
}
