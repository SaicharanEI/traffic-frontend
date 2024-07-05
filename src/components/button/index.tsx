import styles from "../../App.module.css";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

function Button({
  onClick,
  type = "button",
  title,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.app_main_button} ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
