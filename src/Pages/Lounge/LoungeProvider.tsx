import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useHistory } from "react-router";
import { useAppContext } from "../../Routes/App/AppProvider";
import { ChildrenProp, SocketChannel } from "../../Constants";

interface LoungeContext {
    comeBackRoom: () => void;
}

const InitialLoungeContext: LoungeContext = {
    comeBackRoom: () => {},
};

const LoungeContext = createContext<LoungeContext>(InitialLoungeContext);
export const useLoungeContext = () => useContext(LoungeContext);

export default function LoungeProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const { socketRef, roomUsingInfo } = useAppContext();
    const quitToGoBack = useRef<boolean>(false);

    useEffect(() => {
        return () => {
            if (quitToGoBack.current) {
                console.log("lounge debug1");
                socketRef?.current?.emit(SocketChannel.COME_BACK_ROOM, {
                    roomId: roomUsingInfo?.roomId,
                    seatNo: roomUsingInfo?.seatNo,
                });
            } else {
                console.log("lounge debug2");
                socketRef?.current?.emit(SocketChannel.QUIT_ROOM, {
                    roomId: roomUsingInfo?.roomId,
                    seatNo: roomUsingInfo?.seatNo,
                });
            }
        };
    }, []);

    function comeBackRoom() {
        quitToGoBack.current = true;
        history.push("/room");
    }

    const loungeContext = {
        comeBackRoom,
    };

    return (
        <LoungeContext.Provider value={loungeContext}>
            {children}
        </LoungeContext.Provider>
    );
}
