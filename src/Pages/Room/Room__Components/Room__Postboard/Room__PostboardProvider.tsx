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
    postUpdateOpened: boolean;
    updatePostTitleInput: string;
    updatePostContentsInput: string;
    postCreating: boolean;
    postUpdating: boolean;
    postDeleting: boolean;
    postFilter: PostFilter;
    postsArrangedByNewest: boolean;
    selectedPost: Post | null;
    postCommentsOpen: boolean;
    newCommentInput: string;
    addingComment: boolean;
    deletingComment: boolean;
    getPosts: () => void;
    togglePostLike: (targetPost: Post) => void;
    togglePostScrap: (targetPost: Post) => void;
    openPostCreate: () => void;
    closePostCreate: () => void;
    createPost: () => void;
    toggleCreatePostAsAnonymous: () => void;
    toggleCreatePostAsQuestion: () => void;
    togglePostUpdateOpen: (targetPost: Post) => void;
    closePostUpdate: () => void;
    updatePost: (targetPost: Post) => void;
    deletePost: (targetPost: Post) => void;
    filteringPosts: (filter: PostFilter) => void;
    arrangePostsByDate: (byNewest: boolean) => void;
    showPostDetail: (post: Post) => void;
    closePostDetail: () => void;
    togglePostCommentsOpen: () => void;
    closePostComments: () => void;
    addComment: () => void;
    deleteComment: (targerPostComment: PostComment) => void;
    setNewPostTitleInput: (input: string) => void;
    setNewPostContentsInput: (input: string) => void;
    setUpdatePostTitleInput: (input: string) => void;
    setUpdatePostContentsInput: (input: string) => void;
    setNewCommentInput: (input: string) => void;
    getUpdatedAt: (targetPost: Post) => string;
}

