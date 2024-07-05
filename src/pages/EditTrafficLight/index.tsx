import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchLightById } from "../../utils/Api.ts";
import Spinner from "../../components/spinner/index.tsx";
import NotFound from "../notFound/index.tsx";
import TrafficLightForm from "../../components/trafficLight/TrafficForm.tsx";

const TrafficLightEdit = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["FetchTrafficLightById", Number(id)],
    queryFn: () => fetchLightById(Number(id)),
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
