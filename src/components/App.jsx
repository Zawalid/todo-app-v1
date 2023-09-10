import { useState } from "react";
import "../App.css";
import { useLocalStorageState } from "./useLocalStorageState";
import { TasksPeriod } from "./TasksPeriod";
import { TasksPeriodTabs } from "./TasksPeriodTabs";
import { Task } from "./Task";
import { AddTask } from "./AddTask";

export default function App() {
  const [tasks, setTasks] = useLocalStorageState("tasks", []);
  const [pinnedTasks, setPinnedTasks] = useLocalStorageState("pined", []);
  const [period, setPeriod] = useState("days");

  function changePeriod(period) {
    setPeriod(period);
  }
  function addTask(task) {
    setTasks([
      ...tasks,
      {
        id: Math.random(),
        task,
        isCompleted: false,
        memo: "",
      },
    ]);
  }
  function deleteTask(id, isPinned) {
    isPinned
      ? setPinnedTasks(pinnedTasks.filter((task) => task.id !== id))
      : setTasks(tasks.filter((task) => task.id !== id));
  }
  function pinTask(id) {
    const pinedTask = tasks.find((task) => task.id === id);
    setPinnedTasks([...pinnedTasks, pinedTask]);
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function unpinTask(id) {
    const unpinedTask = pinnedTasks.find((task) => task.id === id);
    setTasks([...tasks, unpinedTask]);
    setPinnedTasks(pinnedTasks.filter((task) => task.id !== id));
  }
  function modifyTask(id, isPinned, property, value) {
    const tasksToModify = isPinned ? [...pinnedTasks] : [...tasks];

    const index = tasksToModify.findIndex((task) => task.id === id);

    if (index !== -1) {
      tasksToModify[index][property] = value;
      isPinned ? setPinnedTasks(tasksToModify) : setTasks(tasksToModify);
    }
  }
  function checkTask(id, isCompleted, isPinned) {
    modifyTask(id, isPinned, "isCompleted", isCompleted);
  }
  function addMemo(id, memo, isPinned) {
    modifyTask(id, isPinned, "memo", memo);
  }
  return (
    <div className=" h-full w-full overflow-auto rounded-lg  bg-[#0c1f1f] px-3 py-3 shadow-md md:h-auto md:w-1/2">
      <TasksPeriodTabs period={period} onChangePeriod={changePeriod} />
      <div className="px-8 lg:px-16">
        <TasksPeriod period={period} />
        <AddTask onAdd={addTask} />
        <div
          className={
            "mt-8 h-80 pr-3 " +
            (tasks.length === 0 && pinnedTasks.length === 0
              ? "grid place-content-center"
              : "")
          }
        >
          {tasks.length === 0 && pinnedTasks.length === 0 && (
            <p className="text-center  text-lg font-bold text-text-2">
              No tasks yet
            </p>
          )}
          {[...pinnedTasks, ...tasks].map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onCheck={checkTask}
              isPinned={pinnedTasks.includes(task)}
              onPin={pinTask}
              onUnpin={unpinTask}
              onAddMemo={addMemo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
