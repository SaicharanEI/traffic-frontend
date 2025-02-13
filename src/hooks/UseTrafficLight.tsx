import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLightById } from "../service/trafficLight";
import { TrafficLightSchedule } from "../types/TrafficLight";

const useTrafficLight = (lightId: number) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["FetchTrafficLightById", lightId],
    queryFn: () => fetchLightById(lightId),
    enabled: !!lightId,
  });

  const firstRender = useRef(true);
  const queryClient = useQueryClient();

  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(1);
  const [mode, setMode] = useState<boolean>(false);

  const colors = ["red", "yellow", "green"];

  useEffect(() => {
    if (firstRender.current) {
      setCurrentColorIndex(
        data && colors.findIndex((color) => color === data?.data.currentColor)
      );
      setMode(data?.data.isAutomatic);
      setRemainingTime(data?.data.timeRemaining);
    }
  }, [data?.data]);

  useEffect(() => {
    if (!data?.data) return;
    if (!mode) return;
    const calculateRemainingTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      let currentColor = "";
      let scheduleMatched = false;
      let currentColorDuration = 0;

      data?.data.schedules?.forEach((schedule: TrafficLightSchedule) => {
        const startTimeparts = schedule.startTime.split("T")[1];
        const [startHours, startMinutes] = startTimeparts.split(":");
        const startHour = parseInt(startHours, 10);
        const startMinute = parseInt(startMinutes, 10);

        const endTimeparts = schedule.endTime.split("T")[1];
        const [endHours, endMinutes] = endTimeparts.split(":");
        const endHour = parseInt(endHours, 10);
        const endMinute = parseInt(endMinutes, 10);

        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;
        if (
          currentTotalMinutes >= startTotalMinutes &&
          currentTotalMinutes < endTotalMinutes
        ) {
          scheduleMatched = true;
          currentColor = colors[currentColorIndex];
          currentColorDuration =
            (schedule as any)[`${currentColor.toLowerCase()}Duration`] || 0;
        }
      });

      const colorIndex = colors.findIndex((color) => color === currentColor);
      if (colorIndex !== -1) {
        if (!firstRender.current) {
          setRemainingTime(currentColorDuration);
        }
      }

      if (!scheduleMatched) {
        scheduleMatched = true;
        setRemainingTime(0);
        setCurrentColorIndex(1);
      }
    };
    calculateRemainingTime();

    const interval = setInterval(() => {
      firstRender.current = false;
      setRemainingTime((prevTime: number) => {
        if (prevTime <= 1) {
          const nextColorIndex = (currentColorIndex + 1) % colors.length;
          const nextColor = colors[nextColorIndex];
          let nextColorDuration = 0;
          data?.data.schedules.forEach((schedule: TrafficLightSchedule) => {
            nextColorDuration =
              (schedule as any)[`${nextColor.toLowerCase()}Duration`] || 0;
          });
          queryClient.setQueryData(
            ["FetchTrafficLightById", lightId],
            (oldData: any) => ({
              ...oldData,
              data: {
                ...oldData.data,
                currentColor: nextColor,
              },
            })
          );

          queryClient.setQueryData(
            ["FetchTrafficLightById", lightId],
            (oldData: any) => ({
              ...oldData,
              data: {
                ...oldData.data,
                timeRemaining: nextColorDuration,
              },
            })
          );
          setCurrentColorIndex(nextColorIndex);
          return nextColorDuration;
        } else {
          queryClient.setQueryData(
            ["FetchTrafficLightById", lightId],
            (oldData: any) => ({
              ...oldData,
              data: {
                ...oldData.data,
                timeRemaining: prevTime - 1,
              },
            })
          );
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentColorIndex, mode]);

  return {
    isLoading,
    data,
    isError,
    remainingTime,
    currentColorIndex,
    mode,
    setMode,
    setCurrentColorIndex,
    setRemainingTime,
    colors,
  };
};

export default useTrafficLight;
