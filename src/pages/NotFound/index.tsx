import styles from "../../App.module.css";

export interface NotFoundProps {
  heading: string;
}

const NotFound = ({ heading = "Not Found" }: NotFoundProps): JSX.Element => (
  <div className="container">
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-center justify-content-center text-center">
        <img
          src={"/NotFound404.png"}
          alt="not found"
          style={{ width: "600px" }}
        />
        <h1 className={styles.app_main_heading}>{heading}</h1>
      </div>
    </div>
  </div>
);

export default NotFound;
