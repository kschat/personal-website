import * as t from 'runtypes';

export type Environment = t.Static<typeof EnvironmentSchema>;
export const EnvironmentSchema = t.Union(
  t.Literal('local'),
  t.Literal('production'),
);

export type ContentSource = t.Static<typeof ContentSourceSchema>;
export const ContentSourceSchema = t.Union(
  t.Literal('LOCAL'),
  t.Literal('REMOTE'),
);

export type ContentConfig = t.Static<typeof ContentConfigSchema>;
export const ContentConfigSchema = t.Record({
  source: ContentSourceSchema,
  basePath: t.String,
} as const);

export type GithubConfig = t.Static<typeof GithubConfigSchema>;
export const GithubConfigSchema = t.Record({
  baseUrl: t.String,
} as const);

export type ServicesConfig = t.Static<typeof ServicesConfigSchema>;
export const ServicesConfigSchema = t.Record({
  github: GithubConfigSchema,
} as const);

export type ServerConfig = t.Static<typeof ServerConfigSchema>;
export const ServerConfigSchema = t.Record({
  port: t.Number,
} as const);

export type ButtonType = t.Static<typeof ButtonTypeSchema>;
export const ButtonTypeSchema = t.Union(
  t.Literal('READ_MORE'),
  t.Literal('TRY_IT'),
);

export type ProjectConfig = t.Static<typeof ProjectConfigSchema>;
export const ProjectConfigSchema = t.Union(
  t.Record({
    name: t.String,
    button: t.Literal('READ_MORE'),
  } as const),
  t.Record({
    name: t.String,
    button: t.Literal('DEMO'),
    url: t.String,
  } as const),
);

export type AppConfig = t.Static<typeof AppConfigSchema>;
export const AppConfigSchema = t.Record({
  environment: EnvironmentSchema,
  services: ServicesConfigSchema,
  content: ContentConfigSchema,
  projects: t.Array(ProjectConfigSchema),
  server: ServerConfigSchema,
} as const);

