import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TrafficLight, TrafficLightSchedule } from "../../store/trafficSlice";
import useFetch from "../../utils/service";
import TrafficLightComponent from "../../components/TrafficLight";

function TrafficLightEdit() {
  const { id } = useParams<{ id: string }>();
  const { fetchData, state } = useFetch();
  const [trafficLight, setTrafficLight] = useState<TrafficLight | null>(null);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [schedules, setSchedules] = useState<TrafficLightSchedule[]>([]);

  useEffect(() => {
    fetchData(`trafficlight/${id}`, "GET");
  }, [id]);

  useEffect(() => {
    if (state.data) {
      const fetchedTrafficLight: any = state.data;
      setTrafficLight(fetchedTrafficLight);
      setName(fetchedTrafficLight.name);
      setLocation(fetchedTrafficLight.location);
      setSchedules(fetchedTrafficLight.schedules);
    }
  }, [state.data]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(schedules);
    if (trafficLight) {
      const updatedTrafficLight: TrafficLight = {
        ...trafficLight,
        name,
        location,
        schedules,
      };

      await fetchData(`updatetrafficlight/${id}`, "PUT", updatedTrafficLight);
    }
  };

  const handleAddSchedule = () => {
    setSchedules((prev) => [
      ...prev,
      {
        id: undefined,
        timePeriod: "",
        startTime: "",
        endTime: "",
        redDuration: 0,
        yellowDuration: 0,
        greenDuration: 0,
        trafficLightId: Number(id),
      },
    ]);
  };

  const handleRemoveSchedule = async (index: number) => {
    const scheduleToRemove = schedules[index];
    if (scheduleToRemove.id) {
      await fetchData(`deleteschedule/${scheduleToRemove.id}`, "DELETE");
    }
    setSchedules((prev) => prev.filter((_, i) => i !== index));
  };

  const handleScheduleChange = (
    index: number,
    field: keyof TrafficLightSchedule,
    value: string | number
  ) => {
    console.log(index, field, value);
    setSchedules((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  if (!trafficLight) {
    return <h1 className="app-main-heading">Traffic light not found</h1>;
  }
  return (
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
      heading="Edit Traffic Light"
    />
  );
}

export default TrafficLightEdit;
