import { Check, Edit2, Save, Trash2, X, Calendar, Flag } from "lucide-react";
import React, { useContext, useState } from "react";
import TodoContext, { PRIORITY_LEVELS } from "../context/TodoContext";
import { toast } from "sonner";

const TodoItem = ({ todo }) => {
  const { updateTodo, deleteTodo, markComplete } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [editedPriority, setEditedPriority] = useState(todo.priority);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);

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

    updateTodo(todo.id, {
      text: trimmed,
      priority: editedPriority,
      dueDate: editedDueDate,
    });
    setIsEditing(false);
    toast.success("Task updated.");
  };

  const handleCancel = () => {
    setEditedText(todo.text);
    setEditedPriority(todo.priority);
    setEditedDueDate(todo.dueDate);
    setIsEditing(false);
  };

  const handleDelete = () => {
    toast.message(`Are you sure you want to delete?`, {
      description: `Delete "${todo.text}"?`,
      action: {
        label: "Yes, Delete",
        onClick: () => {
          deleteTodo(todo.id);
          toast.success("Task deleted.");
        },
      },
    });
  };

  const handleToggleComplete = () => {
    markComplete(todo.id);

    if (todo.completed) {
      toast.info(`"${todo.text}" marked as incomplete. 📢`);
    } else {
      toast.success(`"${todo.text}" marked as complete. 🎉`);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.HIGH:
        return "text-red-500";
      case PRIORITY_LEVELS.MEDIUM:
        return "text-yellow-500";
      case PRIORITY_LEVELS.LOW:
        return "text-green-500";
      default:
        return "text-stone-500";
    }
  };

  return (
    <div className="group flex transform items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white p-3 transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleToggleComplete}
          className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors duration-300 ${
            todo.completed
              ? "border-stone-950 bg-stone-950 text-white"
              : "border-stone-200 bg-white text-stone-500"
          }`}
        >
          <Check size={16} />
        </button>
        {isEditing ? (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={editedText}
              className="rounded-md border px-2 py-1 text-sm"
              onChange={handleEditText}
              onKeyDown={handleEditKeyDown}
              autoFocus
            />
            <div className="flex space-x-2">
              <select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                className="rounded-md border border-stone-200 px-2 py-1 text-sm"
              >
                <option value={PRIORITY_LEVELS.LOW}>Low</option>
                <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
                <option value={PRIORITY_LEVELS.HIGH}>High</option>
              </select>
              <input
                type="date"
                value={editedDueDate || ""}
                onChange={(e) => setEditedDueDate(e.target.value)}
                className="rounded-md border border-stone-200 px-2 py-1 text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <p
              className={`text-sm transition-colors duration-300 ${
                todo.completed ? "text-stone-950/90 line-through" : "text-stone-900"
              }`}
            >
              {todo.text}
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Flag className={`h-3 w-3 ${getPriorityColor(todo.priority)}`} />
              {todo.dueDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
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