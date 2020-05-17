import 'source-map-support/register';

import { join as pJoin } from 'path';
import fastify from 'fastify';
import pointOfView from 'point-of-view';
import handlebars from 'handlebars';
import fastifyStatic from 'fastify-static';

const server = fastify();

server.register(pointOfView, {
  engine: {
    handlebars,
  },
  templates: pJoin(__dirname, 'views'),
  layout: 'layouts/main',
  includeViewExtension: true,
});

server.register(fastifyStatic, {
  root: pJoin(__dirname, '../client'),
});

server.route({
  method: 'GET',
  url: '/',
  handler: async (_req, reply) => {
    reply.view('about', { text: 'text' });
    return reply;
  },
});

server.listen(8080, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('Server started');
});

