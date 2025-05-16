import { useContext } from "react";
import TodoContext, { FILTERS } from "../context/TodoContext";
import { Search } from "lucide-react";

const TodoFilters = () => {
  const { filter, setFilter, searchQuery, setSearchQuery } = useContext(TodoContext);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-white pl-9 pr-4 py-2 text-sm shadow-sm transition-all duration-200 placeholder:text-stone-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10"
        />
      </div>
      <div className="flex gap-2">
        {Object.values(FILTERS).map((filterValue) => (
          <button
            key={filterValue}
            onClick={() => setFilter(filterValue)}
            className={`btn-secondary ${
              filter === filterValue
                ? "!bg-violet-600 !text-white"
                : ""
            }`}
          >
            {filterValue.charAt(0).toUpperCase() + filterValue.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilters;