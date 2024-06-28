import "./NotFound.css";
const NotFound = () => (
  <div className="not-found-container">
    <img
      src={import.meta.env.PUBLIC_URL + "NotFound404.png"}
      alt="not found"
      className="not-found-img"
    />
    <h1>Page Not Found</h1>
  </div>
);

export default NotFound;
