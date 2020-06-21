import { RouteOptions } from 'fastify';
import { renderContent } from '../render-content';
import { AppConfig } from '../config';

export const resumeController = ({ appConfig }: InitOptions): RouteOptions => ({
  method: 'GET',
  url: '/resume',
  handler: async (request, reply) => {

    const resume = await renderContent({
      appConfig,
      logger: request.log,
      fileName: 'resume.md',
      renderBreaks: true,
    });

    return reply.view('resume', { resume, page: 'resume' });
  },
});

export type InitOptions = {
  readonly appConfig: AppConfig;
};

export const init = ({ appConfig }: InitOptions) => ({
  resumeController: resumeController({ appConfig }),
});


