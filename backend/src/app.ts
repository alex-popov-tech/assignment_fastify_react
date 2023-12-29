import * as path from "path";
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import * as fastifySensible from "@fastify/sensible";
import * as fastifyStatic from "@fastify/static";
import * as fastifyMongodb from "@fastify/mongodb";
import * as routes from "./routes";
import { env } from "./env";

export function init() {
  const app = Fastify({
    logger: !!(env.NODE_ENV !== "development"),
  });

  app.register(fastifySensible);
  app.register(fastifyMongodb, {
    url: env.MONGO_URL,
    database: env.MONGO_DB,
    auth: { username: env.MONGO_USER, password: env.MONGO_PASSWORD },
  });
  // Add schema validator and serializer
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  routes.add(app);

  if (env.NODE_ENV === "production") {
    app.register(fastifyStatic, {
      root: path.join(__dirname, "public"), // specify the path to your dist folder
    });
    // serve static
    app.get("/", function (_, reply) {
      return reply.sendFile("index.html");
    });
  }

  return app;
}
