import { FastifyInstance } from "fastify";
import { bicycle } from "./bicycle";

export function add(app: FastifyInstance) {
  bicycle(app);
}
