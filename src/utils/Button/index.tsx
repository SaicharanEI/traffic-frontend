import React from "react";
import { LoaderIcon } from "../../components/icons";
import "./index.css";

interface ButtonProps {
  onSubmit: () => void;
  text: string;
  loading?: boolean;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  onSubmit,
  text,
  loading = false,
  disabled,
}) => {
  return (
    <button
      className="loader-spinner-button"
      onClick={onSubmit}
      disabled={disabled || loading}
    >
      {!loading ? (
        text
      ) : (
        <span className="spinner-button">
          <LoaderIcon className="spinner" />
        </span>
      )}
    </button>
  );
};

export default Button;
