import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { HEADERS_GET, LOCATION_GET } from './routes';

export async function startServer() {
  const server = fastify({
    logger: true,
  });

  await server.register(fastifyCors, {
    allowedHeaders: '*',
    origin: '*',
  });

  await server.register(fastifySwagger, {
    swagger: {
      consumes: ['application/json'],
      host: process.env.HOST || 'localhost:8080',
      info: {
        description: '',
        title: 'API Specification',
        version: '0.1.0',
      },
      produces: ['application/json'],
      schemes: process.env.DEBUG ? ['http'] : ['https', 'http'],
      securityDefinitions: process.env.DEBUG
        ? undefined
        : {
            apiKey: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header',
            },
          },
    },
  });

  await server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });

  server.route(HEADERS_GET);

  server.route(LOCATION_GET);

  server.route({
    handler: async (request, reply) => {
      let healthy: boolean = true;

      if (!healthy) {
        reply.status(503).send();

        return;
      }

      reply.status(200).send();
    },
    method: 'GET',
    url: '/api/v1/health',
  });

  server.route({
    handler: async (request, reply) => {
      reply.status(200).send();
    },
    method: 'GET',
    url: '/api/v1/ping',
  });

  await server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  });

  await server.ready();
}
