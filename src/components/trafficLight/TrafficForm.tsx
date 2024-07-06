import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  addLight,
  updateLightDetails,
  deleteScheduleById,
} from "../../utils/Api";
import { showToast } from "../../utils/Toast";
import { TrafficLight, TrafficLightSchedule } from "../../types/TrafficLight";
import TrafficLightComponent from "./Component";

interface TrafficLightFormProps {
  initialData?: TrafficLight;
  formType: "add" | "edit";
  heading: string;
}

function TrafficLightForm({
  initialData,
  formType,
  heading,
}: TrafficLightFormProps) {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState<string>(initialData?.name || "");
  const [location, setLocation] = useState<string>(initialData?.location || "");
  const [schedules, setSchedules] = useState<TrafficLightSchedule[]>(
    initialData?.schedules || []
  );
  const queryClient = useQueryClient();

  const mutationFn = formType === "add" ? addLight : updateLightDetails;
  const { mutate: saveLight, isPending } = useMutation({
    mutationFn,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["fetchLights"] });
      queryClient.invalidateQueries({
        queryKey: ["FetchTrafficLightById", Number(initialData?.id)],
      }),
        showToast("success", responseData.message);
      if (formType === "add") {
        setName("");
        setLocation("");
        setSchedules([]);
      }
    },
    onError: (responseData) => showToast("error", responseData.message),
  });

  const { mutate: deleteSchedule } = useMutation({
    mutationFn: deleteScheduleById,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["fetchLights"] });
      showToast("success", responseData.message);
    },
  });

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
        trafficLightId: initialData?.id,
      },
    ]);
  };

  const handleRemoveSchedule = (index: number): void => {
    const scheduleToRemove = schedules[index];
    setSchedules((prev) => prev.filter((_, i) => i !== index));
    if (scheduleToRemove.id) {
      deleteSchedule(scheduleToRemove.id);
    }
  };

  const handleScheduleChange = (
    index: number,
    field: keyof TrafficLightSchedule,
    value: number
  ): void => {
    if (
      field === "yellowDuration" ||
      field === "redDuration" ||
      field === "greenDuration"
    ) {
      if (value) {
        setSchedules((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, [field]: Number(value) } : item
          )
        );
        return;
      }
    }
    setSchedules((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const checkvalidity = (): boolean => {
    if (!name || !location) {
      showToast("error", "Name and Location are required");
      return false;
    }

    if (schedules.length) {
      for (let i = 0; i < schedules.length; i++) {
        if (
          !schedules[i].timePeriod ||
          !schedules[i].startTime ||
          !schedules[i].endTime
        ) {
          showToast("error", `All fields in schedule ${i + 1} are required`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    if (checkvalidity() === false) {
      return;
    }
    setValidated(true);
    const trafficLight = {
      id: initialData?.id,
      name,
      location,
      schedules,
      currentColor: formType === "add" ? "yellow" : initialData?.currentColor,
    };
    saveLight(trafficLight);
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
        updateIsPending={isPending}
        heading={heading}
        validated={validated}
      />
    </>
  );
}

export default TrafficLightForm;
