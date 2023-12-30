export interface IBicycle {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "BUSY";
  color: string;
  wheelSize: number;
  price: number;
}
