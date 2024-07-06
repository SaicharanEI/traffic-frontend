import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchLightById } from "../../service/trafficLight.ts";
import Spinner from "../../components/Spinner.tsx";
import NotFound from "../notFound/index.tsx";
import { TrafficLightForm } from "../../components/trafficLight";

const TrafficLightEdit = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["FetchTrafficLightById", Number(id)],
    queryFn: () => fetchLightById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <Spinner />;
  if (isError || !data?.data) return <NotFound heading="Light not found" />;

  return (
    <TrafficLightForm
      initialData={data.data}
      formType="edit"
      heading="Edit Traffic Light"
    />
  );
};

export default TrafficLightEdit;
