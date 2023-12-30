import { z } from "zod";

export const BicycleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.string(),
  status: z.enum(["BUSY", "AVAILABLE", "UNAVAILABLE"]),
  color: z.string(),
  wheelSize: z.number().gt(0),
  price: z.number().gt(0),
});

export const BicyclesSchema = z.array(BicycleSchema);

export const NotFoundSchema = z.object({ message: z.string() });
