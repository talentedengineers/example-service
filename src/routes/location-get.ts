import { RouteOptions } from 'fastify';
import ip3country from 'ip3country';

ip3country.init();

export const LOCATION_GET: RouteOptions = {
  handler: async (request, reply) => {
    const ipAddress: string | null =
      (request.headers['x-real-ip'] as string | null) || null;

    const country: string | null = ipAddress
      ? ip3country.lookupStr(ipAddress)
      : null;

    reply.status(200).send({ country });
  },
  method: 'GET',
  url: '/api/v1/location',
};
