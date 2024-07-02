import { useEffect, useState } from "react";
import {
  TrafficLightSchedule,
  TrafficLight,
} from "../components/icons/Interfaces/trafficLight";

export default function useTrafficLight(light: TrafficLight | undefined) {
  const [trafficLight, setTrafficLight] = useState<TrafficLight | undefined>(
    light
  );
  const colors = ["red", "yellow", "green"];
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);

  useEffect(() => {
    if (!light) return;

    setTrafficLight(light);

    const calculateRemainingTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      let currentColor = "";
      let currentColorDuration = 0;

      light.schedules?.forEach((schedule: TrafficLightSchedule) => {
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
          currentColorDuration =
            (schedule as any)[`${currentColor.toLowerCase()}Duration`] || 0;
        }
      });

      const colorIndex = colors.findIndex((color) => color === currentColor);
      if (colorIndex !== -1) {
        setCurrentColorIndex(colorIndex);
        setRemainingTime(currentColorDuration);
      }
    };

    calculateRemainingTime();

    const interval = setInterval(() => {
      setRemainingTime((prevTime: number) => {
        if (prevTime <= 1) {
          const nextColorIndex = (currentColorIndex + 1) % colors.length;
          const nextColor = colors[nextColorIndex];
          let nextColorDuration = 0;
          light.schedules.forEach((schedule: TrafficLightSchedule) => {
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
  }, [light, currentColorIndex, trafficLight]);

  return {
    currentColorIndex,
    remainingTime,
    trafficLight,
    setCurrentColorIndex,
  };
}
