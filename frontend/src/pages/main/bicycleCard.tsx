import { mutate } from "swr";
import { IBicycle } from "./types";

const deleteBicycle = async (id: string) => {
  const res = await fetch(`/api/bicycle/${id}`, { method: "DELETE" });
  const text = await res.text();
  if (res.status !== 200) {
    throw new Error(text);
  } else {
    mutate("/api/bicycle");
  }
};

const updateBicycle = async (id: string, bicycle: Partial<IBicycle>) => {
  const res = await fetch(`/api/bicycle/${id}`, {
    body: JSON.stringify(bicycle),
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
  });
  const text = await res.json();
  if (res.status !== 200) {
    throw new Error(text);
  } else {
    mutate("/api/bicycle");
  }
};

function StatusSelect({
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

export function BicycleCard({ bicycle }: { bicycle: IBicycle }) {
  const borderColor = {
    AVAILABLE: "border-[#6FCF97]",
    UNAVAILABLE: "border-[#EB5757]",
    BUSY: "border-[#F2994A]",
  }[bicycle.status];

  return (
    <div
      className={`bg-[#E8E8E8] border-2 ${borderColor} rounded-xl p-2 flex justify-between ${
        bicycle.status === "UNAVAILABLE" ? "opacity-50" : ""
      }`}
    >
      <div className="flex flex-col mx-2">
        <label className="uppercase text-sm">
          <span className="font-bold">{bicycle.name}</span> - {bicycle.type} (
          {bicycle.color})
        </label>
        <label className="uppercase text-[8px] text-[#717171]">
          ID: {bicycle.id}
        </label>
        <label>
          <span className="text-sm me-2">STATUS:</span>
          <StatusSelect id={bicycle.id} status={bicycle.status} />
        </label>
      </div>
      <div className="flex flex-col justify-between items-end">
        <button
          className="cursor-pointer"
          onClick={() => deleteBicycle(bicycle.id)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="text-2xl">{bicycle.price.toFixed(2)} UAH/hr.</div>
      </div>
    </div>
  );
}
