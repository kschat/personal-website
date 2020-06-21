import { RouteOptions } from 'fastify';
import { renderContent } from '../render-content';
import { AppConfig } from '../config';

export const projectsController = ({ appConfig }: InitOptions): RouteOptions => ({
  method: 'GET',
  url: '/projects',
  handler: async (request, reply) => {
    const projects = await Promise.all(
      appConfig.projects.map(async (project, index) => {
        const about = await renderContent({
          appConfig,
          logger: request.log,
          fileName: project.aboutPath,
        });

        return {
          about,
          href: `project/${index}`,
          gitHubUrl: project.gitHubUrl,
        };
      }),
    );

    return reply.view('projects', { projects, page: 'projects' });
  },
});

export type InitOptions = {
  readonly appConfig: AppConfig;
};

export const init = ({ appConfig }: InitOptions) => ({
  projectsController: projectsController({ appConfig }),
});

