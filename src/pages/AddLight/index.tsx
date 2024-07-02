import React, { useState } from "react";
import { TrafficLightSchedule } from "../../components/icons/Interfaces/trafficLight";
import "../../App.css";
import TrafficLightComponent from "../../components/TrafficLight";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLight } from "../../utils/api";
import Toast from "../../utils/Toast";

function AddTrafficLightForm() {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [schedules, setSchedules] = useState<TrafficLightSchedule[]>([]);
  const queryClient = useQueryClient();

  const { mutate: postLight, isPending: postIsPending } = useMutation({
    mutationFn: addLight,
    onError: (responseData) => {
      Toast.fire({
        icon: "error",
        title: responseData.message,
      });
    },
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({
        queryKey: ["fetchLights"],
      }),
        Toast.fire({
          icon: "success",
          title: responseData.message,
        });
      setName("");
      setLocation("");
      setSchedules([]);
    },
  });
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

    if (!name || !location) {
      Toast.fire({
        icon: "error",
        title: "Name and Location are required",
      });
      return;
    }
    if (schedules.length >= 1) {
      for (let i = 0; i < schedules.length; i++) {
        if (
          !schedules[i].timePeriod ||
          !schedules[i].startTime ||
          !schedules[i].endTime
        ) {
          Toast.fire({
            icon: "error",
            title: "All fields in schedule are required",
          });
          return;
        }
      }
    }

    const newTrafficLight = {
      name,
      currentColor: "yellow",
      location,
      schedules,
    };

    postLight(newTrafficLight);
  };

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
        updateIsPending={postIsPending}
        heading="Add Traffic Light"
      />
    </>
  );
}

export default AddTrafficLightForm;
