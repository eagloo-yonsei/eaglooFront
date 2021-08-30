import React, {
    createContext,
    useContext,
    RefObject,
    useRef,
    useState,
    useEffect,
} from "react";
import axios from "axios";
import { useAppContext } from "../../../../Routes/App/AppProvider";
import { useRoomContext } from "../../RoomProvider";
import {
    ChildrenProp,
    SocketChannel,
    ChattingContent,
    API_ENDPOINT,
} from "../../../../Constants";
import { toastErrorMessage } from "../../../../Utils";

interface RoomChattingContextProp {
    chattingInput: string;
    chattings: ChattingContent[];
    chatSending: boolean;
    setChattingInput: (content: string) => void;
    setChattings: (chatting: ChattingContent[]) => void;
    sendChatting: () => void;
    updateChatting: (newChatting: ChattingContent) => void;
    scrollerRef?: RefObject<HTMLDivElement>;
    chattingInputRef?: RefObject<HTMLInputElement>;
}

const InitialRoomChattingContext = {
    chattingInput: "",
    chattings: [],
    chatSending: false,
    setChattingInput: () => {},
    setChattings: () => {},
    sendChatting: () => {},
    updateChatting: () => {},
};

const RoomChattingContext = createContext<RoomChattingContextProp>(
    InitialRoomChattingContext
);
export const useRoomChattingContext = () => useContext(RoomChattingContext);

export default function RoomChattingProvider({ children }: ChildrenProp) {
    const { socketRef, userInfo } = useAppContext();
    const { roomId, userSeatNo, chattingOpen } = useRoomContext();
    const [chattingInput, setChattingInput] = useState<string>("");
    const [chattings, setChattings] = useState<ChattingContent[]>([]);
    const [chatSending, setChatSending] = useState<boolean>(false);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const chattingInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        socketRef?.current?.on(
            SocketChannel.RECEIVE_CHATTING,
            (payload: { chattingContent: ChattingContent }) => {
                updateChatting(payload.chattingContent);
            }
        );
        return () => {
            socketRef?.current?.off(SocketChannel.RECEIVE_CHATTING);
        };
    }, []);

    async function sendChatting() {
        if (chatSending || chattingInput === "") {
            return;
        }
        setChatSending(true);
        const newChattingContent: ChattingContent = {
            user: userInfo ? userInfo : undefined,
            content: chattingInput,
            writtenTime: timeConvert(new Date()),
            key: new Date().getTime(),
        };
        await axios
            .post<{ success: boolean }>(`${API_ENDPOINT}/api/room/chat`, {
                roomId: roomId,
                userSeatNo: userSeatNo,
                chattingContent: newChattingContent,
            })
            .then((response) => {
                if (response.data.success) {
                    updateChatting(newChattingContent);
                    setChattingInput("");
                } else {
                    toastErrorMessage("채팅 전송에 실패했습니다.");
                }
            })
            .catch((error) => {
                console.error(error);
                toastErrorMessage("채팅 전송에 실패했습니다.");
            })
            .finally(() => {
                setChatSending(false);
                chattingInputRef?.current?.focus();
                if (chattingOpen) {
                    scrollerRef?.current?.scrollIntoView({
                        behavior: "smooth",
                    });
                }
                return;
            });
    }

    function timeConvert(rawTime: Date): string {
        const hour =
            rawTime.getHours() >= 10
                ? rawTime.getHours()
                : `0${rawTime.getHours()}`;
        const minute =
            rawTime.getMinutes() >= 10
                ? rawTime.getMinutes()
                : `0${rawTime.getMinutes()}`;
        return `${hour}:${minute}`;
    }

    function updateChatting(newChatting: ChattingContent) {
        // NOTE (!#useState)
        // 단순히 setChattings([...chattings, newChatting]) 으로 하면 안 됨
        // 위의 방식 console을 찍어보면 기존 chatting이 제대로 가져와지지 않음
        setChattings((chattings) => [...chattings, newChatting]);
        if (chattingOpen) {
            scrollerRef?.current?.scrollIntoView({ behavior: "smooth" });
        }
        return;
    }

    const roomChattingContext = {
        chattingInput,
        chattings,
        chatSending,
        setChattingInput,
        setChattings,
        sendChatting,
        updateChatting,
        scrollerRef,
        chattingInputRef,
    };

    return (
        <RoomChattingContext.Provider value={roomChattingContext}>
            {children}
        </RoomChattingContext.Provider>
    );
}
