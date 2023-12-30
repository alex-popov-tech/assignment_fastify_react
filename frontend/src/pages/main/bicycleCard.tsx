import { IBicycle } from "@/types";
import { deleteBicycle } from "@/api";
import { StatusSelect } from "./statusSelect";

export function BicycleCard({ bicycle }: { bicycle: IBicycle }) {
  const borderColor = {
    AVAILABLE: "border-success",
    UNAVAILABLE: "border-error",
    BUSY: "border-warn",
  }[bicycle.status];

  return (
    <div
      className={`bg-white border-2 ${borderColor} rounded-xl p-2 flex justify-between ${
        bicycle.status === "UNAVAILABLE" ? "opacity-50" : ""
      }`}
    >
      <div className="flex flex-col mx-2">
        <label className="uppercase text-sm">
          <span className="font-bold">{bicycle.name}</span> - {bicycle.type} (
          {bicycle.color})
        </label>
        <label className="uppercase text-[8px] text-placeholder">
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
