import React, { useEffect, useState } from "react";
// import { useAppDispatch } from "../../store/hooks";
import { TrafficLightSchedule } from "../../store/trafficSlice";
import "../../App.css";
import useFetch from "../../utils/service";
import TrafficLightComponent from "../../components/TrafficLight";

function AddTrafficLightForm() {
  // const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [schedules, setSchedules] = useState<TrafficLightSchedule[]>([]);
  const { fetchData, state } = useFetch();
  const handleAddSchedule = () => {
    setSchedules([
      ...schedules,
      {
        id: undefined,
        timePeriod: "",
        startTime: "",
        endTime: "",
        redDuration: 0,
        yellowDuration: 0,
        greenDuration: 0,
      },
    ]);
  };

  const handleRemoveSchedule = (index: number) => {
    const updatedSchedules = [...schedules];
    updatedSchedules.splice(index, 1);
    setSchedules(updatedSchedules);
  };

  const handleScheduleChange = (
    index: number,
    field: keyof TrafficLightSchedule,
    value: string | number
  ) => {
    setSchedules((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const newTrafficLight = {
      name,
      currentColor: "red",
      location,
      schedules,
    };

    await fetchData("addtrafficlight", "POST", newTrafficLight);
  };

  useEffect(() => {
    if (state) {
      if (state.error === null && state.data && !state.loading) {
        // setName("");
        // setLocation("");
        // setSchedules([]);
      }
    }
  }, [state.data]);

  return (
    <>
      <TrafficLightComponent
        setName={setName}
        setLocation={setLocation}
        schedules={schedules}
        handleSubmit={handleSubmit}
        handleAddSchedule={handleAddSchedule}
        handleRemoveSchedule={handleRemoveSchedule}
        handleScheduleChange={handleScheduleChange}
        name={name}
        location={location}
        heading="Add Traffic Light"
      />
    </>
  );
}

export default AddTrafficLightForm;
