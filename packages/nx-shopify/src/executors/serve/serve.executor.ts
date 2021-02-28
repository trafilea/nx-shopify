import {
  ExecutorContext,
  logger,
  parseTargetString,
  readTargetOptions,
} from '@nrwl/devkit';
import { BuildBuilderOptions } from '../../builders/build/schema';
import {
  getAvailablePortSeries,
  getIpAddress,
} from '../../utils/local-server/network-utils';
import { normalizeBuildOptions } from '../../utils/normalize-utils';
import { getThemekitEnvironmentConfig } from '../../utils/themekit';
import { getSourceRoot } from '../../utils/workspace-utils';
import { getShopifyWebpackConfig } from '../../webpack/configs/shopify.config';
import { LocalAssetServer } from './local-assets-server';
import { LocalDevelopmentServer } from './local-development-server';
import { ServeExecutorSchema } from './schema';

export default async function runExecutor(
  options: ServeExecutorSchema,
  context: ExecutorContext
) {
  const { buildTarget, themekitEnv, skipFirstDeploy, open } = options;

  const targetConfig = parseTargetString(buildTarget);
  const buildOptions: BuildBuilderOptions = getBuildOptions(options, context);
  const normalizedBuildOptions = normalizeBuildOptions(
    buildOptions,
    context.root,
    await getSourceRoot(context, targetConfig.project)
  );

  const { themekitConfig } = normalizedBuildOptions;

  logger.info('Serving theme...');
  const themekitEnvConfig = await getThemekitEnvironmentConfig(
    themekitEnv,
    themekitConfig,
    context
  );

  try {
    const ports = await getAvailablePortSeries(3000, 3);

    const [devServerPort, assetsServerPort, devServerUIPort] = ports;
    const { themeId, store } = themekitEnvConfig;

    const ipAddress = getIpAddress(options.devServerIpAddress);

    const devServer = new LocalDevelopmentServer({
      port: devServerPort,
      uiPort: devServerUIPort,
      target: store,
      themeId,
      address: ipAddress,
      openBrowser: open,
    });

    const assetServer = new LocalAssetServer({
      env: process.env.NODE_ENV,
      skipFirstDeploy,
      webpackConfig: getShopifyWebpackConfig(normalizedBuildOptions, true),
      port: assetsServerPort,
      address: ipAddress,
      devServer,
      themekitEnvConfig,
    });

    return new Promise(() => assetServer.start(options));
  } catch (error) {
    // console.error(chalk.red(`- ${error}`));
    console.error(error);
    process.exit(1);
  }
}

function getBuildOptions(
  options: ServeExecutorSchema,
  context: ExecutorContext
): BuildBuilderOptions {
  const target = parseTargetString(options.buildTarget);
  const overrides: Partial<BuildBuilderOptions> = {
    watch: false,
  };

  const { analyze } = options;

  if (analyze) {
    overrides.analyze = analyze;
  }
  const buildOptions = readTargetOptions(target, context);

  return {
    ...buildOptions,
    ...overrides,
  };
}
