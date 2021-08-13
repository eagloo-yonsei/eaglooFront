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
        id: "40a20233-d5a9-45c8-bd1d-8bea13befa0f",
        email: "sample",
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
