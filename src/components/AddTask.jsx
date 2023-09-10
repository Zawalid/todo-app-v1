import { useState } from "react";

export function AddTask({ onAdd }) {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    onAdd(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative w-full">
        <i className="fa-solid fa-list-check absolute left-3 top-4 text-text-2"></i>
        <input
          type="text"
          className="w-full rounded-lg bg-secondary py-3 pl-10  text-text placeholder:font-semibold  focus:outline-none "
          placeholder="Add a task..."
          value={value}
          onChange={(e) => setValue(e.target.value)} />
      </div>
    </form>
  );
}
