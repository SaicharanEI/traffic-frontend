import Button from "../button";
import InputGroup from "../input";
import styles from "../../App.module.css";
type ScheduleComponentProps = {
  schedule: any;
  index: number;
  handleScheduleChange: any;
  handleRemoveSchedule: any;
};

export default function ScheduleComponent({
  index,
  ...props
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
    const date = new Date();
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);
    props.handleScheduleChange(index, key, date.toISOString());
  };

  return (
    <div className="mt-3 w-75" key={index}>
      <h3 className={styles.app_main_heading2}>Schedule {index + 1}</h3>
      <InputGroup
        label="Time Period"
        type="text"
        controlId={`timePeriod-${index}`}
        onChange={(e) =>
          props.handleScheduleChange(index, "timePeriod", e.target.value)
        }
        placeholder="Time Period"
        value={props.schedule.timePeriod}
      />
      <InputGroup
        label="Start Time"
        type="time"
        onChange={(e) => handleTimeChange(index, "startTime", e.target.value)}
        value={getHoursMinutes(props.schedule.startTime)}
        controlId={`startTime-${index}`}
        placeholder="Start Time"
      />
      <InputGroup
        label="End Time"
        type="time"
        onChange={(e) => handleTimeChange(index, "endTime", e.target.value)}
        value={getHoursMinutes(props.schedule.endTime)}
        controlId={`endTime-${index}`}
        placeholder="End Time"
      />
      <InputGroup
        label="Red Duration"
        type="number"
        controlId={`redDuration-${index}`}
        placeholder="Red Duration in Seconds"
        onChange={(e) =>
          props.handleScheduleChange(index, "redDuration", e.target.value)
        }
        value={props.schedule.redDuration}
      />
      <InputGroup
        label="Green Duration "
        placeholder="Green Duration in Seconds"
        type="number"
        controlId={`greenDuration-${index}`}
        onChange={(e) =>
          props.handleScheduleChange(index, "greenDuration", e.target.value)
        }
        value={props.schedule.greenDuration}
      />
      <InputGroup
        label="Yellow Duration"
        type="number"
        placeholder="Yellow Duration in Seconds"
        value={props.schedule.yellowDuration}
        onChange={(e) =>
          props.handleScheduleChange(index, "yellowDuration", e.target.value)
        }
        controlId={`yellowDuration-${index}`}
      />
      <Button
        onClick={() => props.handleRemoveSchedule(index)}
        className="mt-3"
        type="button"
        title="Remove Schedule"
      />
    </div>
  );
}