const InitialRoomPostboardContext: RoomPostboardContext = {
    posts: [],
    postCreateOpened: false,
    createPostAsAnonymous: false,
    createPostAsQuestion: false,
    newPostTitleInput: "",
    newPostContentsInput: "",
    postUpdateOpened: false,
    updatePostTitleInput: "",
    updatePostContentsInput: "",
    postCreating: false,
    postUpdating: false,
    postDeleting: false,
    postFilter: PostFilter.ALL,
    postsArrangedByNewest: true,
    selectedPost: null,
    postCommentsOpen: false,
    newCommentInput: "",
    addingComment: false,
    deletingComment: false,
    getPosts: () => {},
    togglePostLike: () => {},
    togglePostScrap: () => {},
    openPostCreate: () => {},
    closePostCreate: () => {},
    createPost: () => {},
    toggleCreatePostAsAnonymous: () => {},
    toggleCreatePostAsQuestion: () => {},
    togglePostUpdateOpen: () => {},
    closePostUpdate: () => {},
    updatePost: () => {},
    deletePost: () => {},
    filteringPosts: () => {},
    arrangePostsByDate: () => {},
    showPostDetail: () => {},
    closePostDetail: () => {},
    togglePostCommentsOpen: () => {},
    closePostComments: () => {},
    addComment: () => {},
    deleteComment: () => {},
    setNewPostTitleInput: () => {},
    setNewPostContentsInput: () => {},
    setUpdatePostTitleInput: () => {},
    setUpdatePostContentsInput: () => {},
    setNewCommentInput: () => {},
    getUpdatedAt: () => "",
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
    const [postUpdateOpened, setPostUpdateOpened] = useState<boolean>(false);
    const [updatePostTitleInput, setUpdatePostTitleInput] = useState<string>("");
    const [updatePostContentsInput, setUpdatePostContentsInput] =
        useState<string>("");
    const [postCreating, setPostCreating] = useState<boolean>(false);
    const [postUpdating, setPostUpdating] = useState<boolean>(false);
    const [postDeleting, setPostDeleting] = useState<boolean>(false);
    const [postFilter, setPostFilter] = useState<PostFilter>(PostFilter.ALL);
    const [postsArrangedByNewest, setPostsArrangedByNewest] =
        useState<boolean>(true);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [postCommentsOpen, setPostCommentsOpen] = useState<boolean>(false);
    const [newCommentInput, setNewCommentInput] = useState<string>("");
    const [addingComment, setAddingComment] = useState<boolean>(false);
    const isPublicRoom = roomUsingInfo && roomUsingInfo.roomId.includes('public');
    const [deletingComment, setDeletingComment] = useState<boolean>(false);

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
                .get(isPublicRoom ? `${API_ENDPOINT}/api/post/roomPublic/${roomUsingInfo.roomId.split('public')[1]}` : `${API_ENDPOINT}/api/post/room/${roomUsingInfo.roomId}`)
                .then((response) => {
                    if (response.data.success) {
                        if(isPublicRoom) {
                            setPosts(response.data.posts);
                            setWholePosts(response.data.posts);
                        } else {
                            setPosts(response.data.posts.posts);
                            setWholePosts(response.data.posts.posts);
                        }
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
            .get(isPublicRoom ? `${API_ENDPOINT}/api/post/roomPublic/${roomUsingInfo!.roomId.split('public')[1]}` : `${API_ENDPOINT}/api/post/room/${roomUsingInfo!.roomId}`)
            .then((response) => {
                if (response.data.success) {
                    setPosts(isPublicRoom ? response.data.posts : response.data.posts.posts);
                    setWholePosts(isPublicRoom ? response.data.posts : response.data.posts.posts);
                    if (selectedPost?.id == postId) {
                        const renewalSelectedPost =
                            response.data.posts.posts.find((post: any) => {
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
                isPublicRoom ? `${API_ENDPOINT}/api/post/postPublic` : `${API_ENDPOINT}/api/post/post`,
                {
                    userId: userInfo?.id,
                    roomId: isPublicRoom ? Number(roomUsingInfo?.roomId.split('public')[1]) : roomUsingInfo?.roomId,
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

    function togglePostUpdateOpen(selectedPost: Post) {
        setPostUpdateOpened(!postUpdateOpened);
        setUpdatePostTitleInput(selectedPost.title);
        setUpdatePostContentsInput(selectedPost.contents);
        //closePostDetail();
    }

    function closePostUpdate() {
        setPostUpdateOpened(false);
        closePostDetail();
    }

    async function updatePost(selectedPost: Post|null) {
        if (postUpdating) {
            return;
        }
        setPostUpdating(true);
    
        await axios.put<{
            success: boolean;
            message: string;
        }>(`${API_ENDPOINT}/api/post/post/${selectedPost!.id}`, {
            postId: selectedPost!.id,
            postTitle: updatePostTitleInput,
            postContents: updatePostContentsInput,
          })
          .then((response) => {
                    if (response.data.success) {
                        setPosts(posts.map(post => (post.id === selectedPost!.id) ? {...post, title: updatePostTitleInput, contents : updatePostContentsInput} : post));
                    } else {
                        toastErrorMessage("글 수정에 실패했습니다.");
                    }
                })
                .catch((error) => {
                    toastErrorMessage("글 수정에 실패했습니다.");
                    console.error(error);
                })
                .finally(() => {
                    setPostUpdating(false);
                });
       }

    async function deletePost(selectedPost:Post|null) {
        await axios
                .delete<{ success: boolean }>(
                    `${API_ENDPOINT}/api/post/post/${selectedPost!.id}`
                )
                .then((response) => {
                    if (response.data.success) {
                        //getPosts();
                        setPosts(posts.filter(post => post.id !== selectedPost!.id));
                        closePostDetail();
                    } else {
                        toastErrorMessage("포스트 삭제에 실패했습니다.");
                    }
                })
                .catch((error) => {
                    toastErrorMessage("포스트 삭제에 실패했습니다.");
                    console.error(error);
                })
                .finally(() => {
                    setPostDeleting(false);
                });
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

    async function deleteComment(postComment: PostComment) {
        if (deletingComment) {
            return;
        }
        setDeletingComment(true);
    
             await axios.delete<{ success: boolean }>(
                    `${API_ENDPOINT}/api/post/postComment/${postComment.id}`
                )
                .then((response) => {
                    if (response.data.success) {
                        refreshComments();
                    } else {
                        toastErrorMessage("댓글 삭제에 실패했습니다.");
                    }
                })
                .catch((error) => {
                    toastErrorMessage("댓글 삭제에 실패했습니다.");
                    console.error(error);
                })
                .finally(() => {
                    setDeletingComment(false);
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

    function getUpdatedAt(selectedPost: Post) {
        let updatedAt = selectedPost!.updatedAt.toString().slice(2,16).replace(/\-/g,'/').replace('T',' ');
        return updatedAt;
    }

    const roomPostboardContext = {
        posts,
        postCreateOpened,
        createPostAsAnonymous,
        createPostAsQuestion,
        newPostTitleInput,
        newPostContentsInput,
        postUpdateOpened,
        updatePostTitleInput,
        updatePostContentsInput,
        postCreating,
        postUpdating,
        postDeleting,
        postFilter,
        postsArrangedByNewest,
        selectedPost,
        postCommentsOpen,
        newCommentInput,
        addingComment,
        deletingComment,
        getPosts,
        togglePostLike,
        togglePostScrap,
        openPostCreate,
        closePostCreate,
        createPost,
        toggleCreatePostAsAnonymous,
        toggleCreatePostAsQuestion,
        togglePostUpdateOpen,
        closePostUpdate,
        updatePost,
        deletePost,
        filteringPosts,
        arrangePostsByDate,
        showPostDetail,
        closePostDetail,
        togglePostCommentsOpen,
        closePostComments,
        addComment,
        deleteComment,
        setNewPostTitleInput,
        setNewPostContentsInput,
        setUpdatePostTitleInput,
        setUpdatePostContentsInput,
        setNewCommentInput,
        getUpdatedAt,
    };

    return (
        <RoomPostboardContext.Provider value={roomPostboardContext}>
            {children}
        </RoomPostboardContext.Provider>
    );
}
