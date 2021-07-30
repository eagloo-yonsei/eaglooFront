export interface Seat {
    seatNo: number;
    socketId: string;
    userName?: string;
}

export interface Room {
    roomNo: number;
    seats: Seat[];
}

export interface CustomRoom {
    id: string;
    roomName: string;
    roomDescription: string;
    ownerId: string;
    openToPublic: boolean;
    usePassword: boolean;
    password: string;
    enableMic: boolean;
    seats: Seat[];
}

export enum RoomType {
    PUBLIC = "PUBLIC",
    CUSTOM = "CUSTOM",
}
