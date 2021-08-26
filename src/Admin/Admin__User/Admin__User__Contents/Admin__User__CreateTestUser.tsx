import React from "react";
import styled from "styled-components";
import { useAdminUserContext } from "../Admin__UserProvider";
import { SubmitButton } from "../../../Styles/StyledComponents";

export default function AdminUserCreateTestUser() {
    const {
        testerEmailInput,
        testerPasswordInput,
        creating,
        setTesterEmailInput,
        setTesterPasswordInput,
        createTestUser,
    } = useAdminUserContext();

    return (
        <Container>
            <CreateRow>
                <BoxWithTitle>
                    {`아이디`}
                    <IdBox
                        value={testerEmailInput}
                        onChange={(e) => {
                            if (e.target.value.length <= 16) {
                                setTesterEmailInput(e.target.value);
                            }
                        }}
                    />
                </BoxWithTitle>
                <BoxWithTitle>
                    {`비밀번호`}
                    <PasswordBox
                        value={testerPasswordInput}
                        onChange={(e) => {
                            if (e.target.value.length <= 16) {
                                setTesterPasswordInput(e.target.value);
                            }
                        }}
                    />
                </BoxWithTitle>
            </CreateRow>
            <SubmitButton
                buttonContent={`테스트 유저 생성`}
                loadingStatus={creating}
                submitFunction={createTestUser}
                disabledCondition={!testerEmailInput || !testerPasswordInput}
                width={"180px"}
                height={"40px"}
                fontSize={"20px"}
            />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 100%;
`;

const CreateRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    width: 100%;
    height: 80px;
    font-size: 20px;
    font-family: ${(props) => props.theme.subLabelFont};
`;

const BoxWithTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: fit-content;
    height: 45px;
`;

const InputBox = styled.input.attrs({
    spellCheck: "false",
})`
    width: 180px;
    height: 100%;
    font-size: 18px;
    font-family: ${(props) => props.theme.subLabelFont};
    text-align: center;
    border: 2px solid gray;
    border-radius: 8px;
    padding: 0 12px;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: gray;
        font-family: ${(props) => props.theme.subLabelFont};
    }
`;

const IdBox = styled(InputBox)``;
const PasswordBox = styled(InputBox)``;
