export function FilterTasks({ selectedOption, onSelect, onFilter }) {
  return (
    <div className="flex  flex-1 gap-3">
      <div className="relative w-full">
        <i className="fas fa-filter absolute left-3 top-2 text-text-2 "></i>
        <select
          className="w-full cursor-pointer rounded-lg bg-secondary px-10 py-1 text-text  focus:outline-none
      "
          value={selectedOption}
          onChange={onSelect}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
          <option value="pinned">Pinned</option>
        </select>
      </div>
      <button
        className="b rounded-lg bg-secondary px-4 py-1 text-text"
        onClick={onFilter}
      >
        Filter
      </button>
    </div>
  );
}
