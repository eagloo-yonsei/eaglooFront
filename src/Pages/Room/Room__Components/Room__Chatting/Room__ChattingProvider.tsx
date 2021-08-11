import React, {
    createContext,
    useContext,
    RefObject,
    useRef,
    useState,
} from "react";
import axios from "axios";
import { useAppContext } from "../../../../Routes/App/AppProvider";
import { useRoomContext } from "../../RoomProvider";
import {
    ChildrenProp,
    ChattingContent,
    API_ENDPOINT,
    RoomType,
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
    const { userInfo } = useAppContext();
    const { roomType, roomId, userSeatNo, chattingOpen } = useRoomContext();
    const [chattingInput, setChattingInput] = useState<string>("");
    const [chattings, setChattings] = useState<ChattingContent[]>([]);
    const [chatSending, setChatSending] = useState<boolean>(false);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const chattingInputRef = useRef<HTMLInputElement>(null);

    async function sendChatting() {
        if (chatSending || chattingInput === "") {
            return;
        }
        // TODO? BUG? (code clearance) Date 형식으로 넘겨준 시간이 서버를 거치면 string 형태가 됨
        setChatSending(true);
        const newChattingContent: ChattingContent = {
            user: userInfo ? userInfo : undefined,
            content: chattingInput,
            writtenTime: timeConvert(new Date()),
            key: new Date().getTime(),
        };
        await axios
            .post<{ success: boolean }>(
                roomType === RoomType.PUBLIC
                    ? `${API_ENDPOINT}/api/room/chat`
                    : `${API_ENDPOINT}/api/customroom/chat`,
                {
                    roomId: roomId,
                    userSeatNo: userSeatNo,
                    chattingContent: newChattingContent,
                }
            )
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
        // NOTE (!#socket !#useEffect !#context)
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
