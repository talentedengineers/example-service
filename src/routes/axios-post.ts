import axios from 'axios';
import { RouteOptions } from 'fastify';

export const AXIOS_POST: RouteOptions = {
  handler: async (request, reply) => {
    const response = await axios.request({
      ...(request.body as any),
      validateStatus: false,
    });

    reply.status(200).send({
      data: response.data,
      headers: response.headers,
      status: response.status,
    });
  },
  method: 'POST',
  url: '/api/v1/axios',
};
