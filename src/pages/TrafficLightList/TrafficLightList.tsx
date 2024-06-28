import { useState, useEffect } from "react";
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
import useFetch from "../../utils/service";
import TrafficLightItem from "./TrafficLightItem";
import Spinner from "../../utils/Spinner/Spinner";
import { MouseEvent } from "react";

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
  const { fetchData, state } = useFetch<TrafficLight[]>();
  const [trafficLights, setTrafficLights] = useState<TrafficLight[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData("trafficlights", "GET");
  }, []);

  useEffect(() => {
    if (state.data) {
      setTrafficLights(state.data);
    }
  }, [state.data]);

  // const handleChangePage = (newPage: number) => {
  //   setPage(newPage);
  // };

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
    await fetchData("deletetrafficlight/" + id, "DELETE");
    await fetchData("trafficlights", "GET");
  };

  if (state.loading) {
    return <Spinner />;
  }

  if (trafficLights.length === 0 && !state.loading) {
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
              {trafficLights
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((light) => (
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
          count={trafficLights.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
