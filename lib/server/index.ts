import 'source-map-support/register';

import fastify from 'fastify';
import pointOfView from 'point-of-view';
import handlebars from 'handlebars';
import fastifyStatic from 'fastify-static';

import { join as pathJoin } from 'path';
import { init as initRoutes } from './routes';
import { loadConfig } from './config';

const startServer = async () => {
  const appConfig = await loadConfig(
    pathJoin(__dirname, '../../config/local.yml'),
  );

  const server = fastify({
    logger: {
      prettyPrint: true,
    },
  });

  server.register(pointOfView, {
    engine: {
      handlebars,
    },
    templates: pathJoin(__dirname, 'views'),
    layout: 'layouts/main',
    includeViewExtension: true,
  });

  server.register(fastifyStatic, {
    root: pathJoin(__dirname, '../client'),
  });

  initRoutes(appConfig).forEach((route) => server.route(route));

  server.listen(8080, (error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }

    console.log('Server started');
  });
};

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});

