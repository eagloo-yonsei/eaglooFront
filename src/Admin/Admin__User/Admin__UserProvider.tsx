import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { SHA3 } from "sha3";
import {
    ChildrenProp,
    User,
    ConnectedUser,
    API_ENDPOINT,
} from "../../Constants";
import { toastErrorMessage, toastSuccessMessage } from "../../Utils";

interface AdminUserContextProp {
    allUser: User[];
    allConnectedUser: ConnectedUser[];
    testerEmailInput: string;
    testerPasswordInput: string;
    creating: boolean;
    getAllUser: () => void;
    getAllConnectedUser: () => void;
    setTesterEmailInput: (input: string) => void;
    setTesterPasswordInput: (input: string) => void;
    createTestUser: () => void;
}

const InitialAdminUserContext: AdminUserContextProp = {
    allUser: [],
    allConnectedUser: [],
    testerEmailInput: "",
    testerPasswordInput: "",
    creating: false,
    getAllUser: () => {},
    getAllConnectedUser: () => {},
    setTesterEmailInput: () => {},
    setTesterPasswordInput: () => {},
    createTestUser: () => {},
};

const AdminUserContext = createContext<AdminUserContextProp>(
    InitialAdminUserContext
);
export const useAdminUserContext = () => useContext(AdminUserContext);

export default function AdminUserProvider({ children }: ChildrenProp) {
    const [allUser, setAllUser] = useState<User[]>([]);
    const [allConnectedUser, setAllConnectedUser] = useState<ConnectedUser[]>(
        []
    );
    const hashedPassword = new SHA3(512);
    const [testerEmailInput, setTesterEmailInput] = useState<string>("");
    const [testerPasswordInput, setTesterPasswordInput] = useState<string>("");
    const [creating, setCreating] = useState<boolean>(false);

    useEffect(() => {
        getAllUser();
        getAllConnectedUser();
        return () => {};
    }, []);

    async function getAllUser() {
        await axios
            .get<{ success: boolean; allUser: User[] }>(
                `${API_ENDPOINT}/api/user`
            )
            .then((response) => {
                if (response.data.success) {
                    setAllUser(response.data.allUser);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function getAllConnectedUser() {
        await axios
            .get<ConnectedUser[]>(`${API_ENDPOINT}/api/user/connected`)
            .then((response) => {
                setAllConnectedUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function createTestUser() {
        setCreating(true);
        hashedPassword.reset();
        hashedPassword.update(testerPasswordInput);
        await axios
            .post<{ success: boolean; message: string }>(
                `${API_ENDPOINT}/api/user/createTestUser`,
                {
                    email: testerEmailInput,
                    password: hashedPassword.digest("hex"),
                }
            )
            .then((response) => {
                if (response.data.success) {
                    toastSuccessMessage(response.data.message);
                    setTesterEmailInput("");
                    setTesterPasswordInput("");
                } else {
                    toastErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                toastErrorMessage("테스트 유저 생성 중 오류가 발생했습니다.");
            });
        setCreating(false);
    }

    const adminUserContext = {
        allUser,
        allConnectedUser,
        testerEmailInput,
        testerPasswordInput,
        creating,
        getAllUser,
        getAllConnectedUser,
        setTesterEmailInput,
        setTesterPasswordInput,
        createTestUser,
    };

    return (
        <AdminUserContext.Provider value={adminUserContext}>
            {children}
        </AdminUserContext.Provider>
    );
}
