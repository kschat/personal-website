import { init as aboutInit } from './controllers/about';
import { init as projectInit } from './controllers/projects';
import { AppConfig } from './config';

export const init = (appConfig: AppConfig) => {
  const { aboutController, indexController } = aboutInit({ appConfig });
  const { projectsController } = projectInit({ appConfig });

  return [
    indexController,
    aboutController,
    projectsController,
  ];
};


