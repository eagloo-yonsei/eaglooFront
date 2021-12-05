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
import { toastErrorMessage } from "../../../../Utils";

interface RoomPostboardContext {
    posts: Post[];
    postCreateOpened: boolean;
    createPostAsAnonymous: boolean;
    createPostAsChat: boolean;
    newPostTitleInput: string;
    newPostContentsInput: string;
    postCreating: boolean;
    postFilter: PostFilter;
    postsArrangedByNewest: boolean;
    selectedPost: Post | null;
    postCommentsOpen: boolean;
    newCommentInput: string;
    addingComment: boolean;
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
    postCreating: false,
    postFilter: PostFilter.ALL,
    postsArrangedByNewest: true,
    selectedPost: null,
    postCommentsOpen: false,
    newCommentInput: "",
    addingComment: false,
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
    const [posts, setPosts] = useState<Post[]>(
        API_ENDPOINT === "http://localhost:5000" ? initialPosts : []
    );
    const [postCreateOpened, setPostCreateOpened] = useState<boolean>(false);
    const [createPostAsAnonymous, setCreatePostAsAnonymous] =
        useState<boolean>(false);
    const [createPostAsChat, setCreatePostAsChat] = useState<boolean>(false);
    const [newPostTitleInput, setNewPostTitleInput] = useState<string>("");
    const [newPostContentsInput, setNewPostContentsInput] =
        useState<string>("");
    const [postCreating, setPostCreating] = useState<boolean>(false);
    const [postFilter, setPostFilter] = useState<PostFilter>(PostFilter.ALL);
    const [postsArrangedByNewest, setPostsArrangedByNewest] =
        useState<boolean>(true);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [postCommentsOpen, setPostCommentsOpen] = useState<boolean>(false);
    const [newCommentInput, setNewCommentInput] = useState<string>("");
    const [addingComment, setAddingComment] = useState<boolean>(false);

    useEffect(() => {
        getPosts();
        return () => {};
    }, []);

    async function getPosts() {
        if (!roomUsingInfo) {
            return;
        } else {
            await axios
                .get<{ posts: Post[]; success: boolean; message: string }>(
                    `${API_ENDPOINT}/api/post/room/${roomUsingInfo.roomId}`
                )
                .then((response) => {
                    // if (response.data.success) {
                    //     setPosts(response.data.posts);
                    // } else {
                    //     toastErrorMessage(response.data.message);
                    // }
                })
                .catch((error) => {
                    toastErrorMessage("포스트보드 받아오기에 실패했습니다.");
                    console.log(error);
                });
        }
    }

    function openPostCreate() {
        closePostDetail();
        setPostCreateOpened(true);
    }

    function closePostCreate() {
        setPostCreateOpened(false);
    }

    async function createPost() {
        if (postCreating) {
            return;
        }
        setPostCreating(true);
        await axios
            .post<{ success: boolean; message: string }>(
                `${API_ENDPOINT}/api/post/post`,
                {
                    userId: userInfo?.id,
                    roomId: roomUsingInfo?.roomId,
                    postTitle: newPostTitleInput,
                    postContents: newPostContentsInput,
                    category: createPostAsChat
                        ? PostCategory.CHAT
                        : PostCategory.QUESTION,
                }
            )
            .then((response) => {
                if (response.data.success) {
                    // TODO
                } else {
                    toastErrorMessage("포스트 생성에 실패했습니다.");
                }
            })
            .catch((error) => {
                toastErrorMessage("포스트 생성에 실패했습니다.");
                console.log(error);
            })
            .finally(() => {
                setPostCreating(false);
            });
    }

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

    async function addComment() {
        if (addingComment) {
            return;
        }
        setAddingComment(true);
        await axios
            .post<{ success: boolean; message: string }>(
                `${API_ENDPOINT}/api/post/postComment`,
                {
                    userId: userInfo?.id,
                    postId: selectedPost?.id,
                    comment: newCommentInput,
                }
            )
            .then((response) => {
                if (response.data.success) {
                    // TODO
                } else {
                    toastErrorMessage("댓글 생성에 실패했습니다.");
                }
            })
            .catch((error) => {
                toastErrorMessage("댓글 생성에 실패했습니다.");
                console.log(error);
                console.log(error);
            })
            .finally(() => {
                setAddingComment(false);
            });
    }

    const roomPostboardContext = {
        posts,
        postCreateOpened,
        createPostAsAnonymous,
        createPostAsChat,
        newPostTitleInput,
        newPostContentsInput,
        postCreating,
        postFilter,
        postsArrangedByNewest,
        selectedPost,
        postCommentsOpen,
        newCommentInput,
        addingComment,
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
