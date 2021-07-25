export const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:5000";

export const headerLessPages = ["/login", "/room"];

export enum Channel {
    JOIN = "JOIN",
    DISCONNECT = "DISCONNECT",
    GET_CURRENT_ROOM = "GET_CURRENT_ROOM",
    JOIN_ROOM = "JOIN_ROOM",
    NEW_USER = "NEW_USER",
    RECEIVING_SIGNAL = "RECEIVING_SIGNAL",
    SENDING_SIGNAL = "SENDING_SIGNAL",
    RETURNING_SIGNAL = "RETURNING_SIGNAL",
}

export interface Seat {
    seatNo: number;
    socketId: string;
    userName?: string;
}

export interface Room {
    roomNo: number;
    seats: Seat[];
}
