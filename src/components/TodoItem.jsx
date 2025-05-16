import { Check, Edit2, Save, Trash2, X, Calendar, Flag } from "lucide-react";
import { useContext, useState } from "react";
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
      toast.info(`📢 "${todo.text}" marked as incomplete.`);
    } else {
      toast.success(`🎉 "${todo.text}" marked as complete.`);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.HIGH:
        return "bg-red-100 text-red-600";
      case PRIORITY_LEVELS.MEDIUM:
        return "bg-yellow-100 text-yellow-600";
      case PRIORITY_LEVELS.LOW:
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.HIGH:
        return "High";
      case PRIORITY_LEVELS.MEDIUM:
        return "Medium";
      case PRIORITY_LEVELS.LOW:
        return "Low";
      default:
        return "None";
    }
  };

  return (
    <div
      className={`group relative flex items-center justify-between gap-4 rounded-xl p-4 transition-all duration-200 ${
        todo.completed
          ? "bg-gray-50 opacity-90"
          : "bg-white shadow-sm hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={handleToggleComplete}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
          todo.completed
            ? "border-gray-950 bg-black text-white"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        {todo.completed && <Check size={12} strokeWidth={3} />}
      </button>

      <div className="flex flex-1 flex-col gap-1 overflow-hidden">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedText}
              className="w-full border-b border-gray-200 py-1 font-medium focus:border-black focus:outline-none"
              onChange={handleEditText}
              onKeyDown={handleEditKeyDown}
              autoFocus
            />
            <div className="mt-2 flex gap-2">
              <select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                className={`rounded-full px-3 py-1 text-xs ${getPriorityColor(editedPriority)}`}
              >
                <option value={PRIORITY_LEVELS.LOW}>Low</option>
                <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
                <option value={PRIORITY_LEVELS.HIGH}>High</option>
              </select>
              <input
                type="date"
                value={editedDueDate || ""}
                onChange={(e) => setEditedDueDate(e.target.value)}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </>
        ) : (
          <>
            <p
              className={`truncate font-medium ${
                todo.completed ? "text-gray-500 line-through" : "text-gray-800"
              }`}
            >
              {todo.text}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
              {todo.priority && (
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 ${getPriorityColor(
                    todo.priority,
                  )}`}
                >
                  <Flag size={12} className="mr-1" />
                  {getPriorityBadge(todo.priority)}
                </span>
              )}
              {todo.dueDate && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5">
                  <Calendar size={12} className="mr-1" />
                  {new Date(todo.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-1">
        {isEditing ? (
          <>
            <button
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-black"
              onClick={handleSaveEdit}
              title="Save"
            >
              <Save size={16} />
            </button>
            <button
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600"
              onClick={handleCancel}
              title="Cancel"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              className="rounded-md p-2 text-gray-400 opacity-0 transition-opacity hover:bg-gray-100 hover:text-black group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              onClick={handleEdit}
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
            <button
              className="rounded-md p-2 text-gray-400 opacity-0 transition-opacity hover:bg-gray-100 hover:text-red-600 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              onClick={handleDelete}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
