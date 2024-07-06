import { LoaderIcon } from "../icons";

import styles from "./button.module.css";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

function Button({
  loading = false,
  type = "button",
  className = "",
  text,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`appMainButton m-3 ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {type === "submit" ? (
        !loading ? (
          text
        ) : (
          <span className={styles.spinnerButton}>
            <LoaderIcon className={styles.spinner} />
          </span>
        )
      ) : (
        text
      )}
    </button>
  );
}

export default Button;
