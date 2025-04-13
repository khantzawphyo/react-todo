import React, { useContext } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import TodoContext from "../context/TodoContext";
import Heading from "./Heading";
import { Toaster } from "sonner";

const TodoList = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="space-y-6">
      <Heading />

      <TodoInput />
      <Toaster closeButton richColors position="top-right" />

      <section>
        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="text-center mt-16">
              <img
                src="/src/assets/empty.svg"
                alt="No tasks yet"
                className="mx-auto w-48"
              />
            </div>
          ) : (
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default TodoList;
