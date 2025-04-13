import React, { useState } from "react";
import TodoContext from "./TodoContext";

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, deleteTodo, markComplete }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
