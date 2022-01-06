import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../../../Routes/App/AppProvider";
import { useRoomPostboardContext } from "./Room__PostboardProvider";
import { Post, PostCategory } from "../../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

export default function RoomPostBoardPost({ post }: { post: Post }) {
    return (
        <Container postCategory={post.category}>
            <Header post={post} />
            <Body post={post} />
            <Footer post={post} />
        </Container>
    );
}

function Header({ post }: { post: Post }) {
    const { userInfo } = useAppContext();
    const { togglePostScrap, getUpdatedAt } = useRoomPostboardContext();
    const [alreadyScrap, setAlreadyScrap] = useState(false);

    useEffect(() => {
        var flag = false;
        for (var i = 0; i < post.postScraps.length; i++) {
            if (post.postScraps[i].userId == userInfo!.id) {
                setAlreadyScrap(true);
                flag = true;
            }
        }
        if (!flag) {
            setAlreadyScrap(false);
        }
        return () => {};
    }, [post]);

    return (
        <HeaderContainer>
            <LeftHeaderContainer>
                {alreadyScrap ? (
                    <YellowStarIcon
                        onClick={() => {
                            togglePostScrap(post);
                        }}
                    >
                        <FontAwesomeIcon icon={faStar} />
                    </YellowStarIcon>
                ) : (
                    <GrayStarIcon
                        onClick={() => {
                            togglePostScrap(post);
                        }}
                    >
                        <FontAwesomeIcon icon={faStar} />
                    </GrayStarIcon>
                )}
            </LeftHeaderContainer>
            <RightHeaderContainer>
                 {/* TODO (enhancement) - 새로 추가한 글은 새로고침하지 않으면 undefined로 뜨는 문제 해결 필요  */}
                 {
                    post?.updatedAt !== undefined ?
                        <UpdatedAt>{getUpdatedAt(post)}</UpdatedAt>
                        : <></>
                }
            </RightHeaderContainer>
        </HeaderContainer>
    );
}

function Body({ post }: { post: Post }) {
    const { showPostDetail } = useRoomPostboardContext();

    return (
        <BodyContainer
            onClick={() => {
                showPostDetail(post);
            }}
        >
            <PostTitle>
                {`${post.category == PostCategory.QUESTION ? `[질문] ` : ``}
            ${post.category == PostCategory.CHAT ? `[잡담] ` : ``}
            ${post.title}`}
            </PostTitle>
            <PostContents>{`${post.contents}`}</PostContents>
        </BodyContainer>
    );
}

function Footer({ post }: { post: Post }) {
    const { togglePostLike } = useRoomPostboardContext();
    return (
        <FooterContainer>
            <HeartIcon
                onClick={() => {
                    togglePostLike(post);
                }}
            >
                <FontAwesomeIcon icon={faHeart} />
            </HeartIcon>
            {`${post.postlikes.length}`}
            <CommentIcon>
                <FontAwesomeIcon icon={faComment} />
            </CommentIcon>
            {`${post.postComments.length}`}
        </FooterContainer>
    );
}

// TODO (bug, enhancement)
// Postboard__Post의 Container 내부에 들어가는 div들을 relative로 지정하지 않으면
// Postboard의 height가 늘어나면서 윗줄을 잡아먹고 PostCreate와 PostCreate까지 늘어나버림
const Container = styled.div<{ postCategory: PostCategory }>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 31.5%;
    aspect-ratio: 1.1;
    font-size: 16px;
    font-family: ${(props) => props.theme.postFont};
    background-color: ${(props) =>
        props.postCategory == PostCategory.QUESTION
            ? props.theme.questionPost
            : props.theme.chatPost};
    border-radius: 15px;
    overflow: hidden;
`;

const PostComponent = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    padding: 0px 15px;
`;

const HeaderContainer = styled(PostComponent)`
    justify-content: space-between;
    align-items: center;
    top: 12px;
    height: 20px;
`;

const LeftHeaderContainer = styled.div`
    font-size: 18px;
`;

const HeaderIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const YellowStarIcon = styled(HeaderIcon)`
    color: yellow;
`;

const GrayStarIcon = styled(HeaderIcon)`
    color: gray;
`;

const RightHeaderContainer = styled.div``;

const BodyContainer = styled(PostComponent)`
    top: 42px;
    flex-direction: column;
    gap: 8px;
    height: calc(100% - 85px);
    cursor: pointer;
`;

const PostTitle = styled.div`
    display: flex;
    width: 100%;
    height: 18px;
    color: ${(props) => props.theme.postTitleColor};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const PostContents = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: calc(100% - 18px);
    font-size: 14px;
    line-height: 18px;
    color: ${(props) => props.theme.postContentsColor};
    overflow: hidden;
`;

const FooterContainer = styled(PostComponent)`
    justify-content: flex-end;
    align-items: flex-end;
    gap: 10px;
    bottom: 15px;
    height: 25px;
    font-size: 18px;
`;

const HeartIcon = styled.div`
    color: ${(props) => props.theme.postHeartIconColor};
    cursor: pointer;
`;

const CommentIcon = styled.div`
    color: ${(props) => props.theme.postCommentIconColor};
`;

const UpdatedAt = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: fit-content;
    color: ${(props) => props.theme.postUpdatedAtBackground};
    font-size: 8px;
    line-height: 15px;
    overflow: auto;
`;