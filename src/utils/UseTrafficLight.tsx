import { useEffect, useState } from "react";
import { TrafficLightSchedule, TrafficLight } from "../store/trafficSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScheduleById, updatetrafficlightColor } from "./api";

export default function useTrafficLight(light: TrafficLight) {
  const [trafficLight, setTrafficLight] = useState<TrafficLight>(light);
  const colors = ["red", "yellow", "green"];
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(1);

  // const fetchdata = async (lightId: number) => {
  //   const response = await fetch(
  //     `${import.meta.env.VITE_API_BASE_URL}trafficlight/${lightId}`
  //   );

  //   if (response.ok) {
  //     const data = await response.json();
  //     setTrafficLight(data.data);
  //   }
  // };

  // useEffect(() => {
  //   fetchdata(lightId);
  // }, []);

  // const { isLoading, data } = useQuery({
  //   queryKey: ["DetailedTrafficLight"],
  //   queryFn: () => fetchLightById(Number(lightId)),
  // });
  // useEffect(() => {
  //   if (data) {
  //     setTrafficLight(data?.data);
  //     console.log(data?.data, "from useeffect");
  //   }
  // }, [data]);
  // console.log(data, isLoading, "from usequery");

  const queryClient = useQueryClient();

  const { mutate: updateColor } = useMutation({
    mutationFn: updatetrafficlightColor,
    // When mutate is called:
    //onMutate: async (item: number, color: string) => {
    //   // Cancel any outgoing refetches
    //   // (so they don't overwrite our optimistic update)
    //   await queryClient.cancelQueries({ queryKey: ["DetailedTrafficLight", light.id] });
    //   // Snapshot the previous value
    //   const previousTodos = queryClient.getQueryData(["DetailedTrafficLight", light.id]);
    //   // Optimistically update to the new value
    //   queryClient.setQueryData(["DetailedTrafficLight", light.id], (previousTodos) => {...previousTodos, curretColor: color});
    //   // Return a context object with the snapshotted value
    //   return { previousTodos };
    // },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    // onError: (err, newTodo, context) => {
    //   queryClient.setQueryData(["todos"], context.previousTodos);
    // },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  useEffect(() => {
    if (!trafficLight) return;

    const calculateRemainingTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      let currentColor = "";
      let currentColorDuration;
      trafficLight?.schedules?.forEach((schedule: TrafficLightSchedule) => {
        const startTimeParts = schedule.startTime.split(":");
        const endTimeParts = schedule.endTime.split(":");
        const startHour = parseInt(startTimeParts[0], 10);
        const startMinute = parseInt(startTimeParts[1], 10);
        const endHour = parseInt(endTimeParts[0], 10);
        const endMinute = parseInt(endTimeParts[1], 10);

        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;

        if (
          currentTotalMinutes >= startTotalMinutes &&
          currentTotalMinutes < endTotalMinutes
        ) {
          currentColor = colors[currentColorIndex];
          // currentColorDuration =
          //   schedule[`${currentColor.toLowerCase()}Duration`] || 0;
          currentColorDuration =
            (schedule as any)[`${currentColor.toLowerCase()}Duration`] || 0;
        }
      });

      const colorIndex = colors.findIndex((color) => color === currentColor);
      if (colorIndex !== -1) {
        updateColor({ lightId: trafficLight.id, color: colors[colorIndex] });
        setCurrentColorIndex(colorIndex);
        setRemainingTime(Number(currentColorDuration));
      }
    };

    calculateRemainingTime();

    const interval = setInterval(() => {
      setRemainingTime((prevTime: number) => {
        if (prevTime <= 1) {
          const nextColorIndex = (currentColorIndex + 1) % colors.length;
          const nextColor = colors[nextColorIndex];
          let nextColorDuration = 0;
          trafficLight.schedules.forEach((schedule: TrafficLightSchedule) => {
            nextColorDuration =
              (schedule as any)[`${nextColor.toLowerCase()}Duration`] || 0;
          });

          setCurrentColorIndex(nextColorIndex);
          return nextColorDuration;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentColorIndex, trafficLight]);

  return {
    currentColorIndex,
    remainingTime,
    trafficLight,
    setCurrentColorIndex,
  };
}
