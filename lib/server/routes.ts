import { init as aboutInit } from './controllers/about';
import { AppConfig } from './config';

export const init = (appConfig: AppConfig) => {
  const { aboutController, indexController } = aboutInit({ appConfig });

  return [
    indexController,
    aboutController,
  ];
};


