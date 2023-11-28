import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import os from "node:os";
import { microgen } from "./libs/microgen.js";

const fastify = Fastify({
  logger: true,
});

const schema = {
  type: "object",
  required: ["EMAIL", "PASSWORD"],
  properties: {
    EMAIL: {
      type: "string",
    },
    PASSWORD: {
      type: "string",
    },
  },
};

fastify.get("/", async (request, reply) => {
  const { token, error } = await microgen.auth.login({
    email: fastify.config.EMAIL,
    password: fastify.config.PASSWORD,
  });

  if (error) {
    return { login: "error", message: error.message };
  }

  return { hello: "world", hostname: os.hostname(), token };
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.register(fastifyEnv, { schema, dotenv: true });
    await fastify.listen({
      host: process.env.ADDRESS || "0.0.0.0",
      port: parseInt(process.env.PORT || 3000, 10),
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
