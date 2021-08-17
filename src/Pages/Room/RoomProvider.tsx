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
import io, { Socket } from "socket.io-client";
import {
    RoomType,
    Room,
    CustomRoom,
    PeerStateProp,
    PeerRefProp,
    Channel,
    ChildrenProp,
    API_ENDPOINT,
} from "../../Constants";
import Peer from "simple-peer";

interface RoomLocationStateProp {
    roomType: RoomType;
    roomId: string;
    userSeatNo: number;
}

interface RoomContextProp {
    userStreamRef?: RefObject<HTMLVideoElement>;
    socketRef?: RefObject<Socket | undefined>;
    peersRef?: RefObject<PeerRefProp[]>;
    peersState: PeerStateProp[];
    roomType: RoomType;
    roomId: string;
    roomInfo: Room | CustomRoom;
    userSeatNo: number;
    chattingOpen: boolean;
    setPeersState: (peersState: PeerStateProp[]) => void;
    createPeer: (
        userToSignal: string,
        callerId: string,
        callerSeatNo: number,
        stream: MediaStream
    ) => Peer.Instance;
    addPeer: (
        incomingSignal: Peer.SignalData,
        callerId: string,
        stream: MediaStream
    ) => Peer.Instance;
    toggleChattingOpen: () => void;
    stopSelfStream: () => void;
    exitToList: () => void;
}

const InitialRoomContext: RoomContextProp = {
    peersState: [],
    roomType: RoomType.PUBLIC,
    roomId: "",
    roomInfo: {
        id: "",
        roomName: "",
        seats: [],
    },
    userSeatNo: 0,
    chattingOpen: false,
    setPeersState: () => {},
    createPeer: () => new Peer(),
    addPeer: () => new Peer(),
    toggleChattingOpen: () => {},
    stopSelfStream: () => {},
    exitToList: () => {},
};

const RoomContext = createContext<RoomContextProp>(InitialRoomContext);
export const useRoomContext = () => useContext(RoomContext);

export default function RoomProvider({ children }: ChildrenProp) {
    const history = useHistory();
    const location = useLocation<Location | unknown>();
    const userStreamRef = useRef<HTMLVideoElement>(null);
    const socketRef = useRef<Socket | undefined>();
    const peersRef = useRef<PeerRefProp[]>([]);
    const [peersState, setPeersState] = useState<PeerStateProp[]>([]);
    const [roomType, setRoomType] = useState<RoomType>(RoomType.PUBLIC);
    const [roomId, setRoomId] = useState<string>("");
    const [roomInfo, setRoomInfo] = useState<Room | CustomRoom>({
        id: "",
        roomName: "",
        seats: [],
    });
    const [userSeatNo, setUserSeatNo] = useState<number>(0);
    const [chattingOpen, setChattingOpen] = useState<boolean>(false);

    useEffect(() => {
        // 엔트리 입장시 roomId prop을 받고 온 게 아니면 /list로 push
        const state = location.state as RoomLocationStateProp;
        if (state !== undefined) {
            setRoomType(state.roomType);
            setRoomId(state.roomId);
            setUserSeatNo(state.userSeatNo);
            getRoomInfo(state.roomType, state.roomId);
        } else {
            history.push("/list");
        }

        socketRef.current = io(
            state.roomType === RoomType.PUBLIC
                ? `${API_ENDPOINT}/publicroom`
                : `${API_ENDPOINT}/customroom`
        );

        return () => {};
    }, []);

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

    function toggleChattingOpen() {
        setChattingOpen(!chattingOpen);
    }

    /* 자신이 방에 들어왔을 때 기존 참여자들과의 Connection 설정 */
    function createPeer(
        userToSignal: string, // 기존 참여자 socket ID
        callerId: string, // 본인 socket ID
        callerSeatNo: number, // 본인 seatNo
        stream: MediaStream // 본인 stream
    ) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", (signal: Peer.SignalData) => {
            /* 3. 기존 사용자에게 연결 요청 */
            // console.log(`${userToSignal}에게 연결 요청`);
            socketRef?.current?.emit(Channel.SENDING_SIGNAL, {
                userToSignal,
                callerId,
                callerSeatNo,
                signal,
            });
        });
        return peer;
    }

    function addPeer(
        incomingSignal: Peer.SignalData,
        callerId: string, // 신규 참여자 socket ID
        stream: MediaStream
    ) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        /* 5. 연결 요청 수락 */
        peer.on("signal", (signal: Peer.SignalData) => {
            socketRef?.current?.emit(Channel.RETURNING_SIGNAL, {
                signal,
                callerId,
            });
        });
        peer.signal(incomingSignal);
        return peer;
    }

    function stopSelfStream() {
        const selfStream = userStreamRef?.current?.srcObject as MediaStream;
        const tracks = selfStream?.getTracks();
        if (tracks) {
            tracks.forEach((track) => {
                track.stop();
            });
        }
    }

    function exitToList() {
        history.push("/list");
    }

    const roomContext = {
        userStreamRef,
        socketRef,
        peersRef,
        peersState,
        roomType,
        roomId,
        roomInfo,
        userSeatNo,
        chattingOpen,
        setPeersState,
        createPeer,
        addPeer,
        toggleChattingOpen,
        stopSelfStream,
        exitToList,
    };

    return (
        <RoomContext.Provider value={roomContext}>
            {children}
        </RoomContext.Provider>
    );
}
