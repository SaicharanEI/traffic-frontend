import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

import Button from "../../utils/Button";
import { TrafficLightSchedule } from "../Interfaces/trafficLight";
import ScheduleComponent from "../Schedules";

interface TrafficLightComponentFormProps {
  name: string;
  location: string;
  schedules: TrafficLightSchedule[];
  handleScheduleChange: (
    index: number,
    field: keyof TrafficLightSchedule,
    value: string
  ) => void;
  handleRemoveSchedule: (index: number) => void;
  handleAddSchedule: () => void;
  setName: (value: string) => void;
  setLocation: (value: string) => void;
  handleSubmit: any;
  heading: string;
  updateIsPending: boolean;
  validated: boolean;
}

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
  validated,
}: TrafficLightComponentFormProps) {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center min-vh-100 max-vw-100">
        <Form
          noValidate
          validated={validated}
          className="col-11 col-md-8 col-lg-5 bg-light shadow-lg p-3 m-5 bg-body rounded min-vh-80 d-flex flex-column justify-content-center align-items-center"
          onSubmit={handleSubmit}
        >
          <h1 className="app-main-heading mt-3">{heading}</h1>
          <div className="align-self-end">
            <button
              className="app-main-button"
              type="button"
              onClick={handleAddSchedule}
            >
              Add Schedule
            </button>
          </div>
          <div className="w-75">
            <Form.Group controlId="name" className="d-flex flex-column">
              <Form.Label className="form-label">Name:</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                placeholder="Name of Traffic Light"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="location" className="d-flex flex-column">
              <Form.Label className="form-label">Location:</Form.Label>
              <Form.Control
                className="form-control"
                placeholder="Location of Traffic Light"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
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
            type="submit"
            text={heading}
            onSubmit={handleSubmit}
            loading={updateIsPending}
            disabled={updateIsPending}
          />
          {/* <Button type="submit" onSubmit={handleSubmit}>
            Save
          </Button> */}
        </Form>
      </div>
    </div>
  );
}
