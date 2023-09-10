import { useEffect, useState } from "react";

export function TaskActions({
  isOpen,
  reference,
  onDelete,
  onPin,
  isPinned,
  onUnpin,
  onAddMemo,
  taskMemo,
}) {
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [memo, setMemo] = useState(taskMemo || "");
  useEffect(() => {
    function handleClickOutside(event) {
      if (reference.current && !reference.current.contains(event.target)) {
        setIsMemoOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [reference]);

  function addMemo() {
    setIsMemoOpen((io) => !io);
    onAddMemo(memo);
  }

  return (
    <div
      className={
        "absolute right-0 top-full  z-10 w-max rounded-lg bg-secondary p-3 shadow-md " +
        (isOpen ? "block" : "hidden")
      }
      ref={reference}
    >
      <ul className="flex flex-col gap-2">
        <li
          className="grid cursor-pointer grid-cols-[15px_1fr] items-center gap-2 text-text-2 transition-colors duration-300 hover:text-text"
          onClick={() => (isPinned ? onUnpin() : onPin())}
        >
          <i className="fa-solid fa-thumbtack "></i>
          <p className="">{isPinned ? "Unpin from " : "Pin to "}the top</p>
        </li>
        <li
          className="grid cursor-pointer grid-cols-[15px_1fr] items-center gap-2 text-text-2 transition-colors duration-300 hover:text-text"
          onClick={addMemo}
        >
          <i className="fa-solid fa-note-sticky "></i>
          <p className="">
            {!isMemoOpen && !memo && "Add a memo"}
            {!isMemoOpen && memo && "Edit memo"}
            {isMemoOpen  && "Save memo"}
          </p>
        </li>
        <li
          className="grid cursor-pointer grid-cols-[15px_1fr] items-center gap-2 text-text-2 transition-colors duration-300 hover:text-text"
          onClick={() => onDelete()}
        >
          <i className="fa-solid fa-trash "></i>
          <p className="">Delete</p>
        </li>
      </ul>
      {isMemoOpen && (
        <textarea
          className="xs:-left-[102%] xs:-top-2 g absolute left-0 top-full mt-2 h-full w-full  rounded-lg bg-secondary  px-2 pt-2 text-text-2 focus:outline-none"
          placeholder="Add a memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        ></textarea>
      )}
    </div>
  );
}
