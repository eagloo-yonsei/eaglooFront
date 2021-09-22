import React from "react";
import styled from "styled-components";
import { SubmitButton } from "../../Styles/StyledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useSignupContext } from "./SignupProvider";

export default function SignupNickNameAndRealName() {
    const {
        nickNameInput,
        realNameInput,
        nickNameAvailable,
        nickNameValidating,
        signingUp,
        setNickNameInput,
        setRealNameInput,
        checkNickNameDuplicate,
        setNickNameAvailable,
        setNickNameAndRealName,
    } = useSignupContext();

    return (
        <>
            <NickNameRow>
                <NickNameBox
                    type="text"
                    placeholder="닉네임 (3자 이상)"
                    value={nickNameInput}
                    onChange={(e) => {
                        if (e.target.value.length <= 10) {
                            setNickNameInput(e.target.value);
                        }
                        if (nickNameAvailable) {
                            setNickNameAvailable(false);
                        }
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            checkNickNameDuplicate();
                        }
                    }}
                />
                <NickNameValidationBox nickNameAvailable={nickNameAvailable}>
                    <SubmitButton
                        buttonContent={"중복 확인"}
                        loadingStatus={nickNameValidating}
                        disabledCondition={
                            nickNameInput.length < 3 || nickNameAvailable
                        }
                        submitFunction={checkNickNameDuplicate}
                        width={"80px"}
                        height={"32px"}
                        fontSize={"12px"}
                        ringSize={15}
                    />
                    {nickNameAvailable ? (
                        <>
                            <FontAwesomeIcon icon={faCheck} />
                            {`사용 가능한 닉네임입니다`}
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            {`닉네임 중복을 확인해주세요`}
                        </>
                    )}
                </NickNameValidationBox>
            </NickNameRow>
            <RealNameBox
                type="text"
                placeholder="실명"
                value={realNameInput}
                onChange={(e) => {
                    setRealNameInput(e.target.value);
                }}
            />
            <SubmitButton
                buttonContent={`가입하기`}
                loadingStatus={signingUp}
                submitFunction={setNickNameAndRealName}
                disabledCondition={
                    (!!nickNameInput && !nickNameAvailable) || !realNameInput
                }
                fontSize={"18px"}
            />
        </>
    );
}

const InputBox = styled.input.attrs({
    spellCheck: "false",
})`
    width: 100%;
    height: 46px;
    font-size: 18px;
    font-family: ${(props) => props.theme.subLabelFont};
    padding: 0 12px;
    border: none;
    border-radius: 8px;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: ${(props) => props.theme.placeholder};
        font-family: ${(props) => props.theme.subLabelFont};
    }
`;

const NickNameBox = styled(InputBox)``;

const RealNameBox = styled(InputBox)``;

const NickNameRow = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 46px;
`;

const NickNameValidationBox = styled.div<{
    nickNameAvailable: boolean;
}>`
    position: absolute;
    right: -195px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 280px;
    height: fit-content;
    gap: 15px;
    font-size: 12px;
    font-family: ${(props) => props.theme.subLabelFont};
    color: ${(props) => (props.nickNameAvailable ? "white" : "orangered")};
`;
