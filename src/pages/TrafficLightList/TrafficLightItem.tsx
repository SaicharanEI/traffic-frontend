import useTrafficLight from "../../hooks/UseTrafficLight";
import styles from "./list.module.css";
import classes from "../../../src/App.module.css";

interface TrafficLightItemProps {
  lightId: number;
}
const TrafficLightItem = ({ lightId }: TrafficLightItemProps): JSX.Element => {
  const { ...data } = useTrafficLight(lightId);

  if (data.isLoading) {
    return <p>Loading...</p>;
  }

  if (data.isError || !data.data?.data) {
    return (
      <h1 className={classes["app-main-heading"]}>Traffic Light not found</h1>
    );
  }

  return (
    <div className="d-flex flex-row justify-content-around align-items-center">
      <div className="d-flex flex-row justify-content-start gap-3 align-items-center">
        {data.colors.map((color, index) => (
          <div
            key={color}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor:
                index === data.currentColorIndex ? color : "grey",
            }}
          />
        ))}
      </div>
      <div className={styles.list_item_time}>{data.remainingTime}</div>
    </div>
  );
};

export default TrafficLightItem;
