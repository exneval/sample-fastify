import Fastify from "fastify";
import os from "node:os";
import { microgen } from "./libs/microgen.js";

const fastify = Fastify({
  logger: true,
});
const { ADDRESS = "localhost", PORT = "3000" } = process.env;

fastify.get("/", async (request, reply) => {
  const { token, error } = await microgen.auth.login({
    email: "exneval_rayz@yahoo.co.id",
    password: "ginting",
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
    await fastify.listen({ host: ADDRESS, port: parseInt(PORT, 10) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
