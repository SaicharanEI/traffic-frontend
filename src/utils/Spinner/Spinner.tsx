import RingLoader from "react-spinners/RingLoader";

import "./Spinner.css";

function Spinner() {
  return (
    <div className="spinner-loader">
      <RingLoader size={60} aria-label="Loading Spinner" color="#124577" />
    </div>
  );
}
export default Spinner;
