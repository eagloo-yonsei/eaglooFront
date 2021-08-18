import React, {
    createContext,
    useContext,
    RefObject,
    useRef,
    useState,
    useEffect,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import axios from "axios";
import {
    RoomType,
    Room,
    CustomRoom,
    ChildrenProp,
    API_ENDPOINT,
} from "../../Constants";
import { toastErrorMessage } from "../../Utils";

interface EntryLocationStateProp {
    roomType: RoomType;
    roomId: string;
}

interface EntryContextProp {
    roomType: RoomType;
    roomInfo: Room | CustomRoom;
    selectedSeatNo: number;
    timeToStudy: number;
    camAccepted: boolean;
    userStreamRef?: RefObject<HTMLVideoElement>;
    selectSeat: (seatNo: number) => void;
    decreaseTimeToStudy: () => void;
    increaseTimeToStudy: () => void;
    checkVacancy: () => Promise<boolean>;
    enterRoom: () => void;
    getUserStream: () => void;
    stopSelfStream: () => void;
}

const InitialEntryContext: EntryContextProp = {
    roomType: RoomType.PUBLIC,
    roomInfo: {
        id: "",
        roomName: "",
        seats: [],
    },
    selectedSeatNo: 0,
    timeToStudy: 2,
    camAccepted: false,
    selectSeat: () => {},
    decreaseTimeToStudy: () => {},
    increaseTimeToStudy: () => {},
    checkVacancy: () => {
        return new Promise(() => false);
    },
    enterRoom: () => {},
    getUserStream: () => {},
    stopSelfStream: () => {},
};

const EntryContext = createContext<EntryContextProp>(InitialEntryContext);
export const useEntryContext = () => useContext(EntryContext);

export default function EntryProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const userStreamRef = useRef<HTMLVideoElement>(null);
    const [camAccepted, setCamAccepted] = useState<boolean>(false);
    const [roomType, setRoomType] = useState<RoomType>(RoomType.PUBLIC);
    const [roomInfo, setRoomInfo] = useState<Room | CustomRoom>({
        id: "",
        roomName: "",
        seats: [],
    });
    const [selectedSeatNo, setSelectedSeatNo] = useState<number>(0);
    const [timeToStudy, setTimeToStudy] = useState<number>(2);

    useEffect(() => {
        // 엔트리 입장시 roomId prop을 받고 온 게 아니면 /list로 push
        const state = location.state as EntryLocationStateProp;
        if (state !== undefined) {
            setRoomType(state.roomType);
            getRoomInfo(state.roomType, state.roomId);

            getUserStream();
        } else {
            history.push("/list");
        }

        return () => {};
    }, []);

    function getUserStream() {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                setCamAccepted(true);
                userStreamRef.current!.srcObject = stream;
            });
    }

    async function getRoomInfo(roomType: RoomType, roomId: string) {
        await axios
            .get<Room | CustomRoom>(
                roomType === RoomType.PUBLIC
                    ? `${API_ENDPOINT}/api/publicroom/${roomId}`
                    : `${API_ENDPOINT}/api/customroom/${roomId}`
            )
            .then((response) => {
                setRoomInfo(response.data);
            });
    }

    function selectSeat(seatNo: number) {
        if (seatNo === selectedSeatNo) {
            setSelectedSeatNo(0);
        } else {
            setSelectedSeatNo(seatNo);
        }
        return;
    }

    function decreaseTimeToStudy() {
        if (timeToStudy > 1) {
            setTimeToStudy((timeToStudy) => timeToStudy - 0.5);
        }
    }

    function increaseTimeToStudy() {
        if (timeToStudy < 10) {
            setTimeToStudy((timeToStudy) => timeToStudy + 0.5);
        }
    }

    async function checkVacancy() {
        const response = await axios.post<{ success: boolean; type?: number }>(
            roomType === RoomType.PUBLIC
                ? `${API_ENDPOINT}/api/publicroom/${roomInfo.id}/seat/${selectedSeatNo}`
                : `${API_ENDPOINT}/api/customroom/${roomInfo.id}/seat/${selectedSeatNo}`
        );
        const data: { success: boolean; type?: number } = response.data;
        if (data.success) {
            return true;
        } else {
            if (data.type === 2) {
                toastErrorMessage("사용 중인 자리입니다");
                return false;
            }
            toastErrorMessage("잘못된 요청입니다");
            return false;
        }
    }

    function enterRoom() {
        stopSelfStream();
        history.push({
            pathname: "/room",
            state: {
                roomType: roomType,
                roomId: roomInfo.id,
                userSeatNo: selectedSeatNo,
                endTime: new Date().getTime() + 1000 * 60 * 60 * timeToStudy,
            },
        });
    }

    function stopSelfStream() {
        const selfStream = userStreamRef.current?.srcObject as MediaStream;
        const tracks = selfStream?.getTracks();
        if (tracks) {
            tracks.forEach((track) => {
                track.stop();
            });
        }
    }

    const entryContext = {
        roomType,
        roomInfo,
        selectedSeatNo,
        timeToStudy,
        userStreamRef,
        camAccepted,
        selectSeat,
        decreaseTimeToStudy,
        increaseTimeToStudy,
        checkVacancy,
        enterRoom,
        getUserStream,
        stopSelfStream,
    };

    return (
        <EntryContext.Provider value={entryContext}>
            {children}
        </EntryContext.Provider>
    );
}
