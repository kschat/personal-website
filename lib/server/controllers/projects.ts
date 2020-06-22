import { RouteOptions } from 'fastify';
import { renderContent } from '../render-content';
import { AppConfig } from '../config';

export const projectsController = ({ appConfig }: InitOptions): RouteOptions => ({
  method: 'GET',
  url: '/projects',
  handler: async (request, reply) => {
    const projects = await Promise.all(
      appConfig.projects.map(async (project) => {
        const name = project.name.replace(/\s/g, '-').toLowerCase();
        const about = await renderContent({
          appConfig,
          logger: request.log,
          fileName: `projects/${name}.md`,
        });

        const gitHubUrl = `https://github.com/kschat/${name}`;

        const button = project.button === 'DEMO'
          ? { label: 'Check it out', url: project.url }
          : { label: 'Read more', url: `${gitHubUrl}#readme` };

        return {
          about,
          button,
          gitHubUrl,
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

