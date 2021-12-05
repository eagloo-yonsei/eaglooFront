import React from "react";
import styled from "styled-components";
import { useRoomPostboardContext } from "./Room__PostboardProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function RoomPostboardPostCreate() {
    return (
        <Container>
            <Header />
            <Body />
            <Footer />
        </Container>
    );
}

function Header() {
    const { closePostCreate } = useRoomPostboardContext();

    return (
        <HeaderContainer>
            <div></div>
            <HeaderTitle>{`글 작성`}</HeaderTitle>
            <HeaderIcon
                onClick={() => {
                    closePostCreate();
                }}
            >
                <FontAwesomeIcon icon={faTimes} />
            </HeaderIcon>
        </HeaderContainer>
    );
}

function Body() {
    const {
        postCreating,
        newPostTitleInput,
        newPostContentsInput,
        setNewPostTitleInput,
        setNewPostContentsInput,
    } = useRoomPostboardContext();

    return (
        <BodyContainer>
            <TitleInput
                disabled={postCreating}
                spellCheck="false"
                value={newPostTitleInput}
                placeholder="제목"
                onChange={(e) => {
                    if (e.target.value.length <= 40) {
                        setNewPostTitleInput(e.target.value);
                    }
                }}
            />
            <ContentsInput
                disabled={postCreating}
                spellCheck="false"
                value={newPostContentsInput}
                placeholder="내용을 입력해주세요"
                onChange={(e) => {
                    if (e.target.value.length <= 1200) {
                        setNewPostContentsInput(e.target.value);
                    }
                }}
            />
        </BodyContainer>
    );
}

function Footer() {
    const {
        createPost,
        postCreating,
        createPostAsAnonymous,
        createPostAsQuestion,
        toggleCreatePostAsAnonymous,
        toggleCreatePostAsQuestion,
    } = useRoomPostboardContext();

    return (
        <FooterContainer>
            <FooterOptionRow>
                {/* <CheckBox
                    onClick={() => {
                        toggleCreatePostAsAnonymous();
                    }}
                >
                    {createPostAsAnonymous && (
                        <FontAwesomeIcon icon={faCheck} />
                    )}
                </CheckBox>
                {`익명`} */}
                <CheckBox
                    onClick={() => {
                        toggleCreatePostAsQuestion();
                    }}
                >
                    {createPostAsQuestion && <FontAwesomeIcon icon={faCheck} />}
                </CheckBox>
                {`질문`}
            </FooterOptionRow>
            <FooterSubmitButtonRow>
                <SubmitButton
                    onClick={() => {
                        createPost();
                    }}
                >
                    {postCreating ? (
                        <CircularProgress
                            color="inherit"
                            size={16}
                            thickness={5}
                        />
                    ) : (
                        `제출하기`
                    )}
                </SubmitButton>
            </FooterSubmitButtonRow>
        </FooterContainer>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 360px;
    width: 36%;
    height: 100%;
    font-family: ${(props) => props.theme.postFont};
    background-color: ${(props) => props.theme.postCreateBackground};
    padding: 15px;
    border-radius: 15px;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
`;

const HeaderTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 100%;
    font-size: 24px;
    color: white;
`;

const HeaderIcon = styled(HeaderTitle)`
    cursor: pointer;
`;

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: calc(100% - 150px);
    background-color: ${(props) => props.theme.questionPost};
    padding: 15px 20px;
    border-radius: 15px;
`;

const TitleInput = styled.input`
    width: 100%;
    height: 40px;
    font-size: 21px;
    font-family: ${(props) => props.theme.postFont};
    color: ${(props) => props.theme.postCreateBackground};
    background-color: inherit;
    border: none;
    border-bottom: 3px solid ${(props) => props.theme.postCreateBackground};
    :focus {
        outline: none;
    }
    ::placeholder {
        color: inherit;
        font-size: 21px;
        font-family: ${(props) => props.theme.postFont};
    }
`;

const ContentsInput = styled.textarea`
    width: 100%;
    height: calc(100% - 80px);
    font-size: 18px;
    line-height: 24px;
    font-family: ${(props) => props.theme.postFont};
    color: ${(props) => props.theme.postCreateBackground};
    background-color: inherit;
    border: none;
    overflow: auto;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: inherit;
        font-size: 18px;
        font-family: ${(props) => props.theme.postFont};
    }
`;

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 96px;
`;

const FooterOptionRow = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 40%;
    color: white;
    font-size: 18px;
`;

const CheckBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border: 3px solid white;
    border-radius: 25%;
    margin-left: 10px;
    cursor: pointer;
`;

const FooterSubmitButtonRow = styled(FooterOptionRow)`
    justify-content: flex-end;
    width: 100%;
    height: 60%;
`;

const SubmitButton = styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    font-size: 18px;
    color: ${(props) => props.theme.postCreateBackground};
    background-color: white;
    padding: 10px 20px;
    border-radius: 15px;
    cursor: pointer;
`;
