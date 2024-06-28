import { useParams } from "react-router-dom";
import useTrafficLight from "../../utils/UseTrafficLight";
import "./DetailTrafficLight.css";
import { fetchLightById } from "../../utils/api";
import { useQuery } from "@tanstack/react-query";

function TrafficLightDetail() {
  const lightId = Number(useParams<{ id: string }>().id);

  const { isLoading, isFetched, data, isError } = useQuery({
    queryKey: ["DetailedTrafficLight", lightId],
    queryFn: () => fetchLightById(lightId),
    staleTime: Infinity,
  });
  const {
    remainingTime,
    currentColorIndex,
    trafficLight,
    setCurrentColorIndex,
  } = useTrafficLight(data?.data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data.data) {
    return <div>Traffic Light not found</div>;
  }

  const colors = ["red", "yellow", "green"];

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
}

export default TrafficLightDetail;
