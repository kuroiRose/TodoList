import List from "@mui/material/List";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Box, Typography, Snackbar } from "@mui/material";

import { useState, useEffect } from "react";

const getInitialData = () => {
    try {
        const data = JSON.parse(localStorage.getItem("todos"));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error reading from localStorage:", error);
        return [];
    }
};

export default function TodoList() {
    const [todos, setTodos] = useState(getInitialData);
    const [error, setError] = useState("");

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const removeTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((t) => t.id !== id);
        });
    };

    const toggleTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                } else {
                    return todo;
                }
            });
        });
    };

    const addTodo = (text) => {
        const trimmedText = text.trim();
        if (!trimmedText) {
            setError("Todo cannot be empty!");
            return;
        }

        setTodos((prevTodos) => {
            if (prevTodos.some((todo) => todo.text === trimmedText)) {
                setError("Todo already exists!");
                return prevTodos;
            }
            return [
                ...prevTodos,
                { text: trimmedText, id: crypto.randomUUID(), completed: false },
            ];
        });
    };

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            m: 3
        }}>

            <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>Todos</Typography>
            {todos.length === 0 && (
                <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>No todos yet. Start adding some!</Typography>
            )}

            <TodoForm addTodo={addTodo} />

            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                {todos.map((todo) => (
                    <TodoItem todo={todo} key={todo.id} remove={removeTodo} toggle={() => toggleTodo(todo.id)} />
                ))}

            </List>

            <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError("")} message={error} />
        </Box>
    );
}
