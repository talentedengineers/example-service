import { RouteOptions } from 'fastify';

export const HEADERS_GET: RouteOptions = {
  handler: async (request, reply) => {
    reply.status(200).send({ headers: request.headers });
  },
  method: 'GET',
  url: '/api/v1/headers',
};
