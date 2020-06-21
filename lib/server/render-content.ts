import { join as joinPath, resolve as resolvePath } from 'path';
import { promises as fs } from 'fs';
import { Marked } from '@ts-stack/markdown';

import { Logger } from './types';
import { getRawFile } from './service-calls/github/get-raw-file';
import { AppConfig } from './config';

export type ContentSource = 'LOCAL' | 'REMOTE';

export type RenderContentOptions = {
  readonly logger: Logger;
  readonly appConfig: AppConfig;
  readonly fileName: string;
  readonly renderBreaks?: boolean;
};

export const renderContent = async ({
  logger,
  appConfig,
  fileName,
  renderBreaks,
}: RenderContentOptions): Promise<string> => {
  const { basePath, source } = appConfig.content;
  const filePath = joinPath(resolvePath(basePath), fileName);
  const content = source === 'REMOTE'
    ? await getRemoteFile({ logger, appConfig, filePath })
    : await getLocalFile(filePath);

  // TODO sanitize
  Marked.setOptions({ breaks: renderBreaks ?? false });
  return Marked.parse(content);
};

type GetRemoteFileOptions = {
  readonly logger: Logger;
  readonly appConfig: AppConfig;
  readonly filePath: string;
};

const getRemoteFile = async ({
  filePath,
  ...options
}: GetRemoteFileOptions): Promise<string> => {
  const { content } = await getRawFile({
    ...options,
    branch: 'master',
    repo: 'portfolio-site-rewrite',
    filePath,
  });

  return content;
};

const getLocalFile = async (path: string): Promise<string> => {
  const content = await fs.readFile(path, 'utf8');

  return content;
};

