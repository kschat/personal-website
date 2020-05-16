import 'source-map-support/register';

import fastify from 'fastify';

const server = fastify();

server.route({
  method: 'GET',
  url: '/',
  handler: async () => {
    return 'hello new world';
  },
});

server.listen(8080, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('Server started');
});

