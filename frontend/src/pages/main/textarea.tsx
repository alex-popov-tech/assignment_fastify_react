export function Textarea(props: {
  placeholder: string;
  value: string | null;
  setDescription: (value: string) => void;
}) {
  return (
    <textarea
      value={props.value ?? ""}
      onChange={(e) => props.setDescription(e.target.value)}
      placeholder={props.placeholder}
      className="p-4 resize-none rounded-md text-placeholder bg-white col-span-2 row-span-2"
    />
  );
}
