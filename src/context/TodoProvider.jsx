import React, { useState } from "react";
import TodoContext, { FILTERS } from "./TodoContext";

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [searchQuery, setSearchQuery] = useState("");

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, updates) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)),
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

  const getFilteredTodos = () => {
    return todos
      .filter((todo) => {
        // Filter by status
        if (filter === FILTERS.ACTIVE) return !todo.completed;
        if (filter === FILTERS.COMPLETED) return todo.completed;
        return true;
      })
      .filter((todo) => {
        // Filter by search query
        if (!searchQuery) return true;
        return todo.text.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        // Sort by priority and due date
        if (a.priority !== b.priority) {
          const priorities = { high: 3, medium: 2, low: 1 };
          return priorities[b.priority] - priorities[a.priority];
        }
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return 0;
      });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: getFilteredTodos(),
        addTodo,
        updateTodo,
        deleteTodo,
        markComplete,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;