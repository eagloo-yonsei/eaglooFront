import axios from "axios";
import { API_ENDPOINT } from "../Constants";
import { Room } from "../Constants";

export interface PublicRoomResponse {
    data: Room[];
    success: boolean;
    type: number;
}
export async function getAllPublicRooms() {
    await axios
        .get<Room[]>(`${API_ENDPOINT}/api/publicroom`)
        .then((response) => {
            return {
                data: response.data,
                success: true,
                type: 0,
            };
        })
        .catch((error) => {
            console.error(error);
            return {
                data: [],
                success: false,
                type: 1,
            };
        });
}
