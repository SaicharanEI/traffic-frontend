import { useParams } from "react-router-dom";
import { fetchLightById } from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../utils/Spinner/Spinner";
import { TrafficLightEditComponent } from "../../components/TrafficLightEdit";

function TrafficLightEdit() {
  const { id } = useParams<{ id: string }>();

  const { isLoading, isFetched, data } = useQuery({
    queryKey: ["FetchTrafficLightById", Number(id)],
    queryFn: () => fetchLightById(Number(id)),
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (isFetched) {
    return <TrafficLightEditComponent trafficLight={data.data} />;
  }
  return (
    <>
      <h1>Light not found</h1>
    </>
  );
}

export default TrafficLightEdit;
