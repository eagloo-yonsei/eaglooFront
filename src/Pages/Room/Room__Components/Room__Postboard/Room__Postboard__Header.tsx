import React from "react";
import styled from "styled-components";
import { useRoomPostboardContext } from "./Room__PostboardProvider";
import { PostFilter } from "../../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

export default function RoomPostboardHeader() {
    return (
        <Container>
            <LeftHeader />
            <RightHeader />
        </Container>
    );
}

function LeftHeader() {
    const { postFilter, openPostCreate, filteringPosts } =
        useRoomPostboardContext();

    return (
        <LeftHeaderContainer>
            <PostCreateButton
                onClick={() => {
                    openPostCreate();
                }}
            >{`+ 글 작성`}</PostCreateButton>
            <ArrangeButton
                onClick={() => {
                    filteringPosts(PostFilter.ALL);
                }}
                selected={postFilter == PostFilter.ALL}
            >{`전체`}</ArrangeButton>
            |
            <ArrangeButton
                onClick={() => {
                    filteringPosts(PostFilter.QUESTION);
                }}
                selected={postFilter == PostFilter.QUESTION}
            >{`질문`}</ArrangeButton>
            |
            <ArrangeButton
                onClick={() => {
                    filteringPosts(PostFilter.CHAT);
                }}
                selected={postFilter == PostFilter.CHAT}
            >{`잡담`}</ArrangeButton>
            |
            <ArrangeButton
                onClick={() => {
                    filteringPosts(PostFilter.MINE);
                }}
                selected={postFilter == PostFilter.MINE}
            >{`내가 쓴 글`}</ArrangeButton>
        </LeftHeaderContainer>
    );
}

function RightHeader() {
    const { postsArrangedByNewest, arrangePostsByDate, getPosts } =
        useRoomPostboardContext();
    return (
        <RightHeaderContainer>
            <ArrangeButton
                onClick={() => {
                    arrangePostsByDate(true);
                }}
                selected={postsArrangedByNewest}
            >{`최신순`}</ArrangeButton>
            |
            <ArrangeButton
                onClick={() => {
                    arrangePostsByDate(false);
                }}
                selected={!postsArrangedByNewest}
            >{`오래된 순`}</ArrangeButton>
            |
            <RefreshButton
                onClick={() => {
                    getPosts();
                }}
            >
                <FontAwesomeIcon icon={faRedoAlt} />
            </RefreshButton>
        </RightHeaderContainer>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    font-family: ${(props) => props.theme.postFont};
`;

const LeftHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    height: 100%;
    font-size: 14px;
    color: white;
`;

const RightHeaderContainer = styled(LeftHeaderContainer)`
    padding-right: 20px;
`;

const PostCreateButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 100%;
    font-size: 16px;
    color: ${(props) => props.theme.postCreateButton};
    background-color: white;
    border-radius: 8px;
    padding: 5px 12px;
    cursor: pointer;
`;

const ArrangeButton = styled.div<{ selected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 100%;
    color: ${(props) =>
        props.selected
            ? props.theme.postFilterSelected
            : props.theme.postFilterUnselected};
    cursor: pointer;
`;

const RefreshButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 100%;
    color: white;
    cursor: pointer;
`;
