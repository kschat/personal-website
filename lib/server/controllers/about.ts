import { RouteOptions } from 'fastify';
import { AppConfig } from '../config';
import { renderContent } from '../render-content';

export type AboutControllerOptions = {
  readonly appConfig: AppConfig;
  readonly url: string;
};

export const aboutController = ({ appConfig, url }: AboutControllerOptions): RouteOptions => ({
  url,
  method: 'GET',
  handler: async (request, reply) => {
    const about = await renderContent({
      appConfig,
      logger: request.log,
      fileName: 'about.md',
    });

    return reply.view('about', { about, page: 'about' });
  },
});

export type InitOptions = {
  readonly appConfig: AppConfig;
};

export const init = ({ appConfig }: InitOptions) => ({
  aboutController: aboutController({ appConfig, url: '/about' }),
  indexController: aboutController({ appConfig, url: '/' }),
});

