import { Form } from "react-bootstrap";

interface InputGroupProps {
  onChange: (e: any) => void;
  type?: "text" | "number" | "time";
  placeholder: string;
  value: string;
  label: string;
  controlId: string;
  min?: string;
}
function InputGroup({
  onChange,
  type,
  placeholder,
  value,
  label,
  controlId,
}: InputGroupProps) {
  return (
    <Form.Group controlId={controlId} className="d-flex flex-column">
      <Form.Label className="form_label">{label}:</Form.Label>
      <Form.Control
        placeholder={placeholder}
        value={value}
        className="form-control"
        onChange={onChange}
        required
        type={type}
        min={type === "number" ? 0 : undefined}
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
  );
}

export default InputGroup;
