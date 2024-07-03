import "./index.css";
export interface NotFoundProps {
  heading: string;
}

const NotFound = ({ heading = "Not Found" }: NotFoundProps) => (
  <div className="not-found-container">
    <img src={"/NotFound404.png"} alt="not found" className="not-found-img" />
    <h1 className="not-found-heading">{heading}</h1>
  </div>
);

export default NotFound;
