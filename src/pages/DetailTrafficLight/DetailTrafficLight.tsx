import { useParams } from "react-router-dom";
import useTrafficLight from "../../utils/UseTrafficLight";
import "./DetailTrafficLight.css";

function TrafficLightDetail() {
  const lightId = Number(useParams<{ id: string }>().id);
  const {
    remainingTime,
    currentColorIndex,
    trafficLight,
    setCurrentColorIndex,
  } = useTrafficLight(lightId);

  if (!trafficLight) {
    return <div>Traffic Light not found</div>;
  }

  const colors = ["red", "yellow", "green"];

  //   return (
  //     <div className="detail-traffic-light">
  //       <h1 className="app-main-heading">Traffic Light Details</h1>
  //       <h2 className="app-main-heading"> {trafficLight.location}</h2>
  //       <div className="detail-traffic-light-colors-container">
  //         {colors.map((color, index) => (
  //           <div
  //             onClick={() => setCurrentColorIndex(index)}
  //             className="detail-traffic-light-color"
  //             key={color}
  //             style={{
  //               backgroundColor: index === currentColorIndex ? color : "grey",
  //             }}
  //           />
  //         ))}
  //         <div className="detail-traffic-light-time">{remainingTime}</div>
  //       </div>
  //     </div>
  //   );
  // }

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
