import React, {
    createContext,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { API_ENDPOINT, ChildrenProp, User } from "../../Constants";
import io, { Socket } from "socket.io-client";

interface AppContext {
    socketRef?: RefObject<Socket | undefined>;
    userStream?: RefObject<HTMLVideoElement>;
    token?: string;
    isLoggedIn: boolean;
    userInfo: User | undefined;
    isAdmin: boolean;
    showCustomRoomModal: boolean;
    schedulerOpen: boolean;
    setIsLoggedIn: (status: boolean) => void;
    setUserInfo: (userInfo: User | undefined) => void;
    setIsAdmin: (status: boolean) => void;
    setShowCustomRoomModal: (status: boolean) => void;
    toggleSchedulerOpen: () => void;
}

const InitialAppContext: AppContext = {
    isLoggedIn: false,
    userInfo: undefined,
    isAdmin: false,
    showCustomRoomModal: false,
    schedulerOpen: false,
    setIsLoggedIn: () => {},
    setUserInfo: () => {},
    setIsAdmin: () => {},
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
    };
    const socketRef = useRef<Socket | undefined>();
    const userStream = useRef<HTMLVideoElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        API_ENDPOINT === "http://localhost:5000" ? true : false
    );
    const [userInfo, setUserInfo] = useState<User | undefined>(
        API_ENDPOINT === "http://localhost:5000" ? initialUser : undefined
    );
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
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
        isAdmin,
        showCustomRoomModal,
        schedulerOpen,
        userStream,
        setIsLoggedIn,
        setUserInfo,
        setIsAdmin,
        setShowCustomRoomModal,
        toggleSchedulerOpen,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
