// import { useEffect, useState } from "react";
// import { TrafficLightSchedule, TrafficLight } from "../store/trafficSlice";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updatetrafficlightColor } from "./api";
// import useTrafficLightHook from "./useTrafficLighHookt";

// export default function useTrafficLight(light: TrafficLight) {
//   const { updateRemaningTime, updateCurrentColorIndex } = useTrafficLightHook();
//   const [trafficLight, setTrafficLight] = useState<TrafficLight>(light);
//   const colors = ["red", "yellow", "green"];
//   const [remainingTime, setRemainingTime] = useState<number>(0);
//   const [currentColorIndex, setCurrentColorIndex] = useState<number>();
//   const queryClient = useQueryClient();

//   const { mutate: updateColor } = useMutation({
//     mutationFn: updatetrafficlightColor,
//     // onMutate: async (variables: { lightId: number; color: string }) => {
//     //   // Cancel any ongoing refetches for the specific query key
//     //   await queryClient.cancelQueries({
//     //     queryKey: ["DetailedTrafficLight", variables.lightId],
//     //   });
//     //   // Snapshot the previous value
//     //   const previousTrafficLight = queryClient.getQueryData([
//     //     "DetailedTrafficLight",
//     //     variables.lightId,
//     //   ]);

//     //   console.log(previousTrafficLight, "previousTrafficLight");
//     //   queryClient.setQueryData(
//     //     ["DetailedTrafficLight", variables.lightId],
//     //     (oldData: any) => ({
//     //       ...oldData,
//     //       data: {
//     //         ...oldData.data,
//     //         currentColor: variables.color, // Update the currentColor field inside the data object
//     //       },
//     //     })
//     //   );

//     //   // Return the previous value to use as rollback in case of error
//     //   return { previousTrafficLight };
//     // },

//     // onSettled function can be used for post-mutation logic, such as refetching data
//     onSuccess: () => {
//       // Invalidate and refetch the data for the specific query key after mutation
//       queryClient.invalidateQueries({
//         queryKey: ["DetailedTrafficLight", light.id],
//       });
//     },
//   });

//   useEffect(() => {
//     if (!trafficLight) return;
//     const calculateRemainingTime = () => {
//       const now = new Date();
//       const currentHour = now.getHours();
//       const currentMinute = now.getMinutes();
//       const currentTotalMinutes = currentHour * 60 + currentMinute;
//       let currentColor = "";
//       let currentColorDuration;
//       trafficLight?.schedules?.forEach((schedule: TrafficLightSchedule) => {
//         const startTimeParts = schedule.startTime.split(":");
//         const endTimeParts = schedule.endTime.split(":");
//         const startHour = parseInt(startTimeParts[0], 10);
//         const startMinute = parseInt(startTimeParts[1], 10);
//         const endHour = parseInt(endTimeParts[0], 10);
//         const endMinute = parseInt(endTimeParts[1], 10);

//         const startTotalMinutes = startHour * 60 + startMinute;
//         const endTotalMinutes = endHour * 60 + endMinute;

//         if (
//           currentTotalMinutes >= startTotalMinutes &&
//           currentTotalMinutes < endTotalMinutes
//         ) {
//           // currentColor = trafficLight.currentColor;
//           // setCurrentColorIndex(colors.indexOf(currentColorIndex));
//           // // currentColorDuration =
//           //   schedule[`${currentColor.toLowerCase()}Duration`] || 0;
//           currentColor = light.currentColor;
//           // setCurrentColorIndex(colorIndex);
//           currentColorDuration =
//             (schedule as any)[`${currentColor.toLowerCase()}Duration`] || 0;
//         }
//       });

//       const colorIndex = colors.findIndex((color) => color === currentColor);
//       if (colorIndex !== -1) {
//         setCurrentColorIndex(colorIndex);
//         setRemainingTime(Number(currentColorDuration));
//         updateColor;
//         updateRemaningTime(light.id, Number(currentColorDuration));
//       }
//     };

//     calculateRemainingTime();

//     const interval = setInterval(() => {
//       setRemainingTime((prevTime: number) => {
//         if (prevTime <= 1) {
//           const nextColorIndex = (currentColorIndex + 1) % colors.length;
//           const nextColor = colors[nextColorIndex];
//           let nextColorDuration = 0;
//           trafficLight.schedules.forEach((schedule: TrafficLightSchedule) => {
//             nextColorDuration =
//               (schedule as any)[`${nextColor.toLowerCase()}Duration`] || 0;
//           });
//           updateColor({ lightId: trafficLight.id, color: nextColor });
//           console.log(trafficLight.id, nextColor, "from useeffect");
//           updateCurrentColorIndex(trafficLight.id, nextColor);
//           setCurrentColorIndex(nextColorIndex);
//           return nextColorDuration;
//         } else {
//           updateRemaningTime(trafficLight.id, prevTime - 1);
//           return prevTime - 1;
//         }
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [currentColorIndex, trafficLight]);

//   return {
//     currentColorIndex,
//     remainingTime,
//     trafficLight,
//     setCurrentColorIndex,
//   };
// }

import { useEffect, useState } from "react";
import { TrafficLightSchedule, TrafficLight } from "../store/trafficSlice";

export default function useTrafficLight(light: TrafficLight | undefined) {
  const [trafficLight, setTrafficLight] = useState<TrafficLight | undefined>(
    light
  );
  const colors = ["red", "yellow", "green"];
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);

  useEffect(() => {
    if (!light) return;

    setTrafficLight(light);

    const calculateRemainingTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      let currentColor = "";
      let currentColorDuration = 0;

      light.schedules?.forEach((schedule: TrafficLightSchedule) => {
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
          light.schedules.forEach((schedule: TrafficLightSchedule) => {
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
  }, [light, currentColorIndex, trafficLight]);

  return {
    currentColorIndex,
    remainingTime,
    trafficLight,
    setCurrentColorIndex,
  };
}
