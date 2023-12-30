import { AddBicycleForm } from "./form";
import { useBicycles } from "@/api";
import { BicycleCard } from "./bicycleCard";
import { Statistics } from "./statistics";

export function Main() {
  const { bicycles, error } = useBicycles();

  if (error) {
    console.log(error);
    return <div>Failed to load</div>;
  }

  return (
    <div className="flex flex-col h-svh font-saira">
      <header className="font-['Saira_Stencil_One'] text-2xl py-1 px-4 bg-darkgrey text-white">
        ADMIN.BIKE-BOOKING.COM
      </header>
      <main className="grow grid grid-cols-[4fr_2px_3fr] gap-2 m-2">
        <div className="flex flex-col gap-2">
          {bicycles?.map((bicycle) => (
            <BicycleCard key={bicycle.id} bicycle={bicycle} />
          ))}
        </div>
        <div className="bg-border"></div>
        <div>
          <AddBicycleForm />
          <Statistics bicycles={bicycles} />
        </div>
      </main>
      <footer className="flex flex-row-reverse p-3 bg-darkgrey text-xl">
        <div className="flex gap-2">
          <span className="text-lightgrey">Developer:</span>
          <span className="text-white">Oleksandr Popov</span>
        </div>
      </footer>
    </div>
  );
}
