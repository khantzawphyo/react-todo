import { Check, Edit2, Save, Trash2, X } from "lucide-react";
import React, { useContext, useState } from "react";
import TodoContext from "../context/TodoContext";
import { toast } from "sonner";

const TodoItem = ({ todo: { id, text, completed } }) => {
  const { updateTodo, deleteTodo, markComplete } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditText = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleSaveEdit = () => {
    const trimmed = editedText.trim();
    if (trimmed === "") {
      toast.error("Task cannot be empty.");
      return;
    }

    if (trimmed === text.trim()) {
      toast.info("No changes made.");
      setIsEditing(false);
      return;
    }

    updateTodo(id, editedText.trim());
    setIsEditing(false);
    toast.success("Task updated.");
  };

  const handleCancel = () => {
    setEditedText(text);
    setIsEditing(false);
  };

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
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            className="rounded-md border px-2 py-1 text-sm"
            onChange={handleEditText}
            onKeyDown={handleEditKeyDown}
            autoFocus
          />
        ) : (
          <p
            className={`text-sm transition-colors duration-300 ${
              completed ? "text-stone-950/90 line-through" : "text-stone-900"
            }`}
          >
            {text}
          </p>
        )}
      </div>

      {isEditing ? (
        <div className="flex items-center justify-center gap-1">
          <button
            className="rounded-md p-2 opacity-100 transition-opacity duration-300 hover:bg-stone-100 hover:text-stone-800"
            onClick={handleSaveEdit}
            title="Save"
          >
            <Save className="h-4 w-4" />
          </button>
          <button
            className="rounded-md p-2 opacity-100 transition-opacity duration-300 hover:bg-stone-100 hover:text-stone-800"
            onClick={handleCancel}
            title="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-1">
          <button
            className="rounded-md p-2 opacity-100 transition-opacity duration-300 hover:bg-stone-100 hover:text-stone-800 sm:hidden"
            onClick={handleEdit}
            title="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            className="rounded-md p-2 opacity-100 transition-opacity duration-300 hover:bg-stone-100 hover:text-stone-800 sm:hidden"
            onClick={handleDelete}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            className="hidden rounded-md p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-stone-100 hover:text-stone-800 sm:flex"
            onClick={handleEdit}
            title="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            className="hidden rounded-md p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-stone-100 hover:text-stone-800 sm:flex"
            onClick={handleDelete}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
