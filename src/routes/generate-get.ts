import { faker } from '@faker-js/faker';
import { RouteOptions } from 'fastify';

export const GENERATE_GET: RouteOptions = {
  handler: async (request, reply) => {
    reply.status(200).send({
      name: process.env.NAME,
      value: faker.string.alphanumeric({
        casing: 'lower',
        length: 12,
      }),
    });
  },
  method: 'GET',
  url: '/api/v1/generate',
};
