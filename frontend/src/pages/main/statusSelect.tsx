import { updateBicycle } from "@/api";

export function StatusSelect({
  id,
  status,
}: {
  id: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "BUSY";
}) {
  return (
    <select
      className="text-sm bg-transparent appearance-none w-fit"
      defaultValue={status}
      onChange={async (e) => {
        const newStatus = e.target.value as typeof status;
        await updateBicycle(id, { status: newStatus }).catch((err) => {
          console.error(err);
        });
      }}
    >
      {["AVAILABLE", "UNAVAILABLE", "BUSY"].map((value) => (
        <option key={value} value={value}>
          {value[0] + value.toLowerCase().substring(1) + " ▼"}
        </option>
      ))}
    </select>
  );
}
