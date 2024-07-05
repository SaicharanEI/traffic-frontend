import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import { deleteLightById, fetchLights } from "../../utils/Api";
import NotFound from "../notFound";
import { showToast } from "../../utils/Toast";
import Pagination from "./Pagination";
import TrafficTable from "./Table";
import Button from "../../components/button";
import styles from "../../../src/App.module.css";

const TrafficList = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ["fetchLights"],
    queryFn: fetchLights,
  });

  const { mutate: deleteLight } = useMutation({
    mutationFn: deleteLightById,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["fetchLights"] });
      showToast("success", responseData.message);
    },
  });

  const onClickDeleteTrafficLight = async (id: number): Promise<void> => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this traffic light?"
    );
    if (!confirmDeletion) {
      return;
    }
    deleteLight(id);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (data?.data?.length === 0 && !isLoading) {
    return (
      <>
        <NotFound heading="No Traffic Lights Found" />
        <Button
          type="button"
          title="Add Traffic Light"
          onClick={() => navigate("/add-traffic-light")}
        />
      </>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row p-3">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <h1
            className={`${styles.app_main_heading}  text-center`}
            style={{ flex: "1" }}
          >
            Traffic Lights
          </h1>
          <Button
            className="margin-left-auto"
            type="button"
            title="Add Traffic Light"
            onClick={() => navigate("/add-traffic-light")}
          />
        </div>
        <TrafficTable
          data={data?.data}
          page={page}
          rowsPerPage={rowsPerPage}
          onClickDeleteTrafficLight={onClickDeleteTrafficLight}
        />
        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalLights={data?.data?.length || 0}
          onPageChange={setPage}
          onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default TrafficList;
