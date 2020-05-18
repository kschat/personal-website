import got, { StrictOptions as GotOptions } from 'got';

import { Logger } from '../types';

export type Options = GotOptions & {
  readonly logger: Logger;
};

export type Request = typeof request;
export const request = async ({ logger, ...options }: Options) => {
  const response = await got({
    throwHttpErrors: false,
    retry: 0,
    ...options,
    isStream: false,
    responseType: 'text',
  }).catch((error) => {
    logger.error({
      tags: ['service-call', 'error'],
      error,
    });

    throw error;
  });

  logger.info({
    tags: ['service-call', 'response'],
    response,
  });

  return response;
};
