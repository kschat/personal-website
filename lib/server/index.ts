import 'source-map-support/register';

import fastify from 'fastify';
import fastifyView from '@fastify/view';
import handlebars from 'handlebars';
import fastifyStatic from '@fastify/static';

import { join as joinPath, resolve as resolvePath } from 'path';
import { init as initRoutes } from './routes';
import { loadConfig } from './config';
import { ConfigError } from './errors';
import { ifEqual } from './views/helpers/if-equal';

export const startServer = async (configPath: string) => {
  const config = await loadConfig(resolvePath(configPath));
  const { config: appConfig } = config;

  const server = fastify({
    trustProxy: true,
    logger: {
      transport: {
        target: 'pino-pretty',
      }
    },
  });

  server.log.info({
    tags: ['config'],
    ...config,
  });

  handlebars.registerHelper(ifEqual.name, ifEqual);

  await server.register(fastifyView, {
    engine: {
      handlebars,
    },
    options: {
      useHtmlMinifier: require('html-minifier'),
      htmlMinifierOptions: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true
      },
      partials: {
        meta: 'meta.hbs',
      },
    },
    templates: joinPath(__dirname, 'views'),
    layout: 'layouts/main',
    includeViewExtension: true,
  });

  await server.register(import('@fastify/compress'));

  await server.register(fastifyStatic, {
    root: joinPath(__dirname, '../client'),
  });

  initRoutes(appConfig).forEach((route) => server.route(route));

  server.listen({ port: appConfig.server.port, host: '0.0.0.0' }, (error) => {
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

