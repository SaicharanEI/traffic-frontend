import "./NotFound.css";
export interface NotFoundProps {
  heading: string;
}

const NotFound = ({ heading = "Not Found Page" }: NotFoundProps) => (
  <div className="not-found-container">
    <img src={"./NotFound404.png"} alt="not found" className="not-found-img" />
    <h1>{heading}</h1>
  </div>
);

export default NotFound;
