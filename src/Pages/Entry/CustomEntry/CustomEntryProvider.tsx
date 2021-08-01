import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import axios from "axios";
import { ChildrenProp, CustomRoom, API_ENDPOINT } from "../../../Constants";
import { toastErrorMessage } from "../../../Utils";

interface LocationStateProp {
    roomId: string;
}

interface CustomEntryProp {
    occupiedSeatNums: number[];
    roomInfo: CustomRoom;
    selectedSeatNo: number;
    selectSeat: (seatNo: number) => void;
    checkVacancy: (roomId: string, seatNo: number) => Promise<boolean>;
    enterRoom: (roomId: string, seatNo: number) => void;
}

const InitialCustomEntryContext: CustomEntryProp = {
    occupiedSeatNums: [],
    roomInfo: {
        id: "",
        roomName: "",
        roomDescription: "",
        ownerId: "",
        openToPublic: true,
        usePassword: false,
        password: "",
        enableMic: false,
        seats: [],
    },
    selectedSeatNo: 0,
    selectSeat: () => {},
    checkVacancy: () => {
        return new Promise(() => false);
    },
    enterRoom: () => {},
};

const CustomEntryContext = createContext<CustomEntryProp>(
    InitialCustomEntryContext
);
export const useCustomEntryContext = () => useContext(CustomEntryContext);

export default function CustomEntryProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const [roomInfo, setRoomInfo] = useState<CustomRoom>({
        id: "",
        roomName: "",
        roomDescription: "",
        ownerId: "",
        openToPublic: true,
        usePassword: false,
        password: "",
        enableMic: false,
        seats: [],
    });
    const [occupiedSeatNums, setOccupiedSeatNums] = useState<number[]>([]);
    const [selectedSeatNo, setSelectedSeatNo] = useState<number>(0);

    useEffect(() => {
        // 엔트리 입장시 roomId prop을 받고 온 게 아니면 /list로 push
        const state = location.state as LocationStateProp;
        if (state !== undefined) {
            getRoomInfo(state.roomId);
        } else {
            history.push("/list");
        }

        return () => {};
    }, []);

    async function getRoomInfo(roomId: string) {
        await axios
            .get<CustomRoom>(`${API_ENDPOINT}/api/customroom/${roomId}`)
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

    async function checkVacancy(roomId: string, seatNo: number) {
        const response = await axios.post<{ success: boolean; type?: number }>(
            `${API_ENDPOINT}/api/customroom/${roomId}/seat/${seatNo}`
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

    function enterRoom(roomId: string, seatNo: number) {
        history.push({
            pathname: "/room__custom",
            state: {
                roomId: roomId,
                userSeatNo: seatNo,
            },
        });
    }

    const customEntryContext = {
        occupiedSeatNums,
        roomInfo,
        selectedSeatNo,
        selectSeat,
        checkVacancy,
        enterRoom,
    };

    return (
        <CustomEntryContext.Provider value={customEntryContext}>
            {children}
        </CustomEntryContext.Provider>
    );
}
