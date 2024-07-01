import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLightById } from "../../utils/api";
import "./index.css";
import { TrafficLightSchedule } from "../../store/trafficSlice";
// import { useNavigate } from "react-router-dom";
// import { MdVisibility } from "react-icons/md";

interface TrafficLightItemProps {
  lightId: number;
}

const TrafficLightItem: React.FC<TrafficLightItemProps> = ({ lightId }) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["DetailedTrafficLight", lightId],
    queryFn: () => fetchLightById(lightId),
    // refetchInterval: false,
    // refetchOnWindowFocus: false,
    staleTime: Infinity,
    // staleTime: 10 * 60 * 1000,
    // enabled: typeof window !== "undefined",
  });

  const firstRender = useRef(true);

  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const colors = ["red", "yellow", "green"];
  const [remainingTime, setRemainingTime] = useState<number>(
    data && data?.data.timeRemaining
  );

  const [currentColorIndex, setCurrentColorIndex] = useState<number>(
    data ? colors.findIndex((color) => color === data?.data.currentColor) : 0
  );

  useEffect(() => {
    setRemainingTime(data?.data.timeRemaining);
    setCurrentColorIndex(
      data && colors.findIndex((color) => color === data?.data.currentColor)
    );
  }, [data?.data]);

  useEffect(() => {
    if (!data?.data) return;

    const calculateRemainingTime = () => {
      console.log("calculateRemainingTime called", firstRender.current);
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      let currentColor = "";
      let scheduleMatched = false;
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
          scheduleMatched = true;
          currentColor = colors[currentColorIndex];
          currentColorDuration =
            (schedule as any)[`${currentColor.toLowerCase()}Duration`] || 0;
        }
      });

      const colorIndex = colors.findIndex((color) => color === currentColor);
      if (colorIndex !== -1) {
        // setCurrentColorIndex(colorIndex);

        if (!firstRender.current === true) {
          setRemainingTime(currentColorDuration);
        }
      }
      if (!scheduleMatched) {
        setRemainingTime(0);
        setCurrentColorIndex(1);
        scheduleMatched = true; // Default to yellow if no schedule matched
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
            ["DetailedTrafficLight", lightId],
            (oldData: any) => ({
              ...oldData,
              data: {
                ...oldData.data,
                currentColor: nextColor, // Update the currentColor field inside the data object
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
  }, [currentColorIndex]);

  // const handleViewTrafficLight = () => {
  //   navigate(`/traffic-light/${lightId}`, {
  //     state: {
  //       currentColorIndex,
  //       remainingTime,
  //     },
  //   });
  // };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError || !data?.data) {
    return <h1 className="app-main-heading">Traffic Light not found</h1>;
  }

  return (
    <div className="traffic-list-item">
      <div className="traffic-list-item-colors">
        {colors.map((color, index) => (
          <div
            key={color}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: index === currentColorIndex ? color : "grey",
            }}
          />
        ))}
      </div>
      <div className="traffic-list-item-time">{remainingTime}</div>
      {/* <MdVisibility
        onClick={handleViewTrafficLight}
        style={{ cursor: "pointer" }}
        color="blue"
        size={25}
      /> */}
    </div>
  );
};

export default TrafficLightItem;
