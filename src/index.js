import "dotenv/config";
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const app = Fastify({
  logger: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    description: "Hello World",
    tags: ["hello"],
    schema: {
      response: {
      200: z.string(),
    },
  },
  handler: () => {
    return {
        message: "Hello World",
    };
  },
});

try {
  await app.listen({ port: process.env.PORT });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
