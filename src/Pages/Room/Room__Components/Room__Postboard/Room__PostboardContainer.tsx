import React from "react";
import styled from "styled-components";
import RoomPostboardHeader from "./Room__Postboard__Header";
import RoomPostboardPost from "./Room__Postboard__Post";
import RoomPostboardPostCreate from "./Room__Postboard__PostCreate";
import RoomPostboardPostDetail from "./Room__Postboard__PostDetail";
import RoomPostboardPostUpdate from "./Room__Postboard__PostUpdate";
import RoomPostBoardComments from "./Room__Postboard__Comments";
import { useRoomPostboardContext } from "./Room__PostboardProvider";

export default function RoomPostBoardContainer() {
    const { posts, postCreateOpened, selectedPost, postUpdateOpened } = useRoomPostboardContext();
    return (
        <Container>
            <RoomPostboardHeader />
            <PostsContainer>
                {postCreateOpened && <RoomPostboardPostCreate />}
                {selectedPost && (
                    <>
                        {postUpdateOpened ? <RoomPostboardPostUpdate /> : <RoomPostboardPostDetail />}
                        <RoomPostBoardComments />
                    </>
                )}
                {posts.map((post) => {
                    return <RoomPostboardPost key={post.id} post={post} />;
                })}
            </PostsContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.postboardBackground};
    padding: 5px 18px 0px 18px;
    border-radius: 12px;
`;

const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    height: calc(100% - 50px);
    padding: 12px 0px;
    overflow-x: auto;
    overflow-y: hidden;
`;
