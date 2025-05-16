import { useContext } from "react";
import TodoContext, { FILTERS } from "../context/TodoContext";
import { Search } from "lucide-react";

const TodoFilters = () => {
  const { filter, setFilter, searchQuery, setSearchQuery } = useContext(TodoContext);

  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-stone-200 pl-9 pr-3 py-2 text-sm"
        />
      </div>
      <div className="flex space-x-2">
        {Object.values(FILTERS).map((filterValue) => (
          <button
            key={filterValue}
            onClick={() => setFilter(filterValue)}
            className={`rounded-md px-3 py-2 text-sm ${
              filter === filterValue
                ? "bg-stone-950 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
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