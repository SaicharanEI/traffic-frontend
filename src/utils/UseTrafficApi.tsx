import { useQuery } from "@tanstack/react-query";
import { fetchLightById } from "./api";
import TrafficLightItem from "../pages/TrafficLightList/TrafficLightItem";

const DetailedTrafficLightApi = ({ lightId }: { lightId: number }) => {
  const { isLoading, isFetched, data, isError } = useQuery({
    queryKey: ["DetailedTrafficLight", lightId],
    queryFn: () => fetchLightById(lightId),
    staleTime: Infinity,
  });
  //   useEffect(() => {
  //     if (data) {
  //       setTrafficLight(data?.data);
  //       console.log(data?.data, "from useeffect");
  //     }
  //   }, [data]);
  //   console.log(data, isLoading, isFetched, "from usequery");
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (data) {
    // return (
    return <TrafficLightItem light={data?.data} />;
    //   <p style={{ color: "red" }}>hello</p>
  }
  if (isError) {
    return <h1>Error</h1>;
  }
};

export default DetailedTrafficLightApi;
