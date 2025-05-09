import { Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import TodoContext, { PRIORITY_LEVELS } from "../context/TodoContext";
import { toast } from "sonner";

const TodoInput = () => {
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState(PRIORITY_LEVELS.MEDIUM);
  const [dueDate, setDueDate] = useState("");
  const { addTodo } = useContext(TodoContext);

  const handleOnChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      toast.error("Oops! Please enter a task to add.");
      return;
    }
    const todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      priority,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
    };
    toast.success(`Task added: "${newTodo}".`);
    addTodo(todo);
    setNewTodo("");
    setPriority(PRIORITY_LEVELS.MEDIUM);
    setDueDate("");
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Add a new task..."
          className="focus-visible:ring-ring h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-base ring-offset-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          value={newTodo}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
        />
        <button
          className="inline-flex h-10 items-center justify-center rounded-md bg-stone-950 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-stone-950/90"
          onClick={handleAddTodo}
        >
          <Plus className="h-4 w-4" aria-label="Add Task" />
        </button>
      </div>
      <div className="flex space-x-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-md border border-stone-200 px-2 py-1 text-sm"
        >
          <option value={PRIORITY_LEVELS.LOW}>Low Priority</option>
          <option value={PRIORITY_LEVELS.MEDIUM}>Medium Priority</option>
          <option value={PRIORITY_LEVELS.HIGH}>High Priority</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-md border border-stone-200 px-2 py-1 text-sm"
        />
      </div>
    </div>
  );
};

export default TodoInput;