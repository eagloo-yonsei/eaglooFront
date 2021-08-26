import React from "react";
import styled from "styled-components";
import { useAdminUserContext } from "../Admin__UserProvider";
import { User } from "../../../Constants";

export default function AdminUserAllUser() {
    const { allUser } = useAdminUserContext();

    return (
        <>
            <UserDataHeader />
            {allUser.map((user, index) => {
                return (
                    <UserDataRow
                        userInfo={user}
                        index={index}
                        key={`${user.id}`}
                    />
                );
            })}
        </>
    );
}

function UserDataHeader() {
    return (
        <HeaderRowContainer>
            <Index>{`순번`}</Index>
            <Email>{`이메일`}</Email>
            <NickName>{`닉네임`}</NickName>
        </HeaderRowContainer>
    );
}

function UserDataRow({ index, userInfo }: { index: number; userInfo: User }) {
    return (
        <RowContainer>
            <Index>{`${index + 1}`}</Index>
            <Email>{`${userInfo.email}`}</Email>
            <NickName>{`${userInfo.nickName || `-`}`}</NickName>
        </RowContainer>
    );
}

const HeaderRowContainer = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    font-size: 18px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const RowContainer = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    font-size: 15px;
    font-family: ${(props) => props.theme.plainTextFont};
`;

const RowBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-width: 60px;
    height: 100%;
    padding: 0px 12px;
    border-right: 2px solid gray;
`;

const Index = styled(RowBox)`
    width: 15%;
`;

const Email = styled(RowBox)`
    width: 45%;
`;

const NickName = styled(RowBox)`
    width: 25%;
    border: none;
`;
