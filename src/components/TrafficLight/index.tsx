import Button from "../../utils/Button";
import ScheduleComponent from "../Schedules";
import "./index.css";

export default function TrafficLightComponent({
  handleSubmit,
  name,
  location,
  schedules,
  handleScheduleChange,
  handleRemoveSchedule,
  handleAddSchedule,
  setName,
  setLocation,
  heading,
  updateIsPending,
}: any) {
  console.log(name, location);
  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <h1 style={{ margin: "0px" }} className="app-main-heading">
        {heading}
      </h1>
      <button
        style={{ alignSelf: "flex-end", margin: "0px" }}
        type="button"
        className="app-main-button"
        onClick={handleAddSchedule}
      >
        Add Schedule
      </button>
      <div className="app-form-container1">
        <div className="app-input-container">
          <label className="app-input-label" htmlFor="name">
            Name:
          </label>
          <input
            className="app-input-field"
            type="text"
            id="name"
            placeholder="Name of Traffic Light"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="app-input-container">
          <label className="app-input-label" htmlFor="location">
            Location:
          </label>
          <input
            className="app-input-field"
            placeholder="Location of Traffic Light"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
      </div>
      {schedules?.map((schedule: any, index: number) => (
        <ScheduleComponent
          key={index}
          schedule={schedule}
          index={index}
          handleScheduleChange={handleScheduleChange}
          handleRemoveSchedule={handleRemoveSchedule}
        />
      ))}
      <Button
        text={heading}
        onSubmit={handleSubmit}
        loading={updateIsPending}
        disabled={updateIsPending}
      />
    </form>
  );
}
