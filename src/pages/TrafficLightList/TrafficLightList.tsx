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
import { TrafficLight } from "../../store/trafficSlice";
import "../../App.css";
import "./TrafficLightList.css";
import Spinner from "../../utils/Spinner/Spinner";
import { MouseEvent } from "react";
import { deleteLightById, fetchLights } from "../../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "../../utils/Toast";
import DetailedTrafficLightApi from "../../utils/UseTrafficApi";

const columns = [
  { id: "id", label: "id", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 100, align: "center" },
  { id: "location", label: "Location", minWidth: 100, align: "center" },
  { id: "lights", label: "Lights", minWidth: 100, align: "center" },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

export default function TrafficList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ["fetchLights"],
    queryFn: fetchLights,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["DetailedTrafficLight"] });
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
  // console.log(deleteLightError, deletePostLoading, "deleteLightError");

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (event) {
      event.preventDefault(); // Ensure event is not null before using it
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

  if (data.data.length === 0 && !isLoading) {
    return (
      <div className="not-found-container">
        <h1 className="app-main-heading">No Traffic Lights Found</h1>
        <img
          src={import.meta.env.PUBLIC_URL + "notfound.jpg"}
          alt="No Traffic Lights Found"
          className="not-found-image"
        />
        <button
          className="app-main-button"
          onClick={() => navigate("/add-traffic-light")}
        >
          Add Traffic Light
        </button>
      </div>
    );
  }

  return (
    <div className="traffic-list-container">
      <button
        style={{ alignSelf: "flex-end", margin: "10px" }}
        onClick={() => navigate("/add-traffic-light")}
        className="app-main-button"
      >
        Add Traffic Light
      </button>
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
              {data.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          <DetailedTrafficLightApi lightId={light.id} />
                        )}

                        {/* {column.id === "lights" && (
                          <TrafficLightItem lightId={light.id} />
                        )} */}
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
                              onClick={() =>
                                navigate(`/traffic-light/${light.id}`)
                              }
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
          count={data.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
