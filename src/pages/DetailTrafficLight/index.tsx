import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { changeAutomaticMode, fetchLightById } from "../../utils/api";
import { TrafficLightSchedule } from "../../components/Interfaces/trafficLight";
import { showToast } from "../../utils/Toast";
import "./index.css";

function TrafficLightDetail(): JSX.Element {
  const lightId = Number(useParams<{ id: string }>().id);

  const { isLoading, data, isError } = useQuery({
    queryKey: ["DetailedTrafficLight", lightId],
    queryFn: () => fetchLightById(lightId),
  });

  const { mutate: updateLightMode } = useMutation({
    mutationFn: changeAutomaticMode,
    onSuccess: (responseData) => {
      console.log(responseData);
      queryClient.invalidateQueries({
        queryKey: ["fetchLights"],
      }),
        queryClient.invalidateQueries({
          queryKey: ["DetailedTrafficLight", lightId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["FetchTrafficLightById", lightId],
        }),
        showToast("success", responseData.message);
    },
  });

  const firstRender = useRef(true);
  const queryClient = useQueryClient();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [mode, setMode] = useState<boolean>(false);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(1);

  const colors = ["red", "yellow", "green"];
  useEffect(() => {
    if (firstRender.current) {
      setRemainingTime(data?.data.timeRemaining);
      setMode(data?.data.isAutomatic);
      setCurrentColorIndex(
        data && colors.findIndex((color) => color === data?.data.currentColor)
      );
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
      setRemainingTime((prevTime: number): number => {
        if (prevTime <= 1) {
          const nextColorIndex = (currentColorIndex + 1) % colors.length;
          const nextColor = colors[nextColorIndex];
          let nextColorDuration = 0;
          data?.data.schedules.forEach((schedule: TrafficLightSchedule) => {
            nextColorDuration =
              (schedule as any)[`${nextColor.toLowerCase()}Duration`] || 0;
          });
          queryClient.setQueryData(
            ["DetailedTrafficLight", lightId],
            (oldData: any) => ({
              ...oldData,
              data: {
                ...oldData.data,
                currentColor: nextColor,
              },
            })
          );
          queryClient.setQueryData(
            ["DetailedTrafficLight", lightId],
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
            ["DetailedTrafficLight", lightId],
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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError || !data?.data) {
    return <h1 className="app-main-heading">Traffic Light not found</h1>;
  }

  const changeMode = (change: boolean, color: string): void => {
    updateLightMode({ id: lightId, mode: change, color: color });
    setCurrentColorIndex(colors.findIndex((c) => c === color));
    setMode(change);
    setRemainingTime(0);
  };

  return (
    <div className="detail-traffic-light-container">
      <h3>
        {data?.data.name}, {data?.data.location}
      </h3>
      <div className="automatic-container">
        <p>Automatic Mode : {mode ? "ON" : "OFF"} </p>
        <button
          className="app-main-button"
          onClick={() => changeMode(!mode, "yellow")}
        >
          change mode
        </button>
      </div>
      <div className="detail-traffic-light">
        <div className="trafficlight">
          <div className="protector"></div>
          <div className="protector"></div>
          <div className="protector"></div>
          {colors.map((color, index) => (
            <div
              key={color}
              className={color}
              style={{
                backgroundColor: index === currentColorIndex ? color : "",
                boxShadow:
                  index === currentColorIndex
                    ? `2px 1px 25px #111 inset, 0 1px 10px ${color}`
                    : "none",
              }}
              onClick={() => changeMode(false, colors[index])}
            />
          ))}
          <div className="time-container">
            <div className="detail-traffic-light-time">{remainingTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrafficLightDetail;
