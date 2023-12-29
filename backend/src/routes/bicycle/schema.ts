import { z } from "zod";

export const BicycleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.string(),
  status: z.enum(["BUSY", "AVAILABLE", "UNAVAILABLE"]),
  color: z.string(),
  wheelSize: z.number(),
  price: z.number(),
});

export const BicyclesSchema = z.array(BicycleSchema);

export const NotFoundSchema = z.object({ message: z.string() });
