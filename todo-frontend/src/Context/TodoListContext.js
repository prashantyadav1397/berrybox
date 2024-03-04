import { useState, useRef, createContext, useEffect } from "react";
import { createTodo, getAllTodos, updateTodo, deleteTodo } from "./../APIs/todoBackend";

const ToDoListContext = createContext();

const ToDoListContextProvider = ({ children }) => {
    const fetchTodos = async () => {
        try {
            const todos = await getAllTodos();
            setTodos([...todos]);
        } catch (error) {
            console.error(error);
        }
    };

    const [todoText, setTodoText] = useState("");
    const [currentId, setCurremtId] = useState("");
    const [isEmptyInput, setIsEmptyInput] = useState(false);
    const [isDescending, setIsDescending] = useState(true);
    const [todos, setTodos] = useState([]);
    const inputRef = useRef();
    // states for snackbar tracking
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        severity: "",
        message: ""
    });

    useEffect(() => {
        fetchTodos();
        return () => {
            setTodos([]);
        };
    }, []);

    // handle submit event
    const onInputSubmit = async (e) => {

        if ((todoText.length === 0 || todoText === "")) {
            setIsEmptyInput(true);
        }

        if (e.keyCode === 13 && currentId && currentId.length === 36) {
            await updateTodo(currentId, todoText);
            setCurremtId("");
            setTodoText("");
            setSnackbarState({
                open: true,
                severity: "info",
                message: 'Todo edited successfully!'
            })
            await fetchTodos();
            return;
        }

        if (((e.keyCode === 13 && todoText !== "") || (e.type === "click" && todoText !== ""))) {
            await createTodo(todoText);
            setTodoText("");
            setSnackbarState({
                open: true,
                severity: "success",
                message: 'Todo added successfully!'
            });
            await fetchTodos();
        }
    };

    // handle edit
    const onEditTodo = (id) => {
        console.log(id)
        const edited = todos.find((et) => et.id === id);
        inputRef.current.focus();
        setTodoText(edited.todoItem);
        setCurremtId(id);
    };

    // handle delete
    const onDelete = async (id) => {
        if (id !== undefined) {
            await deleteTodo(id);
            await fetchTodos();
            setSnackbarState({
                open: true,
                severity: "error",
                message: 'Todo deleted successfully!'
            });
        }
    };

    // handles sorting of todos items
    const onSortTodos = (todos) => {

        if (todos.length === 0) {
            setSnackbarState({
                open: true,
                severity: "warning",
                message: 'No todo\'s available. Add more to perform this action!'
            });
        } else {
            todos.sort((a, b) => {
                return (isDescending
                    ? a.id.localeCompare(b.id)
                    : b.id.localeCompare(a.id))
            });
            setTodos([...todos]);
            setSnackbarState({
                open: true,
                severity: "info",
                message: isDescending
                    ? 'Sorted in descending order!'
                    : 'Sorted in ascending order!'
            });
        }
    }

    const valueToShare = {
        todoText,
        setTodoText,
        currentId,
        setCurremtId,
        todos,
        setTodos,
        inputRef,
        onInputSubmit,
        onEditTodo,
        onDelete,
        isEmptyInput,
        setIsEmptyInput,
        snackbarState,
        setSnackbarState,
        isDescending,
        setIsDescending,
        onSortTodos,
    }

    return (
        <ToDoListContext.Provider value={valueToShare}>
            {children}
        </ToDoListContext.Provider>
    )
}

export { ToDoListContextProvider };
export default ToDoListContext;
