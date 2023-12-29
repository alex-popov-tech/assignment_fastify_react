import { env } from "./env";
import { init } from "./app";

const app = init();
console.log(`🚀  Fastify server running on port http://localhost:${env.PORT}`);
app.listen({ host: env.HOST, port: env.PORT });
