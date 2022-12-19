import React, { memo, useEffect, useState } from "react";

import TodoItem from "./components/TodoItem";
import FormComponent from "./components/FormComponent";
import {
  useGetFullListTodoMutation,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../src/services";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const [getFullTodoList] = useGetFullListTodoMutation();
  const [postTodo] = usePostTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  useEffect(() => {
    (async () => {
      const { data: todoData } = await getFullTodoList();
      setTodos(todoData);
    })();
  }, [getFullTodoList]);

  const handleSaveTodo = async (e, formData) => {
    e.preventDefault();
    const { data: todoData } = await postTodo(formData);
    setTodos(todoData);
  };

  const handleUpdateTodo = async (todo) => {
    const id = todo._id;
    const { data: todoData } = await updateTodo(id);
    setTodos(todoData);
  };

  const handleDeleteTodo = async (_id) => {
    const { data: todoData } = await deleteTodo(_id);
    setTodos(todoData);
  };

  return (
    <div className="App">
      <h1>My Todos</h1>
      <FormComponent saveTodo={handleSaveTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </div>
  );
}

export default memo(App);
