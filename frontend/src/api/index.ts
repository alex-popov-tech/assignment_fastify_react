import useSWR, { mutate } from "swr";
import { IBicycle } from "@/types";

export function useBicycles() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR<IBicycle[]>(
    "/api/bicycle",
    fetcher,
  );
  const bicycles = data ?? [];

  return { bicycles, error, isLoading };
}

export async function createBicycle(bicycle: Omit<IBicycle, "status">) {
  const res = await fetch("/api/bicycle", {
    body: JSON.stringify(bicycle),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  const result = await res.json();
  if (res.status !== 200) {
    throw new Error(result.message);
  } else {
    mutate("/api/bicycle");
  }
}

export async function deleteBicycle(id: string) {
  const res = await fetch(`/api/bicycle/${id}`, { method: "DELETE" });
  const text = await res.text();
  if (res.status !== 200) {
    throw new Error(text);
  } else {
    mutate("/api/bicycle");
  }
}

export async function updateBicycle(id: string, bicycle: Partial<IBicycle>) {
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
}
