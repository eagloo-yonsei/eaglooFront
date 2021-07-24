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
    userName?: string | undefined;
    setUserName: (userName: string) => void;
    isAdmin: boolean;
    setIsAdmin: (status: boolean) => void;
    userStream?: RefObject<HTMLVideoElement>;
    getUserStream: () => boolean;
    token?: string;
}

const InitialAppContext: AppContext = {
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    setUserName: () => {},
    isAdmin: false,
    setIsAdmin: () => {},
    getUserStream: () => false,
};

const AppContext = createContext<AppContext>(InitialAppContext);
export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: AppProp) {
    const userStream = useRef<HTMLVideoElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
        userName,
        setUserName,
        isAdmin,
        setIsAdmin,
        userStream,
        getUserStream,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
