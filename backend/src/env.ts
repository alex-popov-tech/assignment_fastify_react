import { config } from "dotenv";
import { z } from "zod";

config();

const EnvSchema = z.object({
  MONGO_URL: z.string(),
  MONGO_DB: z.string(),
  MONGO_USER: z.string(),
  MONGO_PASSWORD: z.string(),
  NODE_ENV: z.string().default("development"),
  HOST: z.string().default("localhost"),
  PORT: z
    .string()
    .transform((v) => Number(v))
    .refine((it) => it > 0),
});

export const env = EnvSchema.parse(process.env);
