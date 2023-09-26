import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});
const { ADDRESS = "localhost", PORT = "3000" } = process.env;

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
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
