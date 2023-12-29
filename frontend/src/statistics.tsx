import { IBicycle } from "./types";

export function Statistics({ bicycles }: { bicycles: IBicycle[] }) {
  const totalBikes = bicycles.length;
  const availableBikes = bicycles.filter(
    (it) => it.status === "AVAILABLE",
  ).length;
  const bookedBikes = bicycles.filter((it) => it.status === "BUSY").length;
  const totalBikeCost = bicycles.reduce((acc, it) => acc + it.price, 0);
  const averageBikeCost = (totalBikeCost / totalBikes).toFixed(2);

  return (
    <div className="border-t-2 border-[#C4C4C4] mt-4 pt-4 flex flex-col gap-3">
      <label className="font-bold text-xl">STATISTICS</label>
      <label>
        Total Bikes: <span className="font-bold">{totalBikes}</span>
      </label>
      <label>
        Available Bikes: <span className="font-bold">{availableBikes}</span>
      </label>
      <label>
        Booked Bikes: <span className="font-bold">{bookedBikes}</span>
      </label>
      <label>
        Average bike cost: <span className="font-bold">{averageBikeCost}</span>{" "}
        UAH/hr.
      </label>
    </div>
  );
}
