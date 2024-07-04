// import { useState } from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { MdDelete, MdEditSquare, MdVisibility } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { TrafficLight } from "../../components/Interfaces/trafficLight";
// import "../../App.css";
// import "./index.css";
// import Spinner from "../../utils/Spinner/Spinner";
// import { MouseEvent } from "react";
// import { deleteLightById, fetchLights } from "../../utils/api";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import TrafficLightItem from "./TrafficLightItem";
// import NotFound from "../NotFound";
// import { showToast } from "../../utils/Toast";

// const columns = [
//   { id: "id", label: "id", minWidth: 100, align: "center" },
//   { id: "name", label: "Name", minWidth: 100, align: "center" },
//   { id: "location", label: "Location", minWidth: 100, align: "center" },
//   { id: "lights", label: "Lights", minWidth: 100, align: "center" },
//   { id: "actions", label: "Actions", minWidth: 100, align: "center" },
// ];

// const TrafficList = (): JSX.Element => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const navigate = useNavigate();
//   const { isLoading, data } = useQuery({
//     queryKey: ["fetchLights"],
//     queryFn: fetchLights,
//   });

//   const queryClient = useQueryClient();

//   const { mutate: deleteLight } = useMutation({
//     mutationFn: deleteLightById,
//     onSuccess: (responseData) => {
//       queryClient.invalidateQueries({ queryKey: ["fetchLights"] });
//       showToast("success", responseData.message);
//     },
//   });

//   const handleChangePage = (
//     event: MouseEvent<HTMLButtonElement> | null,
//     newPage: number
//   ): void => {
//     if (event) {
//       event.preventDefault();
//     }
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: any): void => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const onClickDeleteTrafficLight = async (id: number): Promise<void> => {
//     const confirmDeletion = window.confirm(
//       "Are you sure you want to delete this traffic light?"
//     );
//     if (!confirmDeletion) {
//       return;
//     }
//     deleteLight(id);
//   };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (data?.data?.length === 0 && !isLoading) {
//     return (
//       <>
//         <NotFound heading="No Traffic Lights Found" />
//         <button
//           className="app-main-button"
//           onClick={() => navigate("/add-traffic-light")}
//         >
//           Add Traffic Light
//         </button>
//       </>
//     );
//   }

//   return (
//     <div className="traffic-list-container">
//       <div className="traffic-list-header">
//         <h1
//           className="app-main-heading"
//           style={{ textAlign: "center", flex: "1" }}
//         >
//           Traffic Lights
//         </h1>
//         <button
//           style={{ marginLeft: "auto" }}
//           onClick={() => navigate("/add-traffic-light")}
//           className="app-main-button"
//         >
//           Add Traffic Light
//         </button>
//       </div>
//       <Paper sx={{ overflow: "hidden" }}>
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align as any}
//                     style={{
//                       minWidth: column.minWidth,
//                       backgroundColor: "#293b51",
//                       color: "#fff",
//                       zIndex: 0,
//                     }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data?.data
//                 ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((light: TrafficLight) => (
//                   <TableRow
//                     hover
//                     role="checkbox"
//                     tabIndex={-1}
//                     key={light.id}
//                     className="rowHover"
//                   >
//                     {columns.map((column) => (
//                       <TableCell key={column.id} align={column.align as any}>
//                         {column.id === "id" && light[column.id]}
//                         {column.id === "name" && light[column.id]}
//                         {column.id === "location" && light[column.id]}
//                         {column.id === "lights" && (
//                           <TrafficLightItem lightId={light.id} />
//                         )}
//                         {column.id === "actions" && (
//                           <div>
//                             <MdEditSquare
//                               style={{ cursor: "pointer" }}
//                               color="green"
//                               size={25}
//                               onClick={() =>
//                                 navigate(`/traffic-light-edit/${light.id}`)
//                               }
//                             />
//                             <MdDelete
//                               style={{ cursor: "pointer" }}
//                               color="red"
//                               size={25}
//                               onClick={() =>
//                                 onClickDeleteTrafficLight(light.id)
//                               }
//                             />
//                             <MdVisibility
//                               style={{ cursor: "pointer" }}
//                               color="blue"
//                               size={25}
//                               onClick={() =>
//                                 navigate(`/traffic-light/${light.id} `)
//                               }
//                             />
//                           </div>
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={data?.data?.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//   );
// };

// export default TrafficList;

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdDelete, MdEditSquare, MdVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { TrafficLight } from "../../components/Interfaces/trafficLight";
import Spinner from "../../utils/Spinner/Spinner";
import { deleteLightById, fetchLights } from "../../utils/api";
import TrafficLightItem from "./TrafficLightItem";
import NotFound from "../NotFound";
import { showToast } from "../../utils/Toast";
import { LeftIcon, RightIcon } from "../../components/icons";
import "../../App.css";
import "./index.css";

const columns = [
  { id: "id", label: "id", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 100, align: "center" },
  { id: "location", label: "Location", minWidth: 100, align: "center" },
  { id: "lights", label: "Lights", minWidth: 100, align: "center" },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

const TrafficList = (): JSX.Element => {
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
    <div className="container-fluid">
      <div className="row p-3">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <h1 className="app-main-heading text-center" style={{ flex: "1" }}>
            Traffic Lights
          </h1>
          <button
            onClick={() => navigate("/add-traffic-light")}
            className="app-main-button margin-left-auto"
          >
            Add Traffic Light
          </button>
        </div>
        <div className="table-responsive col-12 mt-2">
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="">
                {columns.map((column) => (
                  <th>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((light: TrafficLight) => (
                  <tr tabIndex={-1} key={light.id}>
                    {columns.map((column) => (
                      <td key={column.id}>
                        {column.id === "id" && light[column.id]}
                        {column.id === "name" && light[column.id]}
                        {column.id === "location" && light[column.id]}
                        {column.id === "lights" && (
                          <TrafficLightItem lightId={light.id} key={light.id} />
                        )}
                        {column.id === "actions" && (
                          <div className="d-flex justify-content-center gap-3">
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
                                navigate(`/traffic-light/${light.id} `)
                              }
                            />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex flex-row justify-content-end align-items-center col-12 gap-3">
          <label className="form-label">Rows Per Page</label>
          <select
            className="form-select-sm h-10"
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <div>
            Showing {page * rowsPerPage + 1} to{" "}
            {page * rowsPerPage + rowsPerPage} of {data?.data?.length}
          </div>
          <button
            className={`${
              page === 0 ? "icon-button-disabled" : "icon-button"
            }   `}
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <LeftIcon className="icon" size={20} />
          </button>
          <button
            className={`${
              page === Math.ceil(data?.data?.length / rowsPerPage) - 1
                ? "icon-button-disabled"
                : "icon-button"
            }`}
            disabled={page === Math.ceil(data?.data?.length / rowsPerPage) - 1}
            onClick={() => setPage(page + 1)}
          >
            <RightIcon className="icon" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrafficList;
