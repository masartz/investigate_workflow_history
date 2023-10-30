import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { ImcompleteTodos } from "./components/ImcompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
    const [todoText, setTodoText] = useState("");
    const [imcompleteTodos, setImcompleteTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);

    const onChangeTodoText = (event) => setTodoText(event.target.value);

    const onClickAdd = () => {
        if (todoText === "") return;
        const newTodos = [...imcompleteTodos, todoText];
        setImcompleteTodos(newTodos);
        setTodoText("");
    };

    const onClickDelete = (index) => {
        const newTodos = [...imcompleteTodos];
        newTodos.splice(index, 1);
        setImcompleteTodos(newTodos);
    };

    const onClickComplete = (index) => {
        const newImCompleteTodos = [...imcompleteTodos];
        newImCompleteTodos.splice(index, 1);
        setImcompleteTodos(newImCompleteTodos);

        const newCompleteTodos = [...completeTodos, imcompleteTodos[index]];
        setCompleteTodos(newCompleteTodos);
    };

    const onClickBack = (index) => {
        const newCompleteTodos = [...completeTodos];
        newCompleteTodos.splice(index, 1);
        setCompleteTodos(newCompleteTodos);

        const newImCompleteTodos = [...imcompleteTodos, completeTodos[index]];
        setImcompleteTodos(newImCompleteTodos);
    };

    return (
        <>
            <InputTodo
                todotext={todoText}
                onChange={onChangeTodoText}
                onClick={onClickAdd}
                disabled={imcompleteTodos.length >= 5}
            />
            {imcompleteTodos.length >= 5 && (
                <p style={{ color: "red" }}>登録できるtodoは5こまで</p>
            )}
            <ImcompleteTodos
                todos={imcompleteTodos}
                onClickComplete={onClickComplete}
                onClickDelete={onClickDelete}
            />
            <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
        </>
    );
};
