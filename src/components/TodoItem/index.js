import React, { memo } from "react";

import "./style.css";

function Todo({ todo, updateTodo, deleteTodo }) {
  const checkTodo = todo.status ? `line-through` : "";

  return (
    <div data-testid="item" className="Card">
      <div className="Card--text">
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className="Card--button">
        <button
          data-testid={`up-${todo._id}`}
          onClick={() => updateTodo(todo)}
          className={todo.status ? `hide-button` : "Card--button__done"}
        >
          Complete
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          data-testid={`del-${todo._id}`}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default memo(Todo);
