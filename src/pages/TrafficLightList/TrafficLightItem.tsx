import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLightById } from "../../utils/api";
import "./index.css";
import { TrafficLightSchedule } from "../../store/trafficSlice";
import { useNavigate } from "react-router-dom";
import { MdVisibility } from "react-icons/md";

interface TrafficLightItemProps {
  lightId: number;
}

const TrafficLightItem: React.FC<TrafficLightItemProps> = ({ lightId }) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["DetailedTrafficLight", lightId],
    queryFn: () => fetchLightById(lightId),
    staleTime: Infinity,
  });

  const navigate = useNavigate();
  const colors = ["red", "yellow", "green"];

  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);

  // const { mutate: updateLight } = useMutation({
  //   mutationFn: updatetrafficlightColor,
  //   onSuccess: (responseData) => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["fetchLights"],
  //     }),
  //       queryClient.invalidateQueries({
  //         queryKey: ["trafficLightById"],
  //       }),
  //   },
  // });

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

    return () => clearInterval(interval);
  }, [currentColorIndex, data?.data]);

  const handleViewTrafficLight = () => {
    navigate(`/traffic-light/${lightId}`, {
      state: {
        currentColorIndex,
        remainingTime,
      },
    });
  };

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
      <MdVisibility
        onClick={handleViewTrafficLight}
        style={{ cursor: "pointer" }}
        color="blue"
        size={25}
      />
    </div>
  );
};

export default TrafficLightItem;
