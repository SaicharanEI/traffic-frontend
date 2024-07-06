import RingLoader from "react-spinners/RingLoader";

function Spinner(): JSX.Element {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row">
        <RingLoader size={60} aria-label="Loading Spinner" color="#124577" />
      </div>
    </div>
  );
}

export default Spinner;
