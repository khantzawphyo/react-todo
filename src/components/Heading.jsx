import { useContext } from "react";
import TodoContext from "../context/TodoContext";

const Heading = () => {
  const { todos } = useContext(TodoContext);
  const remainingTodos = todos.filter((todo) => !todo.completed).length;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          Tasks
        </h1>
        {remainingTodos > 0 && (
          <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-600 ring-1 ring-violet-600/20">
            {remainingTodos}/{todos.length}
          </span>
        )}
      </div>
      <p className="text-stone-600">
        {todos.length === 0
          ? "No tasks yet. Add one to get started!"
          : remainingTodos === 0
            ? "All tasks complete! 🎉"
            : `You have ${remainingTodos} task${remainingTodos === 1 ? "" : "s"} remaining.`}
      </p>
    </div>
  );
};

export default Heading;