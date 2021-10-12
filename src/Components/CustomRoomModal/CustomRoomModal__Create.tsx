import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
import { useCustomRoomModalContext } from "./CustomRoomModalProvider";
import { StylelessLink } from "../../Styles/StyledComponents";
import Switch from "@material-ui/core/Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export default function CustomRoomModalCreate() {
    const { isLoggedIn } = useAppContext();
    const {
        roomNameInput,
        roomDescriptionInput,
        usePassword,
        passwordInput,
        passwordConfirmInput,
        allowMic,
        setRoomNameInput,
        setRoomDescriptionInput,
        toggleUsePassword,
        setPasswordInput,
        setPasswordConfirmInput,
        toggleAllowMic,
    } = useCustomRoomModalContext();

    if (!isLoggedIn) {
        return (
            <RequestLoginContainer>
                <RequestLogin>{`로그인 이후 사용할 수 있어요`}</RequestLogin>
                <RequestLoginLink>
                    <StylelessLink to={"/login"}>
                        {`로그인 페이지로 이동하기`}
                    </StylelessLink>
                </RequestLoginLink>
            </RequestLoginContainer>
        );
    }

    return (
        <Container>
            <Title>방 만들기</Title>
            <RoomName>
                <SettingLineName>방이름</SettingLineName>
                <SettingLineInput
                    type="text"
                    spellCheck="false"
                    value={roomNameInput}
                    placeholder="방 이름을 설정해 주세요"
                    onChange={(e) => {
                        if (e.target.value.length <= 12) {
                            setRoomNameInput(e.target.value);
                        }
                    }}
                />
                <EssentialContentAlert>
                    <FontAwesomeIcon icon={faExclamationCircle} />
                </EssentialContentAlert>
            </RoomName>
            <RoomDescription>
                <SettingLineName>방설명</SettingLineName>
                <SettingLineInput
                    type="text"
                    spellCheck="false"
                    value={roomDescriptionInput}
                    placeholder="방에 대한 간단한 설명을 해주세요"
                    onChange={(e) => setRoomDescriptionInput(e.target.value)}
                />
            </RoomDescription>
            <EnablePassword>
                <SettingLineName>
                    {`비밀번호 사용`}
                    <Switch
                        checked={usePassword}
                        onChange={() => {
                            toggleUsePassword();
                        }}
                        color="primary"
                    />
                </SettingLineName>
            </EnablePassword>
            <Password>
                <PasswordIncon usePassword={usePassword}>
                    <FontAwesomeIcon icon={faLock} />
                </PasswordIncon>
                <PasswordInput
                    disabled={!usePassword}
                    usePassword={usePassword}
                    type="password"
                    spellCheck="false"
                    value={passwordInput}
                    placeholder="비밀번호 4자리"
                    onChange={(e) => {
                        if (
                            // TODO (bug?) 숫자 비밀번호 입력 제한 조건 설정시 0으로 시작이 안 됨.
                            e.target.value === "" ||
                            e.target.value === "0" ||
                            (Number(e.target.value) &&
                                e.target.value.length <= 4)
                        ) {
                            setPasswordInput(e.target.value);
                        }
                    }}
                />
                <PasswordInput
                    disabled={!usePassword}
                    usePassword={usePassword}
                    type="password"
                    spellCheck="false"
                    value={passwordConfirmInput}
                    placeholder="비밀번호 확인"
                    onChange={(e) => {
                        if (
                            // TODO (bug?) 숫자 비밀번호 입력 제한 조건 설정시 0으로 시작이 안 됨.
                            e.target.value === "" ||
                            e.target.value === "0" ||
                            (Number(e.target.value) &&
                                e.target.value.length <= 4)
                        ) {
                            setPasswordConfirmInput(e.target.value);
                        }
                    }}
                />
                <PasswordDifferentAlert
                    passwordInput={passwordInput}
                    passwordConfirmInput={passwordConfirmInput}
                >
                    {`비밀번호가 다릅니다`}
                </PasswordDifferentAlert>
            </Password>
            <EnableMic>
                <SettingLineName>
                    {`마이크 허용`}
                    <Switch
                        checked={allowMic}
                        onChange={() => {
                            toggleAllowMic();
                        }}
                        color="primary"
                    />
                </SettingLineName>
            </EnableMic>
        </Container>
    );
}

const RequestLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(100% - 200px);
    height: 100%;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const RequestLogin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.entryMainBlue};
    font-size: 21px;
    margin-bottom: 30px;
`;

const RequestLoginLink = styled.div`
    color: ${(props) => props.theme.entryLightBlue};
    font-size: 12px;
`;

const Container = styled(RequestLoginContainer)`
    align-items: flex-start;
    padding-left: 45px;
`;

const Title = styled.div`
    color: ${(props) => props.theme.entryMainBlue};
    font-size: 26px;
    margin-bottom: 32px;
`;

const SettingLineContainer = styled.div`
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 24px;
`;

const RoomName = styled(SettingLineContainer)``;
const RoomDescription = styled(SettingLineContainer)``;
const EnablePassword = styled(SettingLineContainer)`
    margin-bottom: 8px;
`;
const Password = styled(SettingLineContainer)`
    position: relative;
    margin-bottom: 35px;
`;
const EnableMic = styled(SettingLineContainer)``;

const SettingLineName = styled.span`
    color: ${(props) => props.theme.customRoomModalLightBlue};
    font-size: 18px;
    margin-right: 20px;
`;

const SettingLineInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 100%;
    padding: 0px 12px;
    color: white;
    background-color: ${(props) => props.theme.customRoomModalInputBoxBlue};
    font-family: ${(props) => props.theme.plainTextFont};
    border: none;
    border-radius: 8px;
    :focus {
        outline: none;
    }
    ::placeholder {
        text-align: center;
        color: white;
        font-family: ${(props) => props.theme.plainTextFont};
    }
`;

const EssentialContentAlert = styled.div`
    color: orangered;
    font-size: 16px;
    margin-left: 12px;
`;

const SwitchContainer = styled.div``;

interface UsePasswordProp {
    usePassword: boolean;
}

const PasswordIncon = styled.div<UsePasswordProp>`
    margin-left: 50px;
    margin-right: 10px;
    color: ${(props) =>
        props.usePassword
            ? props.theme.entryMainBlue
            : props.theme.loginMessageGray};
`;

const PasswordInput = styled(SettingLineInput)<UsePasswordProp>`
    text-align: center;
    width: 120px;
    height: 90%;
    font-size: 12px;
    margin-right: 15px;
    background-color: ${(props) =>
        props.usePassword
            ? props.theme.customRoomModalInputBoxBlue
            : props.theme.loginMessageGray};
`;

interface PasswordCheckProp {
    passwordInput: string;
    passwordConfirmInput: string;
}

const PasswordDifferentAlert = styled.div<PasswordCheckProp>`
    position: absolute;
    left: 150px;
    bottom: -20px;
    color: red;
    font-size: 12px;
    display: ${(props) =>
        props.passwordInput.length === 4 &&
        props.passwordInput !== props.passwordConfirmInput
            ? "block"
            : "none"};
`;
