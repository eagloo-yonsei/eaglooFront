import React, {
    createContext,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    API_ENDPOINT,
    ChildrenProp,
    User,
    RoomType,
    RoomUsingInfo,
} from "../../Constants";
import io, { Socket } from "socket.io-client";

interface AppContext {
    socketRef?: RefObject<Socket | undefined>;
    userStream?: RefObject<HTMLVideoElement>;
    token?: string;
    isLoggedIn: boolean;
    userInfo: User | undefined;
    roomUsingInfo: RoomUsingInfo | undefined;
    showCustomRoomModal: boolean;
    schedulerOpen: boolean;
    setIsLoggedIn: (status: boolean) => void;
    setUserInfo: (userInfo: User | undefined) => void;
    setRoomUsingInfo: (roomUsingInfo: RoomUsingInfo | undefined) => void;
    setShowCustomRoomModal: (status: boolean) => void;
    toggleSchedulerOpen: () => void;
}

const InitialAppContext: AppContext = {
    isLoggedIn: false,
    userInfo: undefined,
    roomUsingInfo: undefined,
    showCustomRoomModal: false,
    schedulerOpen: false,
    setIsLoggedIn: () => {},
    setUserInfo: () => {},
    setRoomUsingInfo: () => {},
    setShowCustomRoomModal: () => {},
    toggleSchedulerOpen: () => {},
};

const AppContext = createContext<AppContext>(InitialAppContext);
export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: ChildrenProp) {
    const initialUser: User = {
        id: "c8c095e6-777b-43f4-a727-bfce7f0e3192",
        email: "tester",
        isAdmin: false,
        owningRooms: [],
    };
    const initialRoomUsingInfo: RoomUsingInfo = {
        roomType: RoomType.CUSTOM,
        roomId: "6b0d7561-5bad-4d93-8aa4-587edb9ca101",
        roomName: "Ycc 모여라",
        seatNo: 1,
        endTime: new Date().getTime() + 1000 * 60 * 60 * 2,
    };
    const socketRef = useRef<Socket | undefined>();
    const userStream = useRef<HTMLVideoElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        API_ENDPOINT === "http://localhost:5000" ? true : false
    );
    const [userInfo, setUserInfo] = useState<User | undefined>(
        API_ENDPOINT === "http://localhost:5000" ? initialUser : undefined
    );
    // 방에 입장한 경우 저장되는 정보
    const [roomUsingInfo, setRoomUsingInfo] = useState<
        RoomUsingInfo | undefined
    >(
        API_ENDPOINT === "http://localhost:5000"
            ? initialRoomUsingInfo
            : undefined
    );
    const [showCustomRoomModal, setShowCustomRoomModal] =
        useState<boolean>(false);
    const [schedulerOpen, setSchedulerOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isLoggedIn) {
            if (userInfo && !userInfo.isAdmin && !socketRef.current) {
                socketRef.current = io(API_ENDPOINT, {
                    query: { userInfo: JSON.stringify(userInfo) },
                });
            }
        } else {
            socketRef.current?.disconnect();
            socketRef.current = undefined;
        }
    }, [isLoggedIn, userInfo]);

    function toggleSchedulerOpen() {
        setSchedulerOpen(!schedulerOpen);
    }

    const appContext = {
        socketRef,
        isLoggedIn,
        userInfo,
        roomUsingInfo,
        showCustomRoomModal,
        schedulerOpen,
        userStream,
        setIsLoggedIn,
        setUserInfo,
        setRoomUsingInfo,
        setShowCustomRoomModal,
        toggleSchedulerOpen,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
