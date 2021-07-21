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
    isAdmin: boolean;
    setIsAdmin: (status: boolean) => void;
    userStream?: RefObject<HTMLVideoElement>;
    getUserStream: () => void;
    token?: string;
}

const InitialAppContext: AppContext = {
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    isAdmin: false,
    setIsAdmin: () => {},
    getUserStream: () => {},
};

const AppContext = createContext<AppContext>(InitialAppContext);
export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: AppProp) {
    const userStream = useRef<HTMLVideoElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    function getUserStream() {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => (userStream.current!.srcObject = stream));
    }

    function stopUserStream() {}

    const appContext = {
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin,
        userStream,
        getUserStream,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
