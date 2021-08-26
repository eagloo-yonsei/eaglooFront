import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ChildrenProp, Room, CustomRoom, API_ENDPOINT } from "../../Constants";
import { toastErrorMessage, toastInfoMessage } from "../../Utils";

interface AdminRoomContextProp {
    allRoom: (Room | CustomRoom)[];
    allActiveRoom: (Room | CustomRoom)[];
    getAllRoom: () => void;
    exileUser: (roomId: string, seatNo: number) => Promise<boolean>;
}

const InitialAdminRoomContext: AdminRoomContextProp = {
    allRoom: [],
    allActiveRoom: [],
    getAllRoom: () => {},
    exileUser: () => {
        return new Promise(() => false);
    },
};

const AdminRoomContext = createContext<AdminRoomContextProp>(
    InitialAdminRoomContext
);
export const useAdminRoomContext = () => useContext(AdminRoomContext);

export default function AdminRoomProvider({ children }: ChildrenProp) {
    const [allRoom, setAllRoom] = useState<(Room | CustomRoom)[]>([]);
    const [allActiveRoom, setAllActiveRoom] = useState<(Room | CustomRoom)[]>(
        []
    );

    useEffect(() => {
        getAllRoom();
        return () => {};
    }, []);

    async function getAllRoom() {
        await axios
            .get<(Room | CustomRoom)[]>(`${API_ENDPOINT}/api/room`)
            .then((response) => {
                const activeRooms: (Room | CustomRoom)[] = [];
                response.data.forEach((room) => {
                    if (room.seats.length > 0) {
                        activeRooms.push(room);
                    }
                });
                setAllRoom(response.data);
                setAllActiveRoom(activeRooms);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function exileUser(roomId: string, seatNo: number) {
        const response = await axios
            .post<{ success: boolean; message: string }>(
                `${API_ENDPOINT}/api/room/exile`,
                {
                    roomId,
                    seatNo,
                    message: "관리자에 의해 퇴출되었습니다.",
                }
            )
            .catch((error) => {
                console.error(error);
                return {
                    data: {
                        success: false,
                        message: "유저 퇴출 중 오류가 발생하였습니다.",
                    },
                };
            });

        if (response.data.success) {
            toastInfoMessage(response.data.message);
        } else {
            toastErrorMessage(response.data.message);
        }

        console.dir(response.data);

        return response.data.success;
    }

    const adminRoomContext = {
        allRoom,
        allActiveRoom,
        getAllRoom,
        exileUser,
    };

    return (
        <AdminRoomContext.Provider value={adminRoomContext}>
            {children}
        </AdminRoomContext.Provider>
    );
}
