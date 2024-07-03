import { useState } from "react";
import TrafficLightComponent from "../TrafficLight";
import { TrafficLight, TrafficLightSchedule } from "../Interfaces/trafficLight";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScheduleById, updateLightDetails } from "../../utils/api";
import Toast from "../../utils/Toast";

export function TrafficLightEditComponent({
  trafficLight,
}: {
  trafficLight: TrafficLight;
}) {
  const [name, setName] = useState<string>(trafficLight.name);
  const [location, setLocation] = useState<string>(trafficLight.location);
  const [schedules, setSchedules] = useState<TrafficLightSchedule[]>(
    trafficLight.schedules
  );

  const queryClient = useQueryClient();
  const { mutate: updateLight, isPending: updateIsPending } = useMutation({
    mutationFn: updateLightDetails,
    onSuccess: (responseData) => {
      console.log(responseData);
      queryClient.invalidateQueries({
        queryKey: ["fetchLights"],
      }),
        queryClient.invalidateQueries({
          queryKey: ["DetailedTrafficLight", Number(trafficLight.id)],
        }),
        queryClient.invalidateQueries({
          queryKey: ["FetchTrafficLightById", Number(trafficLight.id)],
        }),
        Toast.fire({
          icon: "success",
          title: responseData.message,
        });
    },
  });

  const { mutate: DeleteSchedule } = useMutation({
    mutationFn: deleteScheduleById,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({
        queryKey: ["fetchLights", "trafficLightById"],
        exact: true,
      });
      Toast.fire({
        icon: "success",
        title: responseData.message,
      });
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
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
            title: `All fields in schedule ${i + 1} are required`,
          });
          return;
        }
      }
    }

    const updatedTrafficLight: TrafficLight = {
      ...trafficLight,
      name,
      location,
      schedules,
    };

    updateLight(updatedTrafficLight);
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
        trafficLightId: Number(trafficLight.id),
      },
    ]);
  };

  const handleRemoveSchedule = (index: number) => {
    const scheduleToRemove = schedules[index];
    setSchedules((prev) => prev.filter((_, i) => i !== index));
    console.log(scheduleToRemove);
    if (scheduleToRemove.id) {
      DeleteSchedule(scheduleToRemove.id);
    }
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
      updateIsPending={updateIsPending}
      heading="Edit Traffic Light"
    />
  );
}
