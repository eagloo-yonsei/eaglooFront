import React, {
    createContext,
    RefObject,
    useContext,
    useRef,
    useState,
} from "react";
import { ChildrenProp, User } from "../../Constants";

interface AppContext {
    isLoggedIn: boolean;
    userInfo: User | undefined;
    isAdmin: boolean;
    showCustomRoomModal: boolean;
    schedulerOpen: boolean;
    userStream?: RefObject<HTMLVideoElement>;
    token?: string;
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
        id: "11451278-98e7-49b3-a4a0-279ca6e03574",
        email: "dennis2311",
        nickName: "봄낙엽",
    };
    const userStream = useRef<HTMLVideoElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
    // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    // const [userInfo, setUserInfo] = useState<User | undefined>(initialUser);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [showCustomRoomModal, setShowCustomRoomModal] =
        useState<boolean>(false);
    const [schedulerOpen, setSchedulerOpen] = useState<boolean>(false);

    function toggleSchedulerOpen() {
        setSchedulerOpen(!schedulerOpen);
        console.log("do push to main");
    }

    const appContext = {
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
