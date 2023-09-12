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
  const [count, setCount] = useState(0);
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
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.key === "ArrowDown"
          ? (index--, index < 0 && (index = periods.length - 1))
          : (index++, index >= periods.length && (index = 0));
        setPeriod(periods[index]);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    setFilteredTasks([...pinnedTasks, ...tasks]);
    filterTasks();
    // eslint-disable-next-line
  }, [pinnedTasks, tasks]);
  useEffect(() => {
    setSelectedOption("all");
  }, [period, count]);
  useEffect(() => {
    filterTasks();
    // eslint-disable-next-line
  }, [selectedOption]);

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
        date: tasksDate,
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
  function editTask(id, title, isPinned) {
    modifyTask(id, isPinned, "title", title);
  }
  function clearAllTasks() {
    setTasks(
      tasks.filter(
        (task) =>
          new Date(task.date).getDate() !== tasksDate.getDate() ||
          new Date(task.date).getMonth() !== tasksDate.getMonth() ||
          new Date(task.date).getFullYear() !== tasksDate.getFullYear(),
      ),
    );
    setPinnedTasks(
      pinnedTasks.filter(
        (task) =>
          new Date(task.date).getDate() !== tasksDate.getDate() ||
          new Date(task.date).getMonth() !== tasksDate.getMonth() ||
          new Date(task.date).getFullYear() !== tasksDate.getFullYear(),
      ),
    );
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
    <div className=" flex h-full w-full flex-col rounded-lg bg-[#0c1f1f]  px-3 py-3 shadow-md md:h-[90%]  md:w-1/2">
      <TasksPeriodTabs period={period} onChangePeriod={changePeriod} />
      <div className="px-8 lg:px-16 ">
        <TasksPeriod
          count={count}
          setCount={setCount}
          period={period}
          setTasksDate={setTasksDate}
        />
        <AddTask onAdd={addTask} />
        <Actions
          isOpen={isActionsOpen}
          onClearAll={clearAllTasks}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          setSortKey={setSortKey}
          selectedOption={selectedOption}
          onSelect={(e) => setSelectedOption(e.target.value)}
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
      </div>

      <div className="mt-5 flex-1 overflow-auto border-t  border-secondary px-8 pr-3 pt-5 lg:px-16 ">
        {[
          ...filteredTasks.filter((task) => {
            if (period === "days" || period === "weeks")
              return (
                new Date(task.date).getDate() === tasksDate.getDate() &&
                new Date(task.date).getMonth() === tasksDate.getMonth() &&
                new Date(task.date).getFullYear() === tasksDate.getFullYear()
              );
            else if (period === "months")
              return (
                new Date(task.date).getMonth() === tasksDate.getMonth() &&
                new Date(task.date).getFullYear() === tasksDate.getFullYear()
              );
            else if (period === "years")
              return (
                new Date(task.date).getFullYear() === tasksDate.getFullYear()
              );
            else return true;
          }),
        ].length === 0 && (
          <div className="grid h-full place-content-center">
            <p className="text-center  text-lg font-bold text-text-2">
              No tasks yet
            </p>
          </div>
        )}
        {pinnedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onCheck={checkTask}
            isPinned={pinnedTasks.includes(task)}
            onPin={pinTask}
            onUnpin={unpinTask}
            onAddMemo={addMemo}
            onEditTask={editTask}
          />
        ))}
        {[...filteredTasks]
          .filter((task) => !pinnedTasks.includes(task))
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
                onEditTask={editTask}
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
                  new Date(task.date).getMonth() === tasksDate.getMonth() &&
                  new Date(task.date).getFullYear() ===
                    tasksDate.getFullYear() &&
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
                  new Date(task.date).getFullYear() ===
                    tasksDate.getFullYear() &&
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
  );
}
