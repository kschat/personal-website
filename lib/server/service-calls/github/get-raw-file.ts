import { Logger } from '../../types';
import { request } from '../service-call';
import { AppConfig } from '../../config';

export type GetRawFileOptions = {
  readonly logger: Logger;
  readonly appConfig: AppConfig;
  readonly branch: string;
  readonly repo: string;
  readonly filePath: string;
};

export type RawFile = {
  readonly path: string;
  readonly content: string;
};

export const getRawFile = async ({
  logger,
  appConfig,
  branch,
  repo,
  filePath,
}: GetRawFileOptions): Promise<RawFile> => {
  const { body, statusCode } = await request({
    logger,
    prefixUrl: appConfig.services.github.baseUrl,
    url: `${repo}/${branch}/${filePath}`,
    retry: 2,
  });

  if (statusCode >= 400) {
    throw new Error(`Received unexpected status code "${statusCode}"`);
  }

  return {
    path: filePath,
    content: body,
  };
};
