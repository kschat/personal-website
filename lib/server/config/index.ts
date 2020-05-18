import { promises as fs } from 'fs';
import { AppConfigSchema } from './schema';
import { parse as parseYml } from 'yaml';

export const loadConfig = async (filePath: string) => {
  console.log('Reading file', filePath);
  // TODO throw custom error
  const contents = await fs.readFile(filePath, 'utf8');
  const yaml: unknown = parseYml(contents);
  console.log(yaml);
  return AppConfigSchema.check(yaml);
};

export * from './schema';
