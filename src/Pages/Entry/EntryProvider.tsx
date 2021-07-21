import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Location } from "history";
import axios from "axios";
import { API_ENDPOINT } from "../../Constants";

interface AppProp {
    children: JSX.Element;
}

interface LocationStateProp {
    roomNo: number;
}

interface EnterRoomResponse {
    success: boolean;
}

interface EntryProp {
    roomNo: number;
    selectedSeat: number;
    selectSeat: (seatNo: number) => void;
    enterRoom: (roomNo: number, seatNo: number) => void;
}

const InitialEntryContext: EntryProp = {
    roomNo: 0,
    selectedSeat: 0,
    selectSeat: () => {},
    enterRoom: () => {},
};

const EntryContext = createContext<EntryProp>(InitialEntryContext);
export const useEntryContext = () => useContext(EntryContext);

export default function EntryProvider({ children }: AppProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const [roomNo, setRoomNo] = useState<number>(0);
    const [selectedSeat, setSelectedSeat] = useState<number>(0);

    function selectSeat(seatNo: number) {
        if (seatNo === selectedSeat) {
            setSelectedSeat(0);
        } else {
            setSelectedSeat(seatNo);
        }
        return;
    }

    function enterRoom(roomNo: number, seatNo: number) {
        history.push({
            pathname: "/room",
            state: {
                roomNo: roomNo,
                seatNo: seatNo,
            },
        });
        // axios.post(`${API_ENDPOINT}/room/${roomNo}/position/${seatNo}`)
        // .then(function ({data}:EnterRoomResponse){
        //     if(data.success)
        // })
    }

    useEffect(() => {
        // 엔트리 입장시 roomNo prop을 받고 온 게 아니면 /list로 push
        const state = location.state as LocationStateProp;
        if (state !== undefined) {
            setRoomNo(state.roomNo);
        } else {
            history.push("/list");
        }

        return () => {};
    }, []);

    const entryContext = {
        roomNo,
        selectedSeat,
        selectSeat,
        enterRoom,
    };

    return (
        <EntryContext.Provider value={entryContext}>
            {children}
        </EntryContext.Provider>
    );
}
