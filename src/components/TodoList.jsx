import React, { useContext } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import TodoContext from "../context/TodoContext";
import Heading from "./Heading";

const TodoList = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="space-y-6">
      <Heading />
      <TodoInput />
      <section>
        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="mt-16 text-center">
              <img
                src="/src/assets/empty.svg"
                alt="No tasks yet"
                className="mx-auto w-42"
                draggable="false"
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
