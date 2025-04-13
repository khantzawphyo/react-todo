import React, { useContext } from "react";
import TodoContext from "../context/TodoContext";

const Heading = () => {
  const { todos } = useContext(TodoContext);
  const remainingTodos = todos.filter((todo) => !todo.completed).length;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Tasks
        </h1>
        <span
          className={`rounded-full bg-[#adfa1d] px-2 py-1 text-xs font-medium text-black ${remainingTodos === 0 ? "hidden" : ""}`}
        >
          {remainingTodos}/{todos.length}
        </span>
      </div>
      <p className="text-stone-500">
        {todos.length === 0
          ? "No tasks yet. Add one to get started!"
          : remainingTodos === 0
            ? "All tasks complete 🎉"
            : `You have ${remainingTodos} task${remainingTodos === 1 ? "" : "s"} to complete.`}
      </p>
    </div>
  );
};

export default Heading;
