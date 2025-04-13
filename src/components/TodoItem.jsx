import { Check, Trash2 } from "lucide-react";
import React, { useContext } from "react";
import TodoContext from "../context/TodoContext";
import { toast } from "sonner";

const TodoItem = ({ todo: { id, text, completed } }) => {
  const { deleteTodo, markComplete } = useContext(TodoContext);

  const handleDelete = () => {
    toast.message(`Are you sure you want to delete?`, {
      description: `Delete "${text}"?`,
      action: {
        label: "Yes, Delete",
        onClick: () => {
          deleteTodo(id);
          toast.success("Task deleted.");
        },
      },
    });
  };

  const handleToggleComplete = () => {
    markComplete(id);

    if (completed) {
      toast.info(`"${text}" marked as incomplete. 📢`);
    } else {
      toast.success(`"${text}" marked as complete. 🎉`);
    }
  };

  return (
    <div className="group flex transform items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white p-3 transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleToggleComplete}
          className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors duration-300 ${
            completed
              ? "border-stone-950 bg-stone-950 text-white"
              : "border-stone-200 bg-white text-stone-500"
          }`}
        >
          <Check size={16} />
        </button>
        <p
          className={`text-sm transition-colors duration-300 ${
            completed ? "text-stone-950/90 line-through" : "text-stone-900"
          }`}
        >
          {text}
        </p>
      </div>
      <div
        className="rounded-md p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-stone-100 hover:text-stone-800"
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
      </div>
    </div>
  );
};

export default TodoItem;
