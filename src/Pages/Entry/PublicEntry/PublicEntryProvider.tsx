import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import axios from "axios";
import { Room, API_ENDPOINT } from "../../../Constants";
import { toastErrorMessage } from "../../../Utils";

interface AppProp {
    children: JSX.Element;
}

interface LocationStateProp {
    roomNo: number;
}

interface PublicEntryProp {
    occupiedSeatNums: number[];
    roomNo: number;
    selectedSeatNo: number;
    selectSeat: (seatNo: number) => void;
    checkVacancy: (roomNo: number, seatNo: number) => Promise<boolean>;
    enterRoom: (roomNo: number, seatNo: number) => void;
}

const InitialPublicEntryContext: PublicEntryProp = {
    occupiedSeatNums: [],
    roomNo: 0,
    selectedSeatNo: 0,
    selectSeat: () => {},
    checkVacancy: () => {
        return new Promise(() => false);
    },
    enterRoom: () => {},
};

const PublicEntryContext = createContext<PublicEntryProp>(
    InitialPublicEntryContext
);
export const usePublicEntryContext = () => useContext(PublicEntryContext);

export default function PublicEntryProvider({ children }: AppProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const [roomNo, setRoomNo] = useState<number>(0);
    const [occupiedSeatNums, setOccupiedSeatNums] = useState<number[]>([]);
    const [selectedSeatNo, setSelectedSeatNo] = useState<number>(0);

    useEffect(() => {
        // 엔트리 입장시 roomNo prop을 받고 온 게 아니면 /list로 push
        const state = location.state as LocationStateProp;
        if (state !== undefined) {
            setRoomNo(state.roomNo);
        } else {
            history.push("/list");
        }
        getRoom(state.roomNo);

        return () => {};
    }, []);

    async function getRoom(roomNo: number) {
        await axios
            .get<Room>(`${API_ENDPOINT}/api/room/${roomNo}`)
            .then((response) => {
                const occupiedSeats: number[] = [];
                response.data.seats.forEach((seat) => {
                    occupiedSeats.push(seat.seatNo);
                });
                // console.log(occupiedSeats);
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

    async function checkVacancy(roomNo: number, seatNo: number) {
        const response = await axios.post<{ success: boolean; type?: number }>(
            `${API_ENDPOINT}/api/room/${roomNo}/seat/${seatNo}`
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

    function enterRoom(roomNo: number, seatNo: number) {
        history.push({
            pathname: "/room__public",
            state: {
                roomNo: roomNo,
                userSeatNo: seatNo,
            },
        });
    }

    const publicEntryContext = {
        occupiedSeatNums,
        roomNo,
        selectedSeatNo,
        selectSeat,
        checkVacancy,
        enterRoom,
    };

    return (
        <PublicEntryContext.Provider value={publicEntryContext}>
            {children}
        </PublicEntryContext.Provider>
    );
}
