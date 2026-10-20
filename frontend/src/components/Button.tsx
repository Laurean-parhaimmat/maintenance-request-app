type ButtonProps = {
  // Required props
  type: "submit" | "button";
  label?: string;
  // Optional props
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function Button({ type, onClick }: ButtonProps) {
  return <button type={type} onClick={onClick}></button>;
}
