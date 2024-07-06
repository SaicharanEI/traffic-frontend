export interface NotFoundProps {
  heading: string;
}

const NotFound = ({ heading = "Not Found" }: NotFoundProps): JSX.Element => (
  <div className="container vh-100 d-flex align-items-center justify-content-center">
    <div className="row">
      <div className="text-center">
        <img
          src={"/NotFound404.png"}
          alt="not found"
          className="notFoundImage"
        />
        <h1 className="appMainHeading">{heading}</h1>
      </div>
    </div>
  </div>
);

export default NotFound;
