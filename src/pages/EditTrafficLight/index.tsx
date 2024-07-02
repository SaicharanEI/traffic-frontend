import { useParams } from "react-router-dom";
import { fetchLightById } from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../utils/Spinner/Spinner";
import { TrafficLightEditComponent } from "../../components/TrafficLightEdit";
import NotFound from "../NotFound/NotFound";

function TrafficLightEdit() {
  const { id } = useParams<{ id: string }>();

  const { isLoading, isFetched, data, isError } = useQuery({
    queryKey: ["FetchTrafficLightById", Number(id)],
    queryFn: () => fetchLightById(Number(id)),
  });

  if (isError) {
    <NotFound heading="Light not found" />;
  }

  if (isLoading) {
    return <Spinner />;
  }
  if (isFetched && data?.data) {
    return <TrafficLightEditComponent trafficLight={data?.data} />;
  }
}

export default TrafficLightEdit;
