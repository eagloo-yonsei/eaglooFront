import React from "react";
import styled from "styled-components";
import { useRoomPostboardContext } from "./Room__PostboardProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function RoomPostBoardComments() {
    const { postCommentsOpen } = useRoomPostboardContext();
    if (!postCommentsOpen) {
        return null;
    }

    return (
        <OuterContainer>
            <Container>
                <Header />
                <Body />
                <Footer />
            </Container>
            <GapFiller />
        </OuterContainer>
    );
}

function Header() {
    const { closePostComments } = useRoomPostboardContext();
    return (
        <HeaderContainer>
            <LeftHeader></LeftHeader>
            <RightHeader>
                <HeaderIcon
                    onClick={() => {
                        closePostComments();
                    }}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </HeaderIcon>
            </RightHeader>
        </HeaderContainer>
    );
}

function Body() {
    return (
        <BodyContainer>
            <CommentEach />
        </BodyContainer>
    );
}

function CommentEach() {
    return (
        <>
            <CommentEachContainer>
                <CommentUserName>{`익명 1`}</CommentUserName>
                <CommentContents>{`런어스 공지방 보면 올라와있습니다`}</CommentContents>
            </CommentEachContainer>
            <CommentEachContainer>
                <CommentUserName>{`익명 1`}</CommentUserName>
                <CommentContents>{`고맙습니다`}</CommentContents>
            </CommentEachContainer>
            <CommentEachContainer>
                <CommentUserName>{`익명 1`}</CommentUserName>
                <CommentContents>{`대단히 고맙습니다람쥐가 언덕을 넘어간다 여러줄 댓글`}</CommentContents>
            </CommentEachContainer>
            <CommentEachContainer>
                <CommentUserName>{`익명 1`}</CommentUserName>
                <CommentContents>{`런어스 공지방 보면 올라와있습니다`}</CommentContents>
            </CommentEachContainer>
        </>
    );
}

function Footer() {
    const { newCommentInput, setNewCommentInput, addComment } =
        useRoomPostboardContext();

    return (
        <FooterContainer>
            <CommentInput
                type="text"
                spellCheck="false"
                value={newCommentInput}
                placeholder="새 댓글 입력"
                onChange={(e) => {
                    if (e.target.value.length <= 150) {
                        setNewCommentInput(e.target.value);
                    }
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        // addComment();
                    }
                }}
            />
        </FooterContainer>
    );
}

const OuterContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 100%;
`;

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 95%;
    padding: 15px 5px 15px 10px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: ${(props) => props.theme.postCommentsBackground};
`;

const CommentsComponent = styled.div`
    display: flex;
    width: 100%;
    padding-left: 5px;
    padding-right: 15px;
`;

const HeaderContainer = styled(CommentsComponent)`
    justify-content: space-between;
    align-items: center;
    height: 30px;
    font-size: 24px;
`;

const LeftHeader = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    gap: 20px;
    height: 100%;
`;

const RightHeader = styled(LeftHeader)`
    color: white;
`;

const HeaderIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const BodyContainer = styled(CommentsComponent)`
    position: absolute;
    bottom: 60px;
    flex-direction: column;
    width: 90%;
    gap: 20px;
    height: calc(100% - 120px);
    overflow: auto;
`;

const CommentEachContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height: fit-content;
    font-size: 14px;
    font-family: ${(props) => props.theme.postFont};
`;

const CommentUserName = styled.div`
    color: ${(props) => props.theme.postCommentUserNameColor};
`;

const CommentContents = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    max-width: 90%;
    height: fit-content;
    font-size: 14px;
    line-height: 18px;
    color: ${(props) => props.theme.postContentsColor};
    background-color: ${(props) => props.theme.questionPost};
    border-radius: 12px;
    padding: 10px 12px;
`;

const FooterContainer = styled(CommentsComponent)`
    height: 36px;
`;

const CommentInput = styled.input`
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-family: ${(props) => props.theme.postFont};
    background-color: ${(props) => props.theme.questionPost};
    padding: 0 12px;
    border: none;
    border-radius: 8px;
    :focus {
        outline: none;
    }
    ::placeholder {
        font-size: 16px;
        font-family: ${(props) => props.theme.postFont};
        color: ${(props) => props.theme.postCommentsBackground};
    }
`;

// TODO (enhancement dumbcode)
// comment 창이 나오는 걸 어떻게 처리해야할지
const GapFiller = styled.div`
    position: absolute;
    left: -10px;
    width: 10px;
    height: 95%;
    background-color: ${(props) => props.theme.postCommentsBackground};
`;