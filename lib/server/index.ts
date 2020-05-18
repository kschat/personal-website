import 'source-map-support/register';

import fastify from 'fastify';
import pointOfView from 'point-of-view';
import handlebars from 'handlebars';
import fastifyStatic from 'fastify-static';

import { join as joinPath, resolve as resolvePath } from 'path';
import { init as initRoutes } from './routes';
import { loadConfig } from './config';
import { ConfigError } from './errors';

export const startServer = async (configPath: string) => {
  const config = await loadConfig(resolvePath(configPath));
  const { config: appConfig } = config;

  const server = fastify({
    logger: {
      prettyPrint: true,
    },
  });

  server.log.info({
    tags: ['config'],
    ...config,
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

  server.listen(appConfig.server.port, (error) => {
    if (error) {
      server.log.error({
        tags: ['server-start', 'error'],
        error,
      });
      process.exit(1);
    }

    server.log.info({
      tags: ['server-start'],
      message: 'Server started',
    });
  });
};

if (require.main === module) {
  const [,, configPath] = process.argv;
  if (!configPath || !configPath.trim()) {
    throw new ConfigError('Must provide path to config as first argument');
  }

  startServer(configPath).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

