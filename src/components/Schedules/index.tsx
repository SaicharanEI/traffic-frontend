import Form from "react-bootstrap/Form";

import { TrafficLightSchedule } from "../Interfaces/trafficLight";

type ScheduleComponentProps = {
  schedule: TrafficLightSchedule;
  index: number;
  handleScheduleChange: any;
  handleRemoveSchedule: any;
};

export default function ScheduleComponent({
  schedule,
  index,
  handleScheduleChange,
  handleRemoveSchedule,
}: ScheduleComponentProps) {
  const getHoursMinutes = (time: string): string => {
    if (!time) return "";
    const startTimeparts = time.split("T")[1];
    const [startHours, startMinutes] = startTimeparts.split(":");
    const startHour = parseInt(startHours, 10);
    const startMinute = parseInt(startMinutes, 10);
    return `${startHour.toString().padStart(2, "0")}:${startMinute
      .toString()
      .padStart(2, "0")}`;
  };

  const handleTimeChange = (index: number, key: string, value: any): void => {
    const [hours, minutes] = value.split(":");
    const date = new Date((schedule as any)[key]);
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);
    handleScheduleChange(index, key, date.toISOString());
  };

  return (
    <div className="mt-3 w-75" key={index}>
      <h3 className="app-main-heading2">Schedule {index + 1}</h3>
      <Form.Group
        className="d-flex flex-column"
        controlId={`timePeriod-${index}`}
      >
        <Form.Label className="form-label">Time Period:</Form.Label>
        <Form.Control
          className="form-control"
          type="text"
          placeholder="Time Period"
          value={schedule.timePeriod}
          onChange={(e) =>
            handleScheduleChange(index, "timePeriod", e.target.value)
          }
          required
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group
        controlId={`startTime-${index}`}
        className="d-flex flex-column"
      >
        <Form.Label className="form-label">Start Time:</Form.Label>
        <Form.Control
          className="form-control"
          type="time"
          value={getHoursMinutes(schedule.startTime)}
          onChange={(e) => handleTimeChange(index, "startTime", e.target.value)}
          required
        />{" "}
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId={`endTime-${index}`} className="d-flex flex-column">
        <Form.Label className="form-label">End Time:</Form.Label>
        <Form.Control
          className="form-control"
          type="time"
          value={getHoursMinutes(schedule.endTime)}
          onChange={(e) => handleTimeChange(index, "endTime", e.target.value)}
          required
        />{" "}
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group
        controlId={`redDuration-${index}`}
        className="d-flex flex-column"
      >
        <Form.Label className="form-label">Red Duration (seconds):</Form.Label>
        <Form.Control
          className="form-control"
          type="number"
          min="0"
          value={schedule.redDuration}
          onChange={(e) =>
            handleScheduleChange(
              index,
              "redDuration",
              parseInt(e.target.value, 10)
            )
          }
          required
        />{" "}
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group
        controlId={`yellowDuration-${index}`}
        className="d-flex flex-column"
      >
        <Form.Label className="form-label">
          Yellow Duration (seconds):
        </Form.Label>
        <Form.Control
          className="form-control"
          type="number"
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
        />{" "}
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group
        controlId={`greenDuration-${index}`}
        className="d-flex flex-column"
      >
        <Form.Label className="form-label">
          Green Duration (seconds):
        </Form.Label>
        <Form.Control
          min="0"
          className="form-control"
          type="number"
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
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <button
        type="button"
        className="app-main-button mt-3"
        onClick={() => handleRemoveSchedule(index)}
      >
        Remove Schedule
      </button>
    </div>
  );
}
