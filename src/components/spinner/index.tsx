import RingLoader from "react-spinners/RingLoader";

function Spinner(): JSX.Element {
  return (
    <div className="container">
      <div className="row">
        <div className="h-100 w-100 col-12 d-flex justify-content-center flex-column align-items-center">
          <RingLoader size={60} aria-label="Loading Spinner" color="#124577" />
        </div>
      </div>
    </div>
  );
}
export default Spinner;
