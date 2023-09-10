import { useEffect, useState } from "react";

export function TasksPeriod({ period }) {
  const [count, setCount] = useState(0);
  const currentDate = new Date();
  period === "days" && currentDate.setDate(currentDate.getDate() + count);
  period === "weeks" && currentDate.setDate(currentDate.getDate() + count * 7);
  period === "months" && currentDate.setMonth(currentDate.getMonth() + count);
  period === "years" &&
    currentDate.setFullYear(currentDate.getFullYear() + count);

  useEffect(() => {
    setCount(0);
  }, [period]);

  return (
    <div className="my-16 grid grid-cols-[20px_260px_20px] items-center justify-center gap-10 text-center">
      <i
        className="fa-solid fa-chevron-left cursor-pointer text-2xl text-text-2"
        onClick={() => setCount((prev) => prev - 1)}
      ></i>
      {{
        days: <TasksByDays currentDate={currentDate} />,
        weeks: <TasksByWeeks currentDate={currentDate} />,
        months: <TasksByMonths currentDate={currentDate} />,
        years: <TasksByYears currentDate={currentDate} />,
      }[period]}
      <i
        className="fa-solid fa-chevron-right cursor-pointer text-2xl text-text-2"
        onClick={() => setCount((prev) => prev + 1)}
      ></i>
    </div>
  );
}
function TasksByDays({ currentDate }) {
  return (
    <div>
      <h1 className="mb-3 text-5xl font-bold text-text">
        {currentDate.getDate() === new Date().getDate()
          ? "Today"
          : currentDate.getDate() === new Date().getDate() + 1
            ? "Tomorrow"
            : currentDate.getDate() === new Date().getDate() - 1
              ? "Yesterday"
              : currentDate.toLocaleDateString("en-US", {
                weekday: "long",
              })}
      </h1>
      <p className="text-xl font-semibold text-text-2">
        {currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
function TasksByWeeks({ currentDate }) {
  return (
    <div>
      <h1 className="mb-3 text-3xl font-bold text-text">
        {currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}{" "}
        -{" "}
        {new Date(
          currentDate.setDate(currentDate.getDate() + 6)
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </h1>
      <p className="text-xl font-semibold text-text-2">
        {currentDate.toLocaleDateString("en-US", {
          year: "numeric",
        })}
      </p>
    </div>
  );
}
function TasksByMonths({ currentDate }) {
  return (
    <div>
      <h1 className="mb-3 text-5xl font-bold text-text">
        {currentDate.toLocaleDateString("en-US", {
          month: "long",
        })}
      </h1>
      <p className="text-xl font-semibold text-text-2">
        {currentDate.toLocaleDateString("en-US", {
          year: "numeric",
        })}
      </p>
    </div>
  );
}
function TasksByYears({ currentDate }) {
  return (
    <div>
      <h1 className="mb-3 text-5xl font-bold text-text">
        {currentDate.getFullYear()}
      </h1>
    </div>
  );
}
