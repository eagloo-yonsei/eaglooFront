import React, {
    RefObject,
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from "react";
import axios from "axios";
import { useAppContext } from "../../Routes/App/AppProvider";
import { toastErrorMessage } from "../../Utils";
import { ChildrenProp, Task, API_ENDPOINT } from "../../Constants";

interface TaskContextProp {
    taskOpen: boolean;
    taskSorted: boolean;
    sortedByImportanceAscending: boolean;
    tasks: Task[];
    newTaskInput: string;
    newTaksDday: Date | null;
    newTaskImportance: number;
    taskLoading: boolean;
    taskLoadingError: boolean;
    taskUploading: boolean;
    toggleTaskOpen: () => void;
    sortTasksByImportance: (changeStandard: boolean) => void;
    setNewTaskInput: (input: string) => void;
    setNewTaskDday: (input: Date) => void;
    selectNewTaskImportance: (importance: number) => void;
    createTask: () => void;
    updateTask: (
        id: string,
        done?: boolean,
        content?: string,
        importance?: number
    ) => Promise<boolean>;
    deleteTask: (id: string) => void;
    newTaskInputRef?: RefObject<HTMLInputElement>;
}

const InitialTaskContext: TaskContextProp = {
    taskOpen: true,
    taskSorted: false,
    sortedByImportanceAscending: false,
    tasks: [],
    newTaskInput: "",
    newTaksDday: null,
    newTaskImportance: 1,
    taskLoading: false,
    taskLoadingError: false,
    taskUploading: false,
    toggleTaskOpen: () => {},
    sortTasksByImportance: () => {},
    setNewTaskInput: () => {},
    setNewTaskDday: () => {},
    selectNewTaskImportance: () => {},
    createTask: () => {},
    updateTask: () => {
        return new Promise(() => false);
    },
    deleteTask: () => {},
};

const TaskContext = createContext<TaskContextProp>(InitialTaskContext);
export const useTaskContext = () => useContext(TaskContext);

export default function TaskProvider({ children }: ChildrenProp) {
    const { userInfo } = useAppContext();
    const [taskOpen, setTaskOpen] = useState<boolean>(true);
    const [taskSorted, setTaskSorted] = useState<boolean>(false);
    const [sortedByImportanceAscending, setSortedByImportanceAscending] =
        useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskInput, setNewTaskInput] = useState<string>("");
    const [newTaksDday, setNewTaskDday] = useState<Date | null>(null);
    const [newTaskImportance, setNewTaskImportance] = useState<number>(1);
    const [taskLoading, setTaskLoading] = useState<boolean>(false);
    const [taskLoadingError, setTaskLoadingError] = useState<boolean>(false);
    const [taskUploading, setTaskUploading] = useState<boolean>(false);
    const newTaskInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadTask();
        return () => {};
    }, [userInfo]);

    function toggleTaskOpen() {
        setTaskOpen(!taskOpen);
    }

    async function loadTask() {
        if (!userInfo) {
            return;
        }
        setTaskLoading(true);
        await axios
            .get<{ success: boolean; message: string; tasks: Task[] }>(
                `${API_ENDPOINT}/api/task/${userInfo?.email}`
            )
            .then((response) => {
                if (response.data.success) {
                    setTasks(response.data.tasks);
                    // sortTasksByImportance(false);
                } else {
                    toastErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                setTaskLoadingError(true);
                toastErrorMessage("일정을 불러오는 데 실패했습니다.");
            })
            .finally(() => {
                setTaskLoading(false);
            });
    }

    async function updateTask(
        id: string,
        done?: boolean,
        content?: string,
        importance?: number
    ) {
        // NOTE !#axios !#await !#Promise Context
        // Promise 객체를 반환하는 Context의 함수는 axios의 .then 부분에서 return 시키는 방식으로 사용할 수 없음
        const response = await axios
            .put<{ success: boolean; message: string }>(
                `${API_ENDPOINT}/api/task`,
                {
                    taskId: id,
                    done,
                    content,
                    importance,
                }
            )
            .catch((error) => {
                console.error(error);
                return {
                    data: {
                        success: false,
                        message: "일정 수정 중 오류가 발생했어요",
                    },
                };
            });
        if (response.data.success) {
            return true;
        } else {
            toastErrorMessage(response.data.message);
            return false;
        }
    }

    async function deleteTask(id: string) {
        await axios
            .delete<{ success: boolean; message: string }>(
                `${API_ENDPOINT}/api/task/${id}`
            )
            .then((response) => {
                if (response.data.success) {
                    setTasks((tasks) =>
                        tasks.filter((task) => {
                            return task.id !== id;
                        })
                    );
                } else {
                    toastErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                toastErrorMessage("일정 삭제 중 문제가 발생했어요");
            });
    }

    function sortTasksByImportance(changeStandard: boolean) {
        if (!taskSorted) {
            setTaskSorted(true);
        }
        let arrangedTasks = [...tasks];
        if (changeStandard) {
            setSortedByImportanceAscending(!sortedByImportanceAscending);
        }
        arrangedTasks.sort((a, b) => {
            return sortedByImportanceAscending
                ? b.importance - a.importance
                : a.importance - b.importance;
        });
        setTasks(arrangedTasks);
    }

    function selectNewTaskImportance(importance: number) {
        setNewTaskImportance(importance);
    }

    async function createTask() {
        setTaskUploading(true);
        await axios
            .post<{ success: boolean; message: string; task: Task }>(
                `${API_ENDPOINT}/api/task`,
                {
                    email: userInfo?.email,
                    content: newTaskInput,
                    importance: newTaskImportance,
                }
            )
            .then((response) => {
                if (response.data.success) {
                    setTasks((tasks) => [...tasks, response.data.task]);
                    setNewTaskInput("");
                    setNewTaskImportance(1);
                } else {
                    toastErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                toastErrorMessage("일정 추가 중 오류가 발생했습니다.");
            })
            .finally(() => {
                setTaskUploading(false);
                newTaskInputRef?.current?.focus();
            });
    }

    const taskContext = {
        taskOpen,
        taskSorted,
        sortedByImportanceAscending,
        tasks,
        newTaskInput,
        newTaksDday,
        newTaskImportance,
        taskLoading,
        taskLoadingError,
        taskUploading,
        toggleTaskOpen,
        sortTasksByImportance,
        setNewTaskInput,
        setNewTaskDday,
        selectNewTaskImportance,
        createTask,
        updateTask,
        deleteTask,
        newTaskInputRef,
    };

    return (
        <TaskContext.Provider value={taskContext}>
            {children}
        </TaskContext.Provider>
    );
}
