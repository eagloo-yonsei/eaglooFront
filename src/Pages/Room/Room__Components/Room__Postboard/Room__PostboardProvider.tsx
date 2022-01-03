import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../../../Routes/App/AppProvider";
import {
    ChildrenProp,
    API_ENDPOINT,
    Post,
    PostFilter,
    PostCategory,
    PostComment,
} from "../../../../Constants";
import { toastErrorMessage } from "../../../../Utils";

interface RoomPostboardContext {
    posts: Post[];
    postCreateOpened: boolean;
    createPostAsAnonymous: boolean;
    createPostAsQuestion: boolean;
    newPostTitleInput: string;
    newPostContentsInput: string;
    postCreating: boolean;
    postFilter: PostFilter;
    postsArrangedByNewest: boolean;
    selectedPost: Post | null;
    postCommentsOpen: boolean;
    newCommentInput: string;
    addingComment: boolean;
    getPosts: () => void;
    togglePostLike: (targetPost: Post) => void;
    togglePostScrap: (targetPost: Post) => void;
    openPostCreate: () => void;
    closePostCreate: () => void;
    createPost: () => void;
    toggleCreatePostAsAnonymous: () => void;
    toggleCreatePostAsQuestion: () => void;
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
    createPostAsQuestion: false,
    newPostTitleInput: "",
    newPostContentsInput: "",
    postCreating: false,
    postFilter: PostFilter.ALL,
    postsArrangedByNewest: true,
    selectedPost: null,
    postCommentsOpen: false,
    newCommentInput: "",
    addingComment: false,
    getPosts: () => {},
    togglePostLike: () => {},
    togglePostScrap: () => {},
    openPostCreate: () => {},
    closePostCreate: () => {},
    createPost: () => {},
    toggleCreatePostAsAnonymous: () => {},
    toggleCreatePostAsQuestion: () => {},
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
    const { userInfo, roomUsingInfo } = useAppContext();
    const [posts, setPosts] = useState<Post[]>([]);
    const [wholePosts, setWholePosts] = useState<Post[]>([]);
    const [postCreateOpened, setPostCreateOpened] = useState<boolean>(false);
    const [createPostAsAnonymous, setCreatePostAsAnonymous] =
        useState<boolean>(false);
    const [createPostAsQuestion, setCreatePostAsQuestion] =
        useState<boolean>(false);
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
            const URL: string = await roomUsingInfo?.roomId.includes('public') ? `${API_ENDPOINT}/api/post/roomPublic/${roomUsingInfo.roomId.split('public')[1]}` : `${API_ENDPOINT}/api/post/room/${roomUsingInfo.roomId}`
            await axios
                // TODO (bug?)
                // posts 가 query 되어서 옴 : 백엔드 단에서 select 하기 때문에 발생하는 현상인듯 함
                .get<{
                    posts: { posts: Post[] };
                    success: boolean;
                    message: string;
                }>(URL)
                .then((response) => {
                    if (response.data.success) {
                        setPosts(response.data.posts.posts);
                        setWholePosts(response.data.posts.posts);
                    } else {
                        toastErrorMessage(response.data.message);
                    }
                })
                .catch((error) => {
                    toastErrorMessage("포스트보드 받아오기에 실패했습니다.");
                    console.error(error);
                });
        }
    }

    // TODO (code clearance)
    // Like, 혹은 Scrap 한 이후에 해당 Post 만 수정하도록 바꿔야함
    async function togglePostLike(targetPost: Post) {
        var alreadyLike = false;
        var likeId = "";
        for (var i = 0; i < targetPost.postlikes.length; i++) {
            if (targetPost.postlikes[i].userId == userInfo!.id) {
                alreadyLike = true;
                likeId = targetPost.postlikes[i].id;
            }
        }
        if (!alreadyLike) {
            axios
                .post(`${API_ENDPOINT}/api/post/postLike`, {
                    userId: userInfo!.id,
                    postId: targetPost.id,
                })
                .then((response) => {
                    if (response.data.success) {
                        handleRefreshLikeOrScrap(targetPost.id);
                        filteringPosts(postFilter);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toastErrorMessage(
                        "서버 오류입니다. 잠시 후 다시 시도해 주세요."
                    );
                });
        } else {
            await axios
                .delete(`${API_ENDPOINT}/api/post/postLike/${likeId}`)
                .then((response) => {
                    if (response.data.success) {
                        handleRefreshLikeOrScrap(targetPost.id);
                        filteringPosts(postFilter);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    async function togglePostScrap(targetPost: Post) {
        var alreadyScrap = false;
        var scrapId = "";
        for (var i = 0; i < targetPost.postScraps.length; i++) {
            if (targetPost.postScraps[i].userId == userInfo!.id) {
                alreadyScrap = true;
                scrapId = targetPost.postScraps[i].id;
            }
        }
        if (!alreadyScrap) {
            axios
                .post(`${API_ENDPOINT}/api/post/postScrap`, {
                    userId: userInfo!.id,
                    postId: targetPost.id,
                })
                .then((response) => {
                    if (response.data.success) {
                        handleRefreshLikeOrScrap(targetPost.id);
                        filteringPosts(postFilter);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toastErrorMessage(
                        "서버 오류입니다. 잠시 후 다시 시도해 주세요."
                    );
                });
        } else {
            await axios
                .delete(`${API_ENDPOINT}/api/post/postScrap/${scrapId}`)
                .then((response) => {
                    if (response.data.success) {
                        handleRefreshLikeOrScrap(targetPost.id);
                        filteringPosts(postFilter);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    async function handleRefreshLikeOrScrap(postId: string) {
        // TODO (code clearance)
        // 밑의 주석친 코드로 실행하면 posts가 getPosts() 하기 이전의 상태를 참조함
        await axios
            .get<{
                posts: { posts: Post[] };
                success: boolean;
                message: string;
            }>(`${API_ENDPOINT}/api/post/room/${roomUsingInfo!.roomId}`)
            .then((response) => {
                if (response.data.success) {
                    setPosts(response.data.posts.posts);
                    setWholePosts(response.data.posts.posts);
                    if (selectedPost?.id == postId) {
                        const renewalSelectedPost =
                            response.data.posts.posts.find((post) => {
                                return post.id == postId;
                            });
                        if (renewalSelectedPost) {
                            setSelectedPost(renewalSelectedPost);
                        }
                    }
                } else {
                    toastErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        // await getPosts();
        // if (selectedPost?.id == postId) {
        //     const renewalSelectedPost = posts.find((post) => {
        //         return post.id == postId;
        //     });
        //     if (renewalSelectedPost) {
        //         setSelectedPost(renewalSelectedPost);
        //     }
        // }
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
            .post<{ newPost: Post; success: boolean; message: string }>(
                `${API_ENDPOINT}/api/post/post`,
                {
                    userId: userInfo?.id,
                    roomId: roomUsingInfo?.roomId,
                    postTitle: newPostTitleInput,
                    postContents: newPostContentsInput,
                    category: createPostAsQuestion
                        ? PostCategory.QUESTION
                        : PostCategory.CHAT,
                }
            )
            .then((response) => {
                if (response.data.success) {
                    setPosts((posts) => [response.data.newPost, ...posts]);
                    posts.push(response.data.newPost);
                    setNewPostTitleInput("");
                    setNewPostContentsInput("");
                } else {
                    toastErrorMessage("포스트 생성에 실패했습니다.");
                }
            })
            .catch((error) => {
                toastErrorMessage("포스트 생성에 실패했습니다.");
                console.error(error);
            })
            .finally(() => {
                setPostCreating(false);
            });
    }

    function toggleCreatePostAsAnonymous() {
        setCreatePostAsAnonymous(!createPostAsAnonymous);
    }

    function toggleCreatePostAsQuestion() {
        setCreatePostAsQuestion(!createPostAsQuestion);
    }

    function filteringPosts(filter: PostFilter) {
        let filteredPosts: Post[] = [];
        switch (filter) {
            case PostFilter.QUESTION:
                wholePosts.forEach((post) => {
                    if (post.category == PostCategory.QUESTION) {
                        filteredPosts.push(post);
                    }
                });
                setPosts(filteredPosts);

                break;
            case PostFilter.CHAT:
                wholePosts.forEach((post) => {
                    if (post.category == PostCategory.CHAT) {
                        filteredPosts.push(post);
                    }
                });
                setPosts(filteredPosts);

                break;
            case PostFilter.MINE:
                if (!userInfo) {
                    break;
                }
                wholePosts.forEach((post) => {
                    if (post.authorId == userInfo.id) {
                        filteredPosts.push(post);
                    }
                });
                setPosts(filteredPosts);
                break;
            case PostFilter.ALL:
            default:
                setPosts(wholePosts);
                break;
        }
        setPostFilter(filter);
    }

    function arrangePostsByDate(byNewest: boolean) {
        if (byNewest != postsArrangedByNewest) {
            let arrangedPosts: Post[] = [...posts].reverse();
            setPosts(arrangedPosts);
            setPostsArrangedByNewest(byNewest);
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
            .post<{
                newPostComment: PostComment;
                success: boolean;
                message: string;
            }>(`${API_ENDPOINT}/api/post/postComment`, {
                userId: userInfo?.id,
                postId: selectedPost?.id,
                comment: newCommentInput,
            })
            .then((response) => {
                if (response.data.success) {
                    refreshComments();
                    setNewCommentInput("");
                } else {
                    toastErrorMessage("댓글 생성에 실패했습니다.");
                }
            })
            .catch((error) => {
                toastErrorMessage("댓글 생성에 실패했습니다.");
                console.error(error);
            })
            .finally(() => {
                setAddingComment(false);
            });
    }

    async function refreshComments() {
        await axios
            .get<{ post: Post; success: boolean; message: string }>(
                `${API_ENDPOINT}/api/post/post/${selectedPost?.id}`
            )
            .then((response) => {
                if (response.data.success) {
                    setSelectedPost(response.data.post);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        getPosts();
    }

    const roomPostboardContext = {
        posts,
        postCreateOpened,
        createPostAsAnonymous,
        createPostAsQuestion,
        newPostTitleInput,
        newPostContentsInput,
        postCreating,
        postFilter,
        postsArrangedByNewest,
        selectedPost,
        postCommentsOpen,
        newCommentInput,
        addingComment,
        getPosts,
        togglePostLike,
        togglePostScrap,
        openPostCreate,
        closePostCreate,
        createPost,
        toggleCreatePostAsAnonymous,
        toggleCreatePostAsQuestion,
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
