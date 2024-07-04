import { LoaderIcon } from "../../components/icons";
import "./index.css";

interface ButtonProps {
  onSubmit: (event: any) => void;
  text: string;
  loading?: boolean;
  disabled?: boolean;
  type: "button" | "submit" | "reset" | undefined;
}
function Button({
  onSubmit,
  text,
  loading = false,
  disabled,
  type,
}: ButtonProps) {
  return (
    <button
      className="app-main-button mt-3"
      onClick={onSubmit}
      disabled={disabled || loading}
      type={type}
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
}

export default Button;
