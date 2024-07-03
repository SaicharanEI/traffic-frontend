import "../TrafficLight/index.css";

export default function ScheduleComponent({
  schedule,
  index,
  handleScheduleChange,
  handleRemoveSchedule,
}: any) {
  const getHoursMinutes = (time: any) => {
    if (!time) return "";
    const startTimeparts = time.split("T")[1];
    const [startHours, startMinutes] = startTimeparts.split(":");
    const startHour = parseInt(startHours, 10);
    const startMinute = parseInt(startMinutes, 10);
    return `${startHour.toString().padStart(2, "0")}:${startMinute
      .toString()
      .padStart(2, "0")}`;
  };

  const handleTimeChange = (index: number, key: any, value: any) => {
    const [hours, minutes] = value.split(":");
    const date = new Date(schedule[key]);
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);
    console.log("MySQL datetime - " + date.toISOString());
    handleScheduleChange(index, key, date.toISOString());
  };

  return (
    <div key={index}>
      <h3 className="app-main-heading2">Schedule {index + 1}</h3>
      <div className="schedules-container">
        <div className="app-input-container">
          <label className="app-input-label" htmlFor={`timePeriod-${index}`}>
            Time Period:
          </label>
          <input
            className="app-input-field"
            type="text"
            id={`timePeriod-${index}`}
            placeholder="Time Period"
            value={schedule.timePeriod}
            onChange={(e) =>
              handleScheduleChange(index, "timePeriod", e.target.value)
            }
            required
          />
        </div>
        <div className="app-input-container">
          <label className="app-input-label" htmlFor={`startTime-${index}`}>
            Start Time:
          </label>
          <input
            className="app-select-field"
            type="time"
            id={`startTime-${index}`}
            value={getHoursMinutes(schedule.startTime)}
            onChange={(e) =>
              handleTimeChange(index, "startTime", e.target.value)
            }
            required
          />
        </div>
        <div className="app-input-container">
          <label className="app-input-label" htmlFor={`endTime-${index}`}>
            End Time:
          </label>
          <input
            className="app-select-field"
            type="time"
            id={`endTime-${index}`}
            value={getHoursMinutes(schedule.endTime)}
            onChange={(e) => handleTimeChange(index, "endTime", e.target.value)}
            required
          />
        </div>
        <div className="app-input-container">
          <label className="app-input-label" htmlFor={`redDuration-${index}`}>
            Red Duration (seconds):
          </label>
          <input
            className="app-input-field"
            type="number"
            min="0"
            id={`redDuration-${index}`}
            value={schedule.redDuration}
            onChange={(e) =>
              handleScheduleChange(
                index,
                "redDuration",
                parseInt(e.target.value, 10)
              )
            }
            required
          />
        </div>
        <div className="app-input-container">
          <label
            className="app-input-label"
            htmlFor={`yellowDuration-${index}`}
          >
            Yellow Duration (seconds):
          </label>
          <input
            className="app-input-field"
            type="number"
            id={`yellowDuration-${index}`}
            min="0"
            value={schedule.yellowDuration}
            onChange={(e) =>
              handleScheduleChange(
                index,
                "yellowDuration",
                parseInt(e.target.value, 10)
              )
            }
            required
          />
        </div>
        <div className="app-input-container">
          <label className="app-input-label" htmlFor={`greenDuration-${index}`}>
            Green Duration (seconds):
          </label>
          <input
            min="0"
            className="app-input-field"
            type="number"
            id={`greenDuration-${index}`}
            value={schedule.greenDuration}
            onChange={(e) =>
              handleScheduleChange(
                index,
                "greenDuration",
                parseInt(e.target.value, 10)
              )
            }
            required
          />
        </div>
      </div>
      <button
        style={{ marginTop: "20px" }}
        type="button"
        className="app-main-button"
        onClick={() => handleRemoveSchedule(index)}
      >
        Remove Schedule
      </button>
    </div>
  );
}
