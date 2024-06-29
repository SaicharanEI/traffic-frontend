import useLocalStorage from "./useLocalStorage";

function useTrafficLightHook() {
  const [trafficLights, setTrafficLights] = useLocalStorage<any[]>(
    "trafficLight",
    []
  );

  const addList = (list: any[]) => {
    setTrafficLights(list);
  };

  const addSingle = (light: any) => {
    setTrafficLights([...trafficLights, light]);
  };

  const updateSingle = (light: any) => {
    setTrafficLights(trafficLights.map((l) => (l.id === light.id ? light : l)));
  };

  const updateCurrentColorIndex = (id: number, color: number) => {
    setTrafficLights(
      trafficLights.map((light) =>
        light.id === id ? { ...light, currentColorIndex: color } : light
      )
    );
  };

  const updateRemaningTime = (id: number, time: number) => {
    setTrafficLights(
      trafficLights.map((light) =>
        light.id === id ? { ...light, remainingTime: time } : light
      )
    );
  };

  const getRemainingTime = (id: number) => {
    return trafficLights.find((light) => light.id === id)?.remainingTime;
  };

  const getCurrentColorIndex = (id: number) => {
    return trafficLights.find((light) => light.id === id)?.currentColor;
  };
  return {
    trafficLights,
    addList,
    addSingle,
    updateCurrentColorIndex,
    getCurrentColorIndex,
    getRemainingTime,
    updateRemaningTime,
    updateSingle,
  };
}

export default useTrafficLightHook;
