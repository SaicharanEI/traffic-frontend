export default function ScheduleComponent({
  schedule,
  index,
  handleScheduleChange,
  handleRemoveSchedule,
}: any) {
  return (
    <div key={index}>
      <h3 className="app-main-heading2">Schedule {index + 1}</h3>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div className="app-input-container">
          <label className="app-input-label" htmlFor={`timePeriod-${index}`}>
            Time Period:
          </label>
          <input
            className="app-input-field"
            type="text"
            id={`timePeriod-${index}`}
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
            value={schedule.startTime}
            onChange={(e) =>
              handleScheduleChange(index, "startTime", e.target.value)
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
            value={schedule.endTime}
            onChange={(e) =>
              handleScheduleChange(index, "endTime", e.target.value)
            }
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
            id={`redDuration-${index}`}
            value={schedule.redDuration}
            onChange={(e) =>
              handleScheduleChange(
                index,
                "redDuration",
                parseInt(e.target.value)
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
            value={schedule.yellowDuration}
            onChange={(e) =>
              handleScheduleChange(
                index,
                "yellowDuration",
                parseInt(e.target.value)
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
            className="app-input-field"
            type="number"
            id={`greenDuration-${index}`}
            value={schedule.greenDuration}
            onChange={(e) =>
              handleScheduleChange(
                index,
                "greenDuration",
                parseInt(e.target.value)
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
