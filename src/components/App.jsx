import { useEffect, useState } from "react";
import "../App.css";
import { useLocalStorageState } from "./useLocalStorageState";
import { TasksPeriod } from "./TasksPeriod";
import { TasksPeriodTabs } from "./TasksPeriodTabs";
import { Task } from "./Task";
import { AddTask } from "./AddTask";
import { Actions } from "./Actions";

export default function App() {
  const [tasks, setTasks] = useLocalStorageState("tasks", []);
  const [pinnedTasks, setPinnedTasks] = useLocalStorageState("pined", []);
  const [period, setPeriod] = useState("days");
  const [tasksDate, setTasksDate] = useState(new Date());
  const [isActionsOpen, setIsActionsOpen] = useState(true);
  const [sortKey, setSortKey] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedOption, setSelectedOption] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([
    ...pinnedTasks,
    ...tasks,
  ]);

  useEffect(() => {
    const periods = ["days", "weeks", "months", "years"];
    let index = 0;
    function handleKeyDown(e) {
      if (e.key === "ArrowDown") {
        index--;
        if (index < 0) index = periods.length - 1;
      } else if (e.key === "ArrowUp") {
        index++;
        if (index >= periods.length) index = 0;
      }
      setPeriod(periods[index]);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function changePeriod(period) {
    setPeriod(period);
  }
  function addTask(title) {
    if (
      tasksDate.getDate() < new Date().getDate() ||
      tasksDate.getMonth() < new Date().getMonth() ||
      tasksDate.getFullYear() < new Date().getFullYear()
    )
      return alert("You can't add tasks in the past");

    setTasks([
      ...tasks,
      {
        id: Math.random(),
        title,
        isCompleted: false,
        memo: "",
        date: new Date(),
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
  function clearAllTasks() {
    setTasks([]);
    setPinnedTasks([]);
  }
  function filterTasks() {
    switch (selectedOption) {
      case "all":
        setFilteredTasks([...pinnedTasks, ...tasks]);
        break;
      case "completed":
        setFilteredTasks(
          [...pinnedTasks, ...tasks].filter((task) => task.isCompleted),
        );
        break;
      case "uncompleted":
        setFilteredTasks(
          [...pinnedTasks, ...tasks].filter((task) => !task.isCompleted),
        );
        break;
      case "pinned":
        setFilteredTasks([...pinnedTasks]);
        break;
      default:
        setFilteredTasks([...pinnedTasks, ...tasks]);
    }
  }

  return (
    <div className=" h-full w-full overflow-auto rounded-lg  bg-[#0c1f1f] px-3 py-3 shadow-md md:h-auto md:w-1/2">
      <TasksPeriodTabs period={period} onChangePeriod={changePeriod} />
      <div className="px-8 lg:px-16">
        <TasksPeriod period={period} setTasksDate={setTasksDate} />
        <AddTask onAdd={addTask} />
        <Actions
          isOpen={isActionsOpen}
          onClearAll={clearAllTasks}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          setSortKey={setSortKey}
          selectedOption={selectedOption}
          onSelect={(e) => setSelectedOption(e.target.value)}
          onFilter={filterTasks}
        />
        <button
          className=" m-auto mt-3 block cursor-pointer rounded-lg bg-secondary px-4  py-1 text-text"
          onClick={() => setIsActionsOpen((io) => !io)}
        >
          <i
            className={`fas fa-${
              isActionsOpen ? "chevron-up" : "chevron-down"
            }`}
          ></i>
        </button>
        <div
          className={
            "mt-5 h-80 border-t border-secondary pr-3 pt-5 " +
            (filteredTasks.length === 0 ? "grid place-content-center" : "")
          }
        >
          {filteredTasks.length === 0 && (
            <p className="text-center  text-lg font-bold text-text-2">
              No tasks yet
            </p>
          )}
          {[...filteredTasks]
            .sort((a, b) => {
              if (sortDirection === "asc") {
                return sortKey === "title"
                  ? a.title.localeCompare(b.title)
                  : new Date(a.date) - new Date(b.date);
              } else {
                return sortKey === "title"
                  ? b.title.localeCompare(a.title)
                  : new Date(b.date) - new Date(a.date);
              }
            })
            .map((task) => {
              const taskComponent = (
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
              );

              const startOfWeek = new Date(tasksDate);
              startOfWeek.setHours(0, 0, 0, 0);
              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(endOfWeek.getDate() + 6);

              switch (period) {
                case "days":
                  return (
                    new Date(task.date).getDate() === tasksDate.getDate() &&
                    taskComponent
                  );
                case "weeks":
                  return (
                    new Date(task.date) >= startOfWeek &&
                    new Date(task.date) <= endOfWeek &&
                    taskComponent
                  );
                case "months":
                  return (
                    new Date(task.date).getMonth() === tasksDate.getMonth() &&
                    taskComponent
                  );
                case "years":
                  return (
                    new Date(task.date).getFullYear() ===
                      tasksDate.getFullYear() && taskComponent
                  );
                default:
                  return taskComponent;
              }
            })}
        </div>
      </div>
    </div>
  );
}
