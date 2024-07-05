import { LoaderIcon } from "../icons";

import buttonStyles from "./button.module.css";
import appStyles from "../../../src/App.module.css";

const styles = Object.assign({}, buttonStyles, appStyles);

interface ButtonLoaderProps {
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}

function ButtonLoader({
  onSubmit,
  text,
  loading = false,
  disabled,
  type = "button",
}: ButtonLoaderProps) {
  return (
    <button
      type={type}
      className={`${styles.app_main_button} m-3`}
      onClick={onSubmit}
      disabled={disabled || loading}
    >
      {!loading ? (
        text
      ) : (
        <span className={styles.spinner_button}>
          <LoaderIcon className={styles.spinner} />
        </span>
      )}
    </button>
  );
}

export default ButtonLoader;
