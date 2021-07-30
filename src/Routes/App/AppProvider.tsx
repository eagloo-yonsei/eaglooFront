import React, {
    createContext,
    RefObject,
    useContext,
    useRef,
    useState,
} from "react";

interface AppProp {
    children: JSX.Element;
}

interface AppContext {
    isLoggedIn: boolean;
    setIsLoggedIn: (status: boolean) => void;
    userEmail: string | undefined;
    setUserEmail: (userName: string | undefined) => void;
    userId: string | undefined;
    setUserId: (userName: string | undefined) => void;
    isAdmin: boolean;
    setIsAdmin: (status: boolean) => void;
    showCustomRoomModal: boolean;
    setShowCustomRoomModal: (status: boolean) => void;
    userStream?: RefObject<HTMLVideoElement>;
    getUserStream: () => boolean;
    token?: string;
}

const InitialAppContext: AppContext = {
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    userEmail: undefined,
    setUserEmail: () => {},
    userId: undefined,
    setUserId: () => {},
    isAdmin: false,
    setIsAdmin: () => {},
    showCustomRoomModal: false,
    setShowCustomRoomModal: () => {},
    getUserStream: () => false,
};

const AppContext = createContext<AppContext>(InitialAppContext);
export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: AppProp) {
    const userStream = useRef<HTMLVideoElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [showCustomRoomModal, setShowCustomRoomModal] =
        useState<boolean>(false);

    function getUserStream() {
        // let result: boolean = false;
        // navigator.mediaDevices
        //     .getUserMedia({ video: true })
        //     .then((stream) => {
        //         userStream.current!.srcObject = stream;
        //         result = true;
        //     })
        //     .catch(() => {
        //         result = false;
        //     });
        // return result;
        return false;
    }

    function stopUserStream() {}

    const appContext = {
        isLoggedIn,
        setIsLoggedIn,
        userEmail,
        setUserEmail,
        userId,
        setUserId,
        isAdmin,
        setIsAdmin,
        showCustomRoomModal,
        setShowCustomRoomModal,
        userStream,
        getUserStream,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
