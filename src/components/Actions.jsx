import { useEffect, useRef } from "react";
import { FilterTasks } from "./FilterTasks";
import { SortTasks } from "./SortTasks";

export function Actions({
  isOpen,
  onClearAll,
  sortDirection,
  setSortDirection,
  setSortKey,
  selectedOption,
  onSelect,
  onFilter,
}) {
  const sortButtons = useRef(null);

  useEffect(() => {
    const buttonsDiv = sortButtons.current;
    function callback(e) {
      if (e.target.tagName === "BUTTON") {
        buttonsDiv.querySelectorAll("i").forEach((icon) => {
          icon.classList.add("hidden");
        });
        e.target.children[0].classList.remove("hidden");

        sortDirection === "asc"
          ? e.target.children[0].classList.replace("fa-sort-up", "fa-sort-down")
          : e.target.children[0].classList.replace(
              "fa-sort-down",
              "fa-sort-up",
            );

        setSortKey(e.target.dataset.key);
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      }
    }
    buttonsDiv?.addEventListener("click", callback);
    return () => buttonsDiv?.removeEventListener("click", callback);
  }, [sortButtons, sortDirection, setSortDirection, setSortKey]);

  return (
    <div
      className={
        "mt-3 overflow-hidden transition-[height] duration-300 " +
        (isOpen ? "h-20" : "h-0 ")
      }
    >
      <div className="mb-3 flex items-center gap-3">
        <FilterTasks
          selectedOption={selectedOption}
          onSelect={onSelect}
          onFilter={onFilter}
        />
        <button
          className="b rounded-lg bg-red-700 px-5 py-1 font-bold text-text"
          onClick={onClearAll}
        >
          Clear All
        </button>
      </div>
      <SortTasks reference={sortButtons} />
    </div>
  );
}
