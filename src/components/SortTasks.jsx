export function SortTasks({ reference }) {
  return (
    <div className="grid xs:grid-cols-2 gap-3 " ref={reference}>
      <button
        className="b flex rounded-lg bg-secondary px-4  py-1 text-text"
        data-key="date"
      >
        <i className="fa-solid fa-sort-down mr-3"></i>
        Sort By Date
      </button>
      <button
        className="b flex rounded-lg bg-secondary px-4  py-1 text-text"
        data-key="title"
      >
        <i className="fa-solid fa-sort-down mr-3 hidden"></i>
        Sort By Title
      </button>
    </div>
  );
}
