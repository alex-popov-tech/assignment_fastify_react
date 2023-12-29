import useSWR from "swr";
import { AddBicycleForm } from "./form";
import { IBicycle } from "./types";
import { BicycleCard } from "./bicycleCard";
import { Statistics } from "./statistics";

function App() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: bicycles = [], error } = useSWR<IBicycle[]>(
    "/api/bicycle",
    fetcher,
  );

  if (error) {
    console.log(error);
    return <div>Failed to load</div>;
  }

  return (
    <div className="flex flex-col h-svh font-saira">
      <header className="font-['Saira_Stencil_One'] text-2xl py-1 px-4 bg-[#696969] text-[#E8E8E8]">
        ADMIN.BIKE-BOOKING.COM
      </header>
      <main className="grow grid grid-cols-[4fr_2px_3fr] gap-2 m-2">
        <div className="flex flex-col gap-2">
          {bicycles?.map((bicycle) => <BicycleCard bicycle={bicycle} />)}
        </div>
        <div className="bg-[#C4C4C4]"></div>
        <div>
          <AddBicycleForm />
          <Statistics bicycles={bicycles} />
        </div>
      </main>
      <footer className="flex flex-row-reverse p-3 bg-[#696969] text-xl">
        <div className="flex gap-2">
          <span className="text-[#CBCACA]">Developer:</span>
          <span className="text-white">Oleksandr Popov</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
