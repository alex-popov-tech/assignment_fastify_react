export function Input({
  required,
  type,
  placeholder,
  value,
  setValue,
}: {
  required?: boolean;
  type: "text" | "number";
  placeholder: string;
  value: string | null;
  setValue: (value: string) => void;
}) {
  const borderColor =
    value === null || !required
      ? ""
      : value.length > 0
        ? "border-success"
        : "border-error";
  return (
    <input
      required={required}
      className={`p-4 rounded-md border-2 outline-none ${borderColor} bg-white placeholder:text-placeholder`}
      onChange={(e) => setValue(e.target.value)}
      value={value ?? ""}
      type={type}
      placeholder={placeholder}
    ></input>
  );
}
