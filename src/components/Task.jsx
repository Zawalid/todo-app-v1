import { useEffect, useRef, useState } from "react";
import { TaskActions } from "./TaskActions";

export function Task({
  task,
  onDelete,
  onCheck,
  isPinned,
  onPin,
  onUnpin,
  onAddMemo,
  onEditTask,
}) {
  const [checked, setChecked] = useState(task.isCompleted);
  const [isTaskActionsOpen, setIsTaskActionsOpen] = useState(false);
  const taskActions = useRef(null);
  const taskTitle = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (taskActions.current && !taskActions.current.contains(event.target)) {
        setIsTaskActionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [taskActions]);

  useEffect(() => {
    onCheck(task.id, checked, isPinned);
    // eslint-disable-next-line
  }, [checked, task]);

  return (
    <div className=" relative  flex items-center gap-10 pb-5">
      {isPinned && (
        <i className="fa-solid fa-thumbtack absolute -left-8 rotate-45 text-lg text-text-2"></i>
      )}
      <div className="w-full">
        <div className="grid w-full grid-cols-[20px_1fr] items-center gap-3">
          <input
            type="checkbox"
            className="mr-4  h-5 w-5 cursor-pointer bg-black accent-primary"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <p
            className={
              "break-all text-lg font-bold text-text" +
              (checked ? " line-through" : "")
            }
            ref={taskTitle}
          >
            {task.title}
          </p>
        </div>
        {task.memo && (
          <p className="ml-8 mt-2 font-semibold text-text-2">{task.memo}</p>
        )}
      </div>
      <div className="relative">
        <i
          className="fa-solid fa-ellipsis cursor-pointer text-text-2"
          onClick={() => setIsTaskActionsOpen((io) => !io)}
        ></i>
        <TaskActions
          isOpen={isTaskActionsOpen}
          reference={taskActions}
          onDelete={() => onDelete(task.id, isPinned)}
          onPin={() => onPin(task.id)}
          isPinned={isPinned}
          onUnpin={() => onUnpin(task.id)}
          onAddMemo={(memo) => onAddMemo(task.id, memo, isPinned)}
          taskMemo={task.memo}
          onEditTask={(title) => onEditTask(task.id, title, isPinned)}
          taskTitleEl={taskTitle.current}
        />
      </div>
    </div>
  );
}
