import useTrafficLight from "../../utils/UseTrafficLight";
import "./TrafficLightItem.css";
const TrafficLightItem = ({ lightId }: { lightId: number }) => {
  const { remainingTime, currentColorIndex, trafficLight } =
    useTrafficLight(lightId);

  if (!trafficLight) {
    return <h1 className="app-main-heading">Traffic Light not found</h1>;
  }

  const colors = ["red", "yellow", "green"];

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
    </div>
  );
};

export default TrafficLightItem;
