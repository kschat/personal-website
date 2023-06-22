import { promises as fs } from 'fs';
import yaml from 'yaml';
import { AppConfigSchema } from './schema';
import { ConfigError } from '../errors';

const parseYaml = (value: string): unknown => {
  try {
    return yaml.parse(value);
  } catch (error) {
    const { message } = error as Error;
    throw new ConfigError(`Failed to parse YAML file:\n${message}`);
  }
};

const validate = (value: unknown) => {
  try {
    return AppConfigSchema.check(value);
  } catch (error) {
    const { message } = error as Error;
    throw new ConfigError(
      `Invalid config:\n${JSON.stringify(value, undefined, 2)}\n\n${message}`,
    );
  }
};

export const loadConfig = async (filePath: string) => {
  const contents = await fs.readFile(filePath, 'utf8').catch((error: Error) => {
    throw new ConfigError(`Failed to read config file "${filePath}":\n${error.message}`);
  });

  const config = validate(parseYaml(contents));

  return {
    path: filePath,
    config: {
      ...config,
      server: {
        ...config.server,
        port: Number(process.env.PORT) || config.server.port,
      },
    },
  };
};

export * from './schema';
