import React, {
    createContext,
    RefObject,
    useContext,
    useRef,
    useState,
} from "react";
import { ChildrenProp } from "../../Constants";

interface AppContext {
    isLoggedIn: boolean;
    userEmail: string | undefined;
    userId: string | undefined;
    isAdmin: boolean;
    showCustomRoomModal: boolean;
    userStream?: RefObject<HTMLVideoElement>;
    token?: string;
    setIsLoggedIn: (status: boolean) => void;
    setUserEmail: (userName: string | undefined) => void;
    setUserId: (userName: string | undefined) => void;
    setIsAdmin: (status: boolean) => void;
    setShowCustomRoomModal: (status: boolean) => void;
    getUserStream: () => boolean;
}

const InitialAppContext: AppContext = {
    isLoggedIn: false,
    userEmail: undefined,
    userId: undefined,
    isAdmin: false,
    showCustomRoomModal: false,
    setIsLoggedIn: () => {},
    setUserEmail: () => {},
    setUserId: () => {},
    setIsAdmin: () => {},
    setShowCustomRoomModal: () => {},
    getUserStream: () => false,
};

const AppContext = createContext<AppContext>(InitialAppContext);
export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: ChildrenProp) {
    const userStream = useRef<HTMLVideoElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
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
        userEmail,
        userId,
        isAdmin,
        showCustomRoomModal,
        userStream,
        setIsLoggedIn,
        setUserEmail,
        setUserId,
        setIsAdmin,
        setShowCustomRoomModal,
        getUserStream,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
