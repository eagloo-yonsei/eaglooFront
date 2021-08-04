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
    occupiedSeatNums: number[];
    camAccepted: boolean;
    userStreamRef?: RefObject<HTMLVideoElement>;
    selectSeat: (seatNo: number) => void;
    checkVacancy: (
        roomType: RoomType,
        roomId: string,
        seatNo: number
    ) => Promise<boolean>;
    enterRoom: (roomType: RoomType, roomId: string, seatNo: number) => void;
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
    occupiedSeatNums: [],
    camAccepted: false,
    selectSeat: () => {},
    checkVacancy: () => {
        return new Promise(() => false);
    },
    enterRoom: () => {},
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
    const [occupiedSeatNums, setOccupiedSeatNums] = useState<number[]>([]);
    const [selectedSeatNo, setSelectedSeatNo] = useState<number>(0);

    useEffect(() => {
        // 엔트리 입장시 roomId prop을 받고 온 게 아니면 /list로 push
        const state = location.state as EntryLocationStateProp;
        if (state !== undefined) {
            setRoomType(state.roomType);
            getRoomInfo(state.roomType, state.roomId);

            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                })
                .then((stream) => {
                    userStreamRef.current!.srcObject = stream;
                    setCamAccepted(true);
                });
        } else {
            history.push("/list");
        }

        return () => {};
    }, []);

    async function getRoomInfo(roomType: RoomType, roomId: string) {
        await axios
            .get<Room | CustomRoom>(
                roomType === RoomType.PUBLIC
                    ? `${API_ENDPOINT}/api/room/${roomId}`
                    : `${API_ENDPOINT}/api/customroom/${roomId}`
            )
            .then((response) => {
                setRoomInfo(response.data);
                const occupiedSeats: number[] = [];
                response.data.seats.forEach((seat) => {
                    occupiedSeats.push(seat.seatNo);
                });
                setOccupiedSeatNums(occupiedSeats);
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

    async function checkVacancy(
        roomType: RoomType,
        roomId: string,
        seatNo: number
    ) {
        const response = await axios.post<{ success: boolean; type?: number }>(
            roomType === RoomType.PUBLIC
                ? `${API_ENDPOINT}/api/room/${roomId}/seat/${seatNo}`
                : `${API_ENDPOINT}/api/customroom/${roomId}/seat/${seatNo}`
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

    function enterRoom(roomType: RoomType, roomId: string, seatNo: number) {
        stopSelfStream();
        history.push({
            pathname: "/room",
            state: {
                roomType: roomType,
                roomId: roomId,
                userSeatNo: seatNo,
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
        occupiedSeatNums,
        userStreamRef,
        camAccepted,
        selectSeat,
        checkVacancy,
        enterRoom,
        stopSelfStream,
    };

    return (
        <EntryContext.Provider value={entryContext}>
            {children}
        </EntryContext.Provider>
    );
}
