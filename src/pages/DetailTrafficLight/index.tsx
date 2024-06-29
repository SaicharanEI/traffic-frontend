import { useLocation, useParams } from "react-router-dom";
import "./index.css";
import { fetchLightById } from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { TrafficLightSchedule } from "../../store/trafficSlice";

const TrafficLightDetail = () => {
  const lightId = Number(useParams<{ id: string }>().id);
  const firstRender = useRef(true);

  const { isLoading, data, isError } = useQuery({
    queryKey: ["DetailedTrafficLight", lightId],
    queryFn: () => fetchLightById(lightId),
    // staleTime: Infinity,
  });

  const colors = ["red", "yellow", "green"];
  const location = useLocation();

  const [remainingTime, setRemainingTime] = useState<number>(
    location.state.remainingTime
  );
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(
    location.state.currentColorIndex
  );

  useEffect(() => {
    if (!data?.data) return;

    const calculateRemainingTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      let currentColor = "";
      let currentColorDuration = 0;

      data?.data.schedules?.forEach((schedule: TrafficLightSchedule) => {
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
        firstRender.current = false;
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
          data.data.schedules.forEach((schedule: TrafficLightSchedule) => {
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

    return () => {
      clearInterval(interval);
    };
  }, [currentColorIndex, data?.data]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError || !data?.data) {
    return <h1 className="app-main-heading">Traffic Light not found</h1>;
  }
  return (
    <div className="detail-traffic-light">
      <div className="trafficlight">
        <div className="protector"></div>
        <div className="protector"></div>
        <div className="protector"></div>
        {/* <div className="protector"></div> */}
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
              // animation:
              //   index === currentColorIndex ? `${color} 1s infinite` : "none",
            }}
            onClick={() => setCurrentColorIndex(index)}
          />
        ))}
        <div className="time-container">
          <div className="detail-traffic-light-time">{remainingTime}</div>
        </div>
      </div>
    </div>
  );
};

export default TrafficLightDetail;

// const data = queryClient.ensureQueryData({
//   queryKey: ["DetailedTrafficLight", lightId],
//   queryFn: () => fetchLightById(lightId),
//   // onSuccess: () => {
//   //   console.log("success");
//   // },
// });
