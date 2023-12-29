import { FastifyInstance } from "fastify";
import { BicycleSchema, BicyclesSchema, NotFoundSchema } from "./schema";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { format } from "date-fns";

interface IBicycle {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "BUSY";
  color: string;
  wheelSize: number;
  price: number;
}

const generateDateTimeId = () =>
  `bicycle_${format(new Date(), "yyyy-MM-dd_HH-mm")}`;

export function bicycle(app: FastifyInstance) {
  list(app);
  get(app);
  del(app);
  update(app);
  create(app);
}

function get(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/api/bicycle/:id",
    schema: {
      params: z.object({ id: z.string() }),
      response: {
        200: BicycleSchema,
        404: NotFoundSchema,
      },
    },
    handler: async (req, res) => {
      const bicycle = await app.mongo.db
        ?.collection<IBicycle>("bicycles")
        .findOne({ id: req.params.id });
      if (!bicycle) {
        return res.notFound("Bicycle not found");
      }
      return res.send(bicycle);
    },
  });
}

function list(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/api/bicycle",
    schema: {
      response: {
        200: BicyclesSchema,
      },
    },
    handler: async (_, res) => {
      const bicycles = await app.mongo.db
        ?.collection<IBicycle>("bicycles")
        .find({})
        .toArray();

      return res.send(bicycles);
    },
  });
}

function del(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "DELETE",
    url: "/api/bicycle/:id",
    schema: {
      params: z.object({ id: z.string() }),
      response: {
        200: BicycleSchema,
        404: NotFoundSchema,
      },
    },
    handler: async (req, res) => {
      const bicycle = await app.mongo.db
        ?.collection<IBicycle>("bicycles")
        .findOne({ id: req.params.id });
      if (!bicycle) {
        return res.notFound("Bicycle not found");
      }
      await app.mongo.db
        ?.collection("bicycles")
        .deleteOne({ id: req.params.id });
      return res.send(bicycle);
    },
  });
}

function create(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/api/bicycle",
    schema: {
      body: BicycleSchema.pick({
        name: true,
        description: true,
        color: true,
        wheelSize: true,
        price: true,
        type: true,
      })
        .required()
        .partial({ description: true }),
      response: {
        200: BicycleSchema,
      },
    },
    handler: async (req, res) => {
      const bicycle = {
        id: generateDateTimeId(),
        status: "AVAILABLE" as const,
        ...req.body,
      };
      await app.mongo.db?.collection<IBicycle>("bicycles").insertOne(bicycle);
      return res.send(bicycle);
    },
  });
}

function update(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "PATCH",
    url: "/api/bicycle/:id",
    schema: {
      params: z.object({ id: z.string() }),
      body: BicycleSchema.pick({
        id: true,
        name: true,
        description: true,
        type: true,
        status: true,
        color: true,
        wheelSize: true,
        price: true,
      }).partial(),
      response: {
        200: BicycleSchema,
        404: NotFoundSchema,
      },
    },
    handler: async (req, res) => {
      const bicycle = await app.mongo.db
        ?.collection<IBicycle>("bicycles")
        .findOne({ id: req.params.id });
      if (!bicycle) {
        return res.notFound("Bicycle not found");
      }
      const updated = { ...bicycle, ...req.body };
      await app.mongo.db
        ?.collection<IBicycle>("bicycles")
        .updateOne({ id: req.params.id }, { $set: updated });

      return res.send(updated);
    },
  });
}
