import { ExecutorContext } from '@nrwl/devkit';
import * as fs from 'fs';
import { load } from 'js-yaml';
import * as path from 'path';
import * as camelcaseKeys from 'camelcase-keys';

export interface ThemekitEnvironmentConfig {
  password: string;
  themeId: string;
  store: string;
  proxy: string;
  ignoreFiles: string[];
}

export interface ThemekitConfig {
  [environment: string]: ThemekitEnvironmentConfig;
}

export async function getThemekitConfig(
  configPath: string,
  context: ExecutorContext
): Promise<ThemekitConfig> {
  const configAbsolutePath = path.join(context.root, configPath);

  if (!fs.existsSync(configAbsolutePath)) {
    throw new Error(
      `Can not find themekit config file at ${configAbsolutePath}`
    );
  }

  let themekitConfig: ThemekitConfig = null;

  try {
    const configYaml = load(fs.readFileSync(configAbsolutePath, 'utf8'), {
      json: true,
    }) as ThemekitConfig;
    themekitConfig = camelcaseKeys<ThemekitConfig>(configYaml, {
      deep: true,
    });
  } catch (error) {
    console.log(error);
  }
  return themekitConfig;
}

export async function getThemekitEnvironmentConfig(
  environment: string,
  configPath: string,
  context: ExecutorContext
): Promise<ThemekitEnvironmentConfig> {
  const themekitConfig = await getThemekitConfig(configPath, context);
  return themekitConfig[environment];
}
