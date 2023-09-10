export function TasksPeriodTabs({ period, onChangePeriod }) {
  return (
    <div className="flex justify-center gap-8 border-b border-secondary pb-3">
      <button
        className={"tab " + (period === "days" ? "active" : "")}
        onClick={() => onChangePeriod("days")}
      >
        Days
      </button>
      <button
        className={"tab " + (period === "weeks" ? "active" : "")}
        onClick={() => onChangePeriod("weeks")}
      >
        Weeks
      </button>
      <button
        className={"tab " + (period === "months" ? "active" : "")}
        onClick={() => onChangePeriod("months")}
      >
        Months
      </button>
      <button
        className={"tab " + (period === "years" ? "active" : "")}
        onClick={() => onChangePeriod("years")}
      >
        Years
      </button>
    </div>
  );
}
