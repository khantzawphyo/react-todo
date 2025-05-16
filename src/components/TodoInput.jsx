import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import TodoContext, { PRIORITY_LEVELS } from "../context/TodoContext";
import { toast } from "sonner";

const TodoInput = () => {
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState(PRIORITY_LEVELS.MEDIUM);
  const [dueDate, setDueDate] = useState("");
  const { addTodo } = useContext(TodoContext);

  const handleOnChange = (e) => setNewTodo(e.target.value);
  const handleOnKeyDown = (e) => e.key === "Enter" && handleAddTodo();

  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      toast.error("Please enter a task to add.");
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
    
    addTodo(todo);
    toast.success(`Task added: "${newTodo}"`);
    setNewTodo("");
    setPriority(PRIORITY_LEVELS.MEDIUM);
    setDueDate("");
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a new task..."
          className="todo-input"
          value={newTodo}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
        />
        <button className="btn-primary" onClick={handleAddTodo}>
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10"
        >
          <option value={PRIORITY_LEVELS.LOW}>Low Priority</option>
          <option value={PRIORITY_LEVELS.MEDIUM}>Medium Priority</option>
          <option value={PRIORITY_LEVELS.HIGH}>High Priority</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10"
        />
      </div>
    </div>
  );
};

export default TodoInput;