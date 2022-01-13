import Peer from "simple-peer";

// 모든 Provider 공통
export interface ChildrenProp {
    children: JSX.Element;
}

export interface User {
    id: string;
    email: string;
    nickName?: string;
    realName?: string;
    isAdmin: boolean;
    owningRooms: CustomRoom[];
}

// 민감한 정보는 제외한 유저 정보
export interface MinimalUser {
    id: string;
    email: string;
    nickName?: string;
}

// 현재 접속한 유저 property. 관리자 페이지에서 활용
export interface ConnectedUser {
    socketId: string;
    userInfo: MinimalUser;
    roomId?: string;
    seatNo?: number;
}

export interface RoomUsingInfo {
    roomType: RoomType;
    roomId: string;
    roomName: string;
    seatNo: number;
    endTime: number;
}

export interface Task {
    id: string;
    content: string;
    importance: number;
    done: boolean;
}

export interface Feedback {
    // TODO (code clearance) 피드백 작성자 이름을 user가 아니라 email로..
    id: string;
    user: string;
    content: string;
    category: FeedbackCategory;
}

export enum FeedbackCategory {
    GENERAL = "GENERAL",
    BUG = "BUG",
    SUGGESTION = "SUGGESTION",
    ENHANCEMENT = "ENHANCEMENT",
}

// 방 종류 : List, Entry, Room 에서 모두 사용
export enum RoomType {
    PUBLIC = "PUBLIC",
    CUSTOM = "CUSTOM",
}

// 방에서 사용하는 simple-peer 라이브러리 prop
export interface PeerStateProp {
    peer: Peer.Instance | undefined;
    seatInfo: Seat;
}

export interface PeerRefProp {
    peer: Peer.Instance | undefined;
    seatInfo: Seat;
}

// Seat 속성을 변경하는 경우 RoomProvider의 JOIN_ROOM 과 creatPeer() 부분도 같이 수정
export interface Seat {
    seatNo: number;
    socketId: string;
    userEmail: string;
    userNickName?: string;
    endTime: number;
    streamState: {
        video: boolean;
        audio: boolean;
    };
}

export interface Room {
    id: string;
    roomName: string;
    roomDescription?: string;
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
    allowMic: boolean;
    seats: Seat[];
}

export interface ChattingContent {
    user: User | undefined;
    content: string;
    writtenTime: string;
    key: number;
}

export interface PreviewPost {
    id: string;
    category: string;
    title: string;
    contents: string;
    authorId: string;
    roomId: string;
    postlikes: PostLike[];
    postScraps: PostScrap[];
    postComments: PostComment[];
    createdAt: string;
    updatedAt: string;
}

export interface Post {
    id: string;
    category: PostCategory;
    title: string;
    contents: string;
    authorId: string;
    roomId: string;
    postlikes: PostLike[];
    postScraps: PostScrap[];
    postComments: PostComment[];
    createdAt: Date;
    updatedAt: Date;
}

export enum PostFilter {
    ALL = "ALL",
    QUESTION = "QUESTION",
    CHAT = "CHAT",
    MINE = "MINE",
}

export enum PostCategory {
    QUESTION = "QUESTION",
    CHAT = "CHAT",
}

export interface PostLike {
    id: string;
    postId: string;
    userId: string;
}

export interface PostScrap {
    id: string;
    postId: string;
    userId: string;
}

export interface PostComment {
    id: string;
    postId: string;
    userId: string;
    userName: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}
