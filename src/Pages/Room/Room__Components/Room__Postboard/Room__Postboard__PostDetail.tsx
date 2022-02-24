import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../../../Routes/App/AppProvider";
import { useRoomPostboardContext } from "./Room__PostboardProvider";
import { PostCategory } from "../../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faComment, faTimes, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function RoomPostboardPostDetail() {
    const { selectedPost } = useRoomPostboardContext();
    if (!selectedPost) {
        return null;
    }

    return (
        <Container>
            <Header />
            <Body />
        </Container>
    );
}

function Header() {
    const { userInfo } = useAppContext();
    const {
        selectedPost,
        togglePostScrap,
        togglePostCommentsOpen,
        closePostDetail,
        togglePostUpdateOpen,
        deletePost,
    } = useRoomPostboardContext();
    const [alreadyScrap, setAlreadyScrap] = useState(false);

    const [compareUserId, setCompareUserId] = useState(false);
    useEffect(() => {
        userInfo!.id === selectedPost!.authorId ? (setCompareUserId(true))
            : setCompareUserId(false)
            
        var flag = false;
        for (var i = 0; i < selectedPost!.postScraps.length; i++) {
            if (selectedPost!.postScraps[i].userId == userInfo!.id) {
                setAlreadyScrap(true);
                flag = true;
            }
        }
        if (!flag) {
            setAlreadyScrap(false);
        }
        return () => {};
    }, [selectedPost]);

    return (
        <HeaderContainer>
            <LeftHeader>
                {alreadyScrap ? (
                    <YellowStarIcon
                        onClick={() => {
                            togglePostScrap(selectedPost!);
                        }}
                    >
                        <FontAwesomeIcon icon={faStar} />
                    </YellowStarIcon>
                ) : (
                    <GrayStarIcon
                        onClick={() => {
                            togglePostScrap(selectedPost!);
                        }}
                    >
                        <FontAwesomeIcon icon={faStar} />
                    </GrayStarIcon>
                )}
            </LeftHeader>
            <RightHeader>
                {compareUserId ? (
                    <>
                    <HeaderIcon
                    onClick={() => {
                        togglePostUpdateOpen(selectedPost!);
                    }}
                >
                    <FontAwesomeIcon icon={faPen} />
                </HeaderIcon>
                <HeaderIcon
                    onClick={() => {
                        deletePost(selectedPost!);
                    }}
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </HeaderIcon>
                </>
                ) : (<></>)}
                
                <HeaderIcon
                    onClick={() => {
                        togglePostCommentsOpen();
                    }}
                >
                    <FontAwesomeIcon icon={faComment} />
                </HeaderIcon>
                <HeaderIcon
                    onClick={() => {
                        closePostDetail();
                    }}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </HeaderIcon>
            </RightHeader>
        </HeaderContainer>
    );
}

function Body() {
    const { selectedPost, getUpdatedAt } = useRoomPostboardContext();

    return (
        <BodyContainer>
            <Title>{`
            ${selectedPost?.category == PostCategory.QUESTION ? `[질문] ` : ``}
            ${selectedPost?.category == PostCategory.CHAT ? `[잡담] ` : ``}
            ${selectedPost?.title}`}</Title>
            <Contents>{`${selectedPost?.contents}`}</Contents>

            {/* TODO (enhancement) - 새로 추가한 글은 새로고침하지 않으면 undefined로 뜨는 문제 해결 필요  */}
            {
                selectedPost?.updatedAt !== undefined ?
                    <UpdatedAt>{getUpdatedAt(selectedPost)}</UpdatedAt>
                    : <></>
            }
        </BodyContainer>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-width: 360px;
    width: 36%;
    height: 100%;
    max-height: 100%;
    font-family: ${(props) => props.theme.postFont};
    background-color: ${(props) => props.theme.questionPost};
    padding: 12px 20px;
    border-radius: 15px;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 28px;
`;

const LeftHeader = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    gap: 20px;
    height: 100%;
`;

const RightHeader = styled(LeftHeader)``;

const HeaderIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
`;

const YellowStarIcon = styled(HeaderIcon)`
    color: ${(props)=> props.theme.postScrapColor};
    filter: drop-shadow(0px 0px 6px #000000);
`;

const GrayStarIcon = styled(HeaderIcon)`
    color: gray;
`;

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    height: calc(100% - 55px);
    font-size: 24px;
`;

const Title = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: fit-content;
    color: ${(props) => props.theme.postTitleColor};
    font-size: 28px;
    line-height: 36px;
`;

const Contents = styled(Title)`
    color: ${(props) => props.theme.postContentsColor};
    font-size: 18px;
    line-height: 28px;
    overflow: auto;
`;

const UpdatedAt = styled(Title)`
    color: ${(props) => props.theme.postDetailUpdatedAtBackground};
    font-size: 12px;
    line-height: 22px;
    overflow: auto;
`;
