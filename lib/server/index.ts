import 'source-map-support/register';

import fastify from 'fastify';
import pointOfView from 'point-of-view';
import handlebars from 'handlebars';
import fastifyStatic from 'fastify-static';

import { join as joinPath, resolve as resolvePath } from 'path';
import { init as initRoutes } from './routes';
import { loadConfig } from './config';

export const startServer = async (configPath: string) => {
  const appConfig = await loadConfig(resolvePath(configPath));

  const server = fastify({
    logger: {
      prettyPrint: true,
    },
  });

  server.register(pointOfView, {
    engine: {
      handlebars,
    },
    templates: joinPath(__dirname, 'views'),
    layout: 'layouts/main',
    includeViewExtension: true,
  });

  server.register(fastifyStatic, {
    root: joinPath(__dirname, '../client'),
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

if (require.main === module) {
  const [,, configPath] = process.argv;
  if (!configPath || !configPath.trim()) {
    throw new Error('Must provide path to config as first argument');
  }

  startServer(configPath).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

