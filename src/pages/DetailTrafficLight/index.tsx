// import { useLocation, useParams } from "react-router-dom";
// import "./index.css";
// import { fetchLightById } from "../../utils/api";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useRef, useState } from "react";
// import { TrafficLightSchedule } from "../../store/trafficSlice";

// const TrafficLightDetail = () => {
//   const lightId = Number(useParams<{ id: string }>().id);
//   const firstRender = useRef(true);

//   const { isLoading, data, isError } = useQuery({
//     queryKey: ["DetailedTrafficLight", lightId],
//     queryFn: () => fetchLightById(lightId),
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     refetchOnWindowFocus: false,
//   });

//   const queryClient = useQueryClient();
//   const colors = ["red", "yellow", "green"];
//   const location = useLocation();

//   const [remainingTime, setRemainingTime] = useState<number>(
//     data && data?.data.timeRemaining
//   );
//   const [currentColorIndex, setCurrentColorIndex] = useState<number>(
//     data ? colors.findIndex((color) => color === data?.data.currentColor) : 0
//   );

//   useEffect(() => {
//     if (firstRender.current) {
//       setRemainingTime(data?.data.timeRemaining);
//       setCurrentColorIndex(
//         data && colors.findIndex((color) => color === data?.data.currentColor)
//       );
//     }
//   }, [data?.data]);

//   useEffect(() => {
//     if (!data?.data) return;

//     console.log("useffect called");
//     const now = new Date();
//     const currentHour = now.getHours();
//     const currentMinute = now.getMinutes();
//     const currentTotalMinutes = currentHour * 60 + currentMinute;
//     let currentColor = "";
//     let currentColorDuration = 0;

//     const calculateRemainingTime = () => {
//       let scheduleMatched = false;
//       console.log("inside calculate remaining time");
//       data?.data.schedules?.forEach((schedule: TrafficLightSchedule) => {
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
//           console.log("inside if");
//           scheduleMatched = true;
//           currentColor = colors[currentColorIndex];
//           currentColorDuration =
//             (schedule as any)[`${currentColor.toLowerCase()}Duration`] || 0;
//         }
//       });
//       if (scheduleMatched) {
//         const colorIndex = colors.findIndex((color) => color === currentColor);
//         if (colorIndex !== -1) {
//           setCurrentColorIndex(colorIndex);
//           if (!firstRender.current === true) {
//             setRemainingTime(currentColorDuration);
//           }
//           firstRender.current = false;
//           scheduleMatched = false;
//         }
//       } else {
//         scheduleMatched = true;
//         setRemainingTime(0);
//         setCurrentColorIndex(1);
//       }
//     };
//     if (firstRender.current) {
//     } else {
//       calculateRemainingTime();
//     }

//     const interval = setInterval(() => {
//       firstRender.current = false;
//       setRemainingTime((prevTime: number) => {
//         if (prevTime <= 1) {
//           console.log(prevTime, "less than 1");
//           const nextColorIndex = (currentColorIndex + 1) % colors.length;
//           const nextColor = colors[nextColorIndex];
//           let nextColorDuration = 0;
//           data?.data.schedules.forEach((schedule: TrafficLightSchedule) => {
//             nextColorDuration =
//               (schedule as any)[`${nextColor.toLowerCase()}Duration`] || 0;
//           });

//           queryClient.setQueryData(
//             ["DetailedTrafficLight", lightId],
//             (oldData: any) => ({
//               ...oldData,
//               data: {
//                 ...oldData.data,
//                 currentColor: nextColor, // Update the currentColor field inside the data object
//               },
//             })
//           );
//           queryClient.setQueryData(
//             ["DetailedTrafficLight", lightId],
//             (oldData: any) => ({
//               ...oldData,
//               data: {
//                 ...oldData.data,
//                 timeRemaining: nextColorDuration,
//               },
//             })
//           );

//           setCurrentColorIndex(nextColorIndex);
//           console.log(nextColor, "from useeffect", nextColorDuration);
//           return nextColorDuration;
//         } else {
//           queryClient.setQueryData(
//             ["DetailedTrafficLight", lightId],
//             (oldData: any) => ({
//               ...oldData,
//               data: {
//                 ...oldData.data,
//                 timeRemaining: prevTime - 1,
//               },
//             })
//           );
//           return prevTime - 1;
//         }
//       });
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [currentColorIndex]);

//   if (isLoading) {
//     return <h1>Loading...</h1>;
//   }

//   if (isError || !data?.data) {
//     return <h1 className="app-main-heading">Traffic Light not found</h1>;
//   }
//   return (
//     <div className="detail-traffic-light">
//       <div className="trafficlight">
//         <div className="protector"></div>
//         <div className="protector"></div>
//         <div className="protector"></div>
//         {/* <div className="protector"></div> */}
//         {colors.map((color, index) => (
//           <div
//             key={color}
//             className={color}
//             style={{
//               backgroundColor: index === currentColorIndex ? color : "",
//               boxShadow:
//                 index === currentColorIndex
//                   ? `2px 1px 25px #111 inset, 0 1px 10px ${color}`
//                   : "none",
//               // animation:
//               //   index === currentColorIndex ? `${color} 1s infinite` : "none",
//             }}
//             onClick={() => setCurrentColorIndex(index)}
//           />
//         ))}
//         <div className="time-container">
//           <div className="detail-traffic-light-time">{remainingTime}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrafficLightDetail;

// // const data = queryClient.ensureQueryData({
// //   queryKey: ["DetailedTrafficLight", lightId],
// //   queryFn: () => fetchLightById(lightId),
// //   // onSuccess: () => {
// //   //   console.log("success");
// //   // },
// // });

// //fix the error such that matched color in schedule need to be set  and in first render calculate time should not be called

import { useParams } from "react-router-dom";
import "./index.css";
import { fetchLightById } from "../../utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { TrafficLightSchedule } from "../../store/trafficSlice";

function TrafficLightDetail() {
  const lightId = Number(useParams<{ id: string }>().id);

  const { isLoading, data, isError } = useQuery({
    queryKey: ["DetailedTrafficLight", Number(lightId)],
    queryFn: () => fetchLightById(lightId),
    // refetchInterval: false,
    // refetchOnWindowFocus: false,
    staleTime: Infinity,
    // staleTime: 10 * 60 * 1000,
    // enabled: typeof window !== "undefined",
  });

  const firstRender = useRef(true);

  const queryClient = useQueryClient();
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
          console.log(currentColorDuration, "currentColorDuration");
          setRemainingTime(currentColorDuration);
        }
      }

      if (!scheduleMatched) {
        scheduleMatched = true; // Default to yellow if no schedule matched
        setRemainingTime(0);
        setCurrentColorIndex(1);
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
}

export default TrafficLightDetail;
