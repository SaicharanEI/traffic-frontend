import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

import { changeAutomaticMode } from "../../service/trafficLight";
import { showToast } from "../../utils/Toast";
import useTrafficLight from "../../hooks/useTrafficLight";
import styles from "./detail.module.css";

function TrafficLightDetail(): JSX.Element {
  const lightId = Number(useParams<{ id: string }>().id);
  const queryClient = useQueryClient();
  const { mode, ...data } = useTrafficLight(lightId);

  const { mutate: updateLightMode } = useMutation({
    mutationFn: changeAutomaticMode,
    onSuccess: (responseData) => {
      console.log(responseData);
      // queryClient.invalidateQueries({
      //   queryKey: ["fetchLights"],
      // }),
      // queryClient.invalidateQueries({
      //   queryKey: ["DetailedTrafficLight", lightId],
      // }),
      queryClient.invalidateQueries({
        queryKey: ["FetchTrafficLightById", lightId],
      }),
        showToast("success", responseData.message);
    },
  });

  if (data.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (data.isError || !data.data?.data) {
    return <h1 className="app-main-heading">Traffic Light not found</h1>;
  }

  const changeMode = (change: boolean, color: string): void => {
    updateLightMode({ id: lightId, mode: change, color: color });
    data.setCurrentColorIndex(data.colors.findIndex((c) => c === color));
    data.setMode(change);
    data.setRemainingTime(0);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex flex-column justify-content-center align-items-center gap-2 mt-3">
          <h3>
            {data.data?.data.name}, {data.data?.data.location}
          </h3>
          <div className="d-flex flex-row gap-3 justify-content-center align-items-center">
            <p className="m-0 p-0">Automatic Mode :</p>
            {mode ? (
              <FaToggleOn
                size={40}
                color="green"
                onClick={() => changeMode(false, "yellow")}
              />
            ) : (
              <FaToggleOff
                size={40}
                color="red"
                onClick={() => changeMode(true, "yellow")}
              />
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className={styles.traffic_light}>
              <div className={styles.protector}></div>
              <div className={styles.protector}></div>
              <div className={styles.protector}></div>
              {data.colors.map((color, index) => (
                <div
                  key={color}
                  className={styles[color]}
                  style={{
                    backgroundColor:
                      index === data.currentColorIndex ? color : "",
                    boxShadow:
                      index === data.currentColorIndex
                        ? `2px 1px 25px #111 inset, 0 1px 10px ${color}`
                        : "none",
                  }}
                  onClick={() => changeMode(false, data.colors[index])}
                />
              ))}
              <div className={styles.time_container}>
                <div className={styles.traffic_light_time}>
                  {data.remainingTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrafficLightDetail;
