import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { MdDelete, MdEditSquare, MdVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TrafficLight } from "../../components/Interfaces/trafficLight";
import "../../App.css";
import "./index.css";
import Spinner from "../../utils/Spinner/Spinner";
import { MouseEvent } from "react";
import { deleteLightById, fetchLights } from "../../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "../../utils/Toast";
import TrafficLightItem from "./TrafficLightItem";
import NotFound from "../NotFound";

const columns = [
  { id: "id", label: "id", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 100, align: "center" },
  { id: "location", label: "Location", minWidth: 100, align: "center" },
  { id: "lights", label: "Lights", minWidth: 100, align: "center" },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

const TrafficList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["fetchLights"],
    queryFn: fetchLights,
  });

  const queryClient = useQueryClient();

  const { mutate: deleteLight } = useMutation({
    mutationFn: deleteLightById,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["fetchLights"] });
      Toast.fire({
        icon: "success",
        title: responseData.message,
      });
    },
  });

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (event) {
      event.preventDefault();
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickDeleteTrafficLight = async (id: number) => {
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

  const handleViewTrafficLight = (lightId: number) => {
    navigate(`/traffic-light/${lightId}`);
  };
  console.log(data?.data?.length);
  if (data?.data?.length === 0 && !isLoading) {
    return (
      <>
        <NotFound heading="No Traffic Lights Found" />
        <button
          className="app-main-button"
          onClick={() => navigate("/add-traffic-light")}
        >
          Add Traffic Light
        </button>
      </>
    );
  }

  return (
    <div className="traffic-list-container">
      <div className="traffic-list-header">
        <h1
          className="app-main-heading"
          style={{ textAlign: "center", flex: "1" }}
        >
          Traffic Lights
        </h1>
        <button
          style={{ marginLeft: "auto" }}
          onClick={() => navigate("/add-traffic-light")}
          className="app-main-button"
        >
          Add Traffic Light
        </button>
      </div>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align as any}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#293b51",
                      color: "#fff",
                      zIndex: 0,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((light: TrafficLight) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={light.id}
                    className="rowHover"
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align as any}>
                        {column.id === "id" && light[column.id]}
                        {column.id === "name" && light[column.id]}
                        {column.id === "location" && light[column.id]}
                        {column.id === "lights" && (
                          <TrafficLightItem lightId={light.id} />
                        )}
                        {column.id === "actions" && (
                          <div>
                            <MdEditSquare
                              style={{ cursor: "pointer" }}
                              color="green"
                              size={25}
                              onClick={() =>
                                navigate(`/traffic-light-edit/${light.id}`)
                              }
                            />
                            <MdDelete
                              style={{ cursor: "pointer" }}
                              color="red"
                              size={25}
                              onClick={() =>
                                onClickDeleteTrafficLight(light.id)
                              }
                            />
                            <MdVisibility
                              style={{ cursor: "pointer" }}
                              color="blue"
                              size={25}
                              onClick={() => handleViewTrafficLight(light.id)} // Placeholder for your logic
                            />
                          </div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data?.data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default TrafficList;
