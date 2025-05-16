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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.HIGH:
        return "bg-red-100 text-red-600 ring-red-600/20";
      case PRIORITY_LEVELS.MEDIUM:
        return "bg-amber-100 text-amber-600 ring-amber-600/20";
      case PRIORITY_LEVELS.LOW:
        return "bg-emerald-100 text-emerald-600 ring-emerald-600/20";
      default:
        return "bg-stone-100 text-stone-600 ring-stone-600/20";
    }
  };

  const handleSaveEdit = () => {
    const trimmed = editedText.trim();
    if (trimmed === "") {
      toast.error("Task cannot be empty");
      return;
    }

    updateTodo(todo.id, {
      text: trimmed,
      priority: editedPriority,
      dueDate: editedDueDate,
    });
    setIsEditing(false);
    toast.success("Task updated");
  };

  const handleDelete = () => {
    toast.message(`Delete "${todo.text}"?`, {
      action: {
        label: "Delete",
        onClick: () => {
          deleteTodo(todo.id);
          toast.success("Task deleted");
        },
      },
    });
  };

  return (
    <div className={`group animate-slide-up rounded-xl bg-white p-4 transition-all duration-200 ${
      todo.completed ? "opacity-75" : "shadow-sm hover:shadow-md hover:shadow-violet-500/10"
    }`}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => markComplete(todo.id)}
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-all duration-200 ${
            todo.completed
              ? "bg-violet-600 text-white ring-4 ring-violet-600/20"
              : "border-2 border-stone-300 hover:border-violet-500 hover:ring-4 hover:ring-violet-500/20"
          }`}
        >
          {todo.completed && <Check size={12} strokeWidth={3} />}
        </button>

        <div className="flex-1 space-y-1">
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
                if (e.key === "Escape") setIsEditing(false);
              }}
              className="w-full rounded-md border-b border-violet-500 bg-transparent py-1 text-base focus:outline-none"
              autoFocus
            />
          ) : (
            <p className={`text-base ${todo.completed ? "text-stone-400 line-through" : "text-stone-700"}`}>
              {todo.text}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {isEditing ? (
              <>
                <select
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                  className={`rounded-full px-3 py-1 text-xs ring-1 ${getPriorityColor(editedPriority)}`}
                >
                  <option value={PRIORITY_LEVELS.LOW}>Low</option>
                  <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
                  <option value={PRIORITY_LEVELS.HIGH}>High</option>
                </select>
                <input
                  type="date"
                  value={editedDueDate || ""}
                  onChange={(e) => setEditedDueDate(e.target.value)}
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600 ring-1 ring-stone-600/20"
                />
              </>
            ) : (
              <>
                {todo.priority && (
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ring-1 ${getPriorityColor(todo.priority)}`}>
                    <Flag size={12} className="mr-1" />
                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                  </span>
                )}
                {todo.dueDate && (
                  <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-600 ring-1 ring-stone-600/20">
                    <Calendar size={12} className="mr-1" />
                    {new Date(todo.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                className="rounded-lg p-2 text-stone-500 transition-colors hover:bg-violet-50 hover:text-violet-600"
              >
                <Save size={16} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-lg p-2 text-stone-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-lg p-2 text-stone-400 opacity-0 transition-all hover:bg-violet-50 hover:text-violet-600 group-hover:opacity-100"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg p-2 text-stone-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;