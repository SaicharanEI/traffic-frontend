import { TrafficLight } from "../../types/TrafficLight";
import { MdDelete, MdEditSquare, MdVisibility } from "react-icons/md";
import TrafficLightItem from "./TrafficLightItem";
import { columns } from "./Columns";
import { useNavigate } from "react-router-dom";

interface TrafficTableRowProps {
  light: TrafficLight;
  index: number;
  startIndex: number;
  endIndex: number;
  onClickDeleteTrafficLight: (id: number) => void;
}

function TrafficTableRow({ light, ...props }: TrafficTableRowProps) {
  const navigate = useNavigate();
  return (
    <tr
      tabIndex={-1}
      style={{
        display:
          props.index >= props.startIndex && props.index < props.endIndex
            ? "table-row"
            : "none",
      }}
    >
      {columns.map((column) => (
        <td key={column.id}>
          {column.id === "id" && light[column.id]}
          {column.id === "name" && light[column.id]}
          {column.id === "location" && light[column.id]}
          {column.id === "lights" && <TrafficLightItem lightId={light.id} />}
          {column.id === "actions" && (
            <div className="d-flex justify-content-center gap-3">
              <MdEditSquare
                style={{ cursor: "pointer" }}
                color="green"
                size={25}
                onClick={() => navigate(`/traffic-light-edit/${light.id}`)}
              />
              <MdDelete
                style={{ cursor: "pointer" }}
                color="red"
                size={25}
                onClick={() => props.onClickDeleteTrafficLight(light.id)}
              />
              <MdVisibility
                style={{ cursor: "pointer" }}
                color="blue"
                size={25}
                onClick={() => navigate(`/traffic-light/${light.id}`)}
              />
            </div>
          )}
        </td>
      ))}
    </tr>
  );
}

export default TrafficTableRow;
