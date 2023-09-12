export function FilterTasks({ selectedOption, onSelect }) {
  return (
    <div className="relative flex-1">
      <i className="fas fa-filter absolute left-3 top-2 text-text-2 "></i>
      <select
        className="w-full cursor-pointer rounded-lg bg-secondary py-1 pl-10 text-text  focus:outline-none
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
  );
}
