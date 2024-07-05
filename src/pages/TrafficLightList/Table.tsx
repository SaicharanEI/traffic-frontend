import { TrafficLight } from "../../types/TrafficLight";
import TrafficTableRow from "./TableRow";
import { columns } from "./Columns";

interface TrafficTableProps {
  data: TrafficLight[];
  page: number;
  rowsPerPage: number;
  onClickDeleteTrafficLight: (id: number) => void;
}

function TrafficTable({ ...props }: TrafficTableProps) {
  const startIndex = props.page * props.rowsPerPage;
  const endIndex = startIndex + props.rowsPerPage;

  return (
    <div className="table-responsive col-12 mt-2">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data?.map((light: TrafficLight, index: number) => (
            <TrafficTableRow
              key={light.id}
              index={index}
              light={light}
              startIndex={startIndex}
              endIndex={endIndex}
              onClickDeleteTrafficLight={props.onClickDeleteTrafficLight}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrafficTable;
