import { useContext } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import TodoContext from "../context/TodoContext";
import Heading from "./Heading";
import TodoFilters from "./TodoFilters";

const TodoList = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="space-y-6">
      <Heading />
      <TodoInput />
      <TodoFilters />
      <section>
        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="mt-16 text-center">
              <img
                src="/empty.svg"
                alt="No tasks yet"
                className="mx-auto w-36"
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