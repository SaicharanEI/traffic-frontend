import "./index.css";
export interface NotFoundProps {
  heading: string;
}

const NotFound = ({ heading = "Not Found" }: NotFoundProps): JSX.Element => (
  <div className="container">
    <div className="row col-12 d-flex justify-content-center">
      <img src={"/NotFound404.png"} alt="not found" className="not-found-img" />
      <h1 className="not-found-heading">{heading}</h1>
    </div>
  </div>
);

export default NotFound;
