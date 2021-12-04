import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../../../Routes/App/AppProvider";
import {
    ChildrenProp,
    API_ENDPOINT,
    Post,
    PostFilter,
    PostCategory,
} from "../../../../Constants";

interface RoomPostboardContext {
    posts: Post[];
    postCreateOpened: boolean;
    createPostAsAnonymous: boolean;
    createPostAsChat: boolean;
    newPostTitleInput: string;
    newPostContentsInput: string;
    postFilter: PostFilter;
    postsArrangedByNewest: boolean;
    selectedPost: Post | null;
    postCommentsOpen: boolean;
    newCommentInput: string;
    openPostCreate: () => void;
    closePostCreate: () => void;
    createPost: () => void;
    toggleCreatePostAsAnonymous: () => void;
    toggleCreatePostAsChat: () => void;
    filteringPosts: (filter: PostFilter) => void;
    arrangePostsByDate: (byNewest: boolean) => void;
    showPostDetail: (post: Post) => void;
    closePostDetail: () => void;
    togglePostCommentsOpen: () => void;
    closePostComments: () => void;
    addComment: () => void;
    setNewPostTitleInput: (input: string) => void;
    setNewPostContentsInput: (input: string) => void;
    setNewCommentInput: (input: string) => void;
}

const InitialRoomPostboardContext: RoomPostboardContext = {
    posts: [],
    postCreateOpened: false,
    createPostAsAnonymous: false,
    createPostAsChat: false,
    newPostTitleInput: "",
    newPostContentsInput: "",
    postFilter: PostFilter.ALL,
    postsArrangedByNewest: true,
    selectedPost: null,
    postCommentsOpen: false,
    newCommentInput: "",
    openPostCreate: () => {},
    closePostCreate: () => {},
    createPost: () => {},
    toggleCreatePostAsAnonymous: () => {},
    toggleCreatePostAsChat: () => {},
    filteringPosts: () => {},
    arrangePostsByDate: () => {},
    showPostDetail: () => {},
    closePostDetail: () => {},
    togglePostCommentsOpen: () => {},
    closePostComments: () => {},
    addComment: () => {},
    setNewPostTitleInput: () => {},
    setNewPostContentsInput: () => {},
    setNewCommentInput: () => {},
};

const RoomPostboardContext = createContext<RoomPostboardContext>(
    InitialRoomPostboardContext
);
export const useRoomPostboardContext = () => useContext(RoomPostboardContext);

export default function RoomPostboardProvider({ children }: ChildrenProp) {
    const initialPosts = [
        {
            id: "a1",
            category: PostCategory.QUESTION,
            title: "질문 있습니다",
            contents: "아브라카다브라",
            authorId: "a",
            roomId: "a",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "a2",
            category: PostCategory.CHAT,
            title: "대단히 긴 제목을 만들어 봅시다 두줄 세줄 넘어가도록 할 수 있는 그런 제목이요",
            contents: "내용은 간결하게",
            authorId: "a",
            roomId: "a",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "a3",
            category: PostCategory.CHAT,
            title: "로렘 입숨",
            contents:
                "헤는 바람 별 뿐입니다. 다다미에 하나 별 그렇지만 동일한 이름 뿐입니다                헤는 바람 별 뿐입니다. 다다미에 하나 별 그렇지만 동일한 이름 뿐입니다                헤는 바람 별 뿐입니다. 다다미에 하나 별 그렇지만 동일한 이름 뿐입니다                헤는 바람 별 뿐입니다. 다다미에 하나 별 그렇지만 동일한 이름 뿐입니다                헤는 바람 별 뿐입니다. 다다미에 하나 별 그렇지만 동일한 이름 뿐입니다",
            authorId: "a",
            roomId: "a",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "a4",
            category: PostCategory.QUESTION,
            title: "HERE",
            contents: "COMES JOHN CENA!",
            authorId: "a",
            roomId: "a",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "a5",
            category: PostCategory.QUESTION,
            title: "무엇이든 물어보세요",
            contents: "레몬은 무슨 향이 나나요",
            authorId: "a",
            roomId: "a",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const { userInfo, roomUsingInfo } = useAppContext();
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [postCreateOpened, setPostCreateOpened] = useState<boolean>(false);
    const [createPostAsAnonymous, setCreatePostAsAnonymous] =
        useState<boolean>(false);
    const [createPostAsChat, setCreatePostAsChat] = useState<boolean>(false);
    const [newPostTitleInput, setNewPostTitleInput] = useState<string>("");
    const [newPostContentsInput, setNewPostContentsInput] =
        useState<string>("");
    const [postFilter, setPostFilter] = useState<PostFilter>(PostFilter.ALL);
    const [postsArrangedByNewest, setPostsArrangedByNewest] =
        useState<boolean>(true);
    const [selectedPost, setSelectedPost] = useState<any | null>(null);
    const [postCommentsOpen, setPostCommentsOpen] = useState<boolean>(false);
    const [newCommentInput, setNewCommentInput] = useState<string>("");

    useEffect(() => {
        getPosts();
        return () => {};
    }, []);

    function getPosts() {
        console.log(roomUsingInfo?.roomId);
    }

    function openPostCreate() {
        closePostDetail();
        setPostCreateOpened(true);
    }

    function closePostCreate() {
        setPostCreateOpened(false);
    }

    function createPost() {}

    function toggleCreatePostAsAnonymous() {
        setCreatePostAsAnonymous(!createPostAsAnonymous);
    }

    function toggleCreatePostAsChat() {
        setCreatePostAsChat(!createPostAsChat);
    }

    function filteringPosts(filter: PostFilter) {
        setPostFilter(filter);
    }

    function arrangePostsByDate(byNewest: boolean) {
        if (byNewest == postsArrangedByNewest) {
            return;
        } else {
            setPostsArrangedByNewest(byNewest);
            // TODO
        }
    }

    function showPostDetail(post: Post) {
        closePostCreate();
        setSelectedPost(post);
    }

    function closePostDetail() {
        setSelectedPost(null);
    }

    function togglePostCommentsOpen() {
        setPostCommentsOpen(!postCommentsOpen);
    }

    function closePostComments() {
        setPostCommentsOpen(false);
    }

    function addComment() {}

    const roomPostboardContext = {
        posts,
        postCreateOpened,
        createPostAsAnonymous,
        createPostAsChat,
        newPostTitleInput,
        newPostContentsInput,
        postFilter,
        postsArrangedByNewest,
        selectedPost,
        postCommentsOpen,
        newCommentInput,
        openPostCreate,
        closePostCreate,
        createPost,
        toggleCreatePostAsAnonymous,
        toggleCreatePostAsChat,
        filteringPosts,
        arrangePostsByDate,
        showPostDetail,
        closePostDetail,
        togglePostCommentsOpen,
        closePostComments,
        addComment,
        setNewPostTitleInput,
        setNewPostContentsInput,
        setNewCommentInput,
    };

    return (
        <RoomPostboardContext.Provider value={roomPostboardContext}>
            {children}
        </RoomPostboardContext.Provider>
    );
}
