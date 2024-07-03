// import { useParams } from "react-router-dom";
// import { fetchLightById } from "../../utils/api";
// import { useQuery } from "@tanstack/react-query";
// import Spinner from "../../utils/Spinner/Spinner";
// import { TrafficLightEditComponent } from "../../components/TrafficLightEdit";
// import NotFound from "../NotFound/NotFound";

// function TrafficLightEdit() {
//   const { id } = useParams<{ id: string }>();

//   const { isLoading, isFetched, data, isError } = useQuery({
//     queryKey: ["FetchTrafficLightById", Number(id)],
//     queryFn: () => fetchLightById(Number(id)),
//   });

//   if (!data?.data && !isLoading) {
//     console.log(isFetched, "from not found");
//     <NotFound heading="Light not found" />;
//   }

//   console.log(!data?.data, isError, isLoading);
//   // if (isLoading) {
//   //   return <Spinner />;
//   // }
//   if (isFetched && data?.data) {
//     console.log(data?.data);
//     return <TrafficLightEditComponent trafficLight={data?.data} />;
//   }
//   return <Spinner />;
//   // <NotFound heading="Light not found" />;
// }

// export default TrafficLightEdit;

import { useParams } from "react-router-dom";
import { fetchLightById } from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../utils/Spinner/Spinner";
import { TrafficLightEditComponent } from "../../components/TrafficLightEdit";
import NotFound from "../NotFound/NotFound";

function TrafficLightEdit() {
  const { id } = useParams<{ id: string }>();

  const { isFetched, data, isError } = useQuery({
    queryKey: ["FetchTrafficLightById", Number(id)],
    queryFn: () => fetchLightById(Number(id)),
  });

  if (isError || !data?.data) {
    return <NotFound heading="Light not found" />;
  }

  if (isFetched && data?.data) {
    return <TrafficLightEditComponent trafficLight={data.data} />;
  }

  return <Spinner />;
}

export default TrafficLightEdit;
