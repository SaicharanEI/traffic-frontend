import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

import { TrafficLightSchedule } from "../../types/TrafficLight";
import { ScheduleComponent } from ".";
import InputGroup from "../Input";
import Button from "../button";

interface TrafficLightComponentFormProps {
  name: string;
  location: string;
  schedules: TrafficLightSchedule[];
  handleScheduleChange: any;
  handleRemoveSchedule: (index: number) => void;
  handleAddSchedule: () => void;
  setName: (value: string) => void;
  setLocation: (value: string) => void;
  handleSubmit: any;
  heading: string;
  updateIsPending: boolean;
  validated: boolean;
}

export function TrafficLightComponent({
  ...props
}: TrafficLightComponentFormProps) {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center min-vh-100 max-vw-100">
        <Form
          noValidate
          validated={props.validated}
          className="col-11 col-md-8 col-lg-5 bg-light shadow-lg p-3 m-5 bg-body rounded min-vh-80 d-flex flex-column justify-content-center align-items-center"
          onSubmit={props.handleSubmit}
        >
          <h1 className="appMainHeading m-3">{props.heading}</h1>
          <div className="align-self-end">
            <Button
              onClick={props.handleAddSchedule}
              type="button"
              text="Add Schedule"
            />
          </div>
          <div className="w-75">
            <InputGroup
              controlId="name"
              label="Name"
              value={props.name}
              onChange={(e) => props.setName(e.target.value)}
              placeholder="Name of Traffic Light"
            />
            <InputGroup
              controlId="location"
              label="Location"
              value={props.location}
              onChange={(e) => props.setLocation(e.target.value)}
              placeholder="Location of Traffic Light"
            />
          </div>
          {props.schedules?.map((schedule: any, index: number) => (
            <ScheduleComponent
              key={index}
              schedule={schedule}
              index={index}
              handleScheduleChange={props.handleScheduleChange}
              handleRemoveSchedule={props.handleRemoveSchedule}
            />
          ))}
          <Button
            type="submit"
            text={props.heading}
            onClick={props.handleSubmit}
            loading={props.updateIsPending}
            disabled={props.updateIsPending}
          />
        </Form>
      </div>
    </div>
  );
}
