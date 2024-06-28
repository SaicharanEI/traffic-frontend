import { useEffect, useState } from "react";
import { TrafficLightSchedule, TrafficLight } from "../store/trafficSlice";

export default function useTrafficLight(lightId: number) {
  const [trafficLight, setTrafficLight] = useState<TrafficLight>();
  const colors = ["red", "yellow", "green"];
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(1);

  const fetchdata = async (lightId: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}trafficlight/${lightId}`
    );

    if (response.ok) {
      const data = await response.json();
      setTrafficLight(data.data);
    }
  };

  useEffect(() => {
    fetchdata(lightId);
  }, []);

  useEffect(() => {
    if (!trafficLight) return;
    const calculateRemainingTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      let currentColor = "";
      let currentColorDuration = 0;

      trafficLight.schedules?.forEach((schedule: TrafficLightSchedule) => {
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
          console.log(schedule.timePeriod, "time period");
          currentColor = colors[currentColorIndex];
          // currentColorDuration =
          //   schedule[`${currentColor.toLowerCase()}Duration`] || 0;
          currentColorDuration =
            (schedule as any)[`${currentColor.toLowerCase()}Duration`] || 0;
        }
      });

      const colorIndex = colors.findIndex((color) => color === currentColor);
      if (colorIndex !== -1) {
        console.log(colorIndex, "color index");
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
          console.log(nextColor);
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
