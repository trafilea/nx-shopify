import {
  ExecutorContext,
  logger,
  parseTargetString,
  readTargetOptions,
} from '@nrwl/devkit';
import { BuildExecutorSchema } from '../../executors/build/schema';
import { runThemekitCommand } from '../../utils/themekit';
import { DeployExecutorSchema } from './schema';

export async function deployExecutor(
  options: DeployExecutorSchema,
  context: ExecutorContext
) {
  const projectName = context.projectName ?? 'your';
  const { open, themekitEnv: env = 'development', allowLive = false } = options;
  const buildOptions: BuildExecutorSchema = getBuildOptions(options, context);
  const { outputPath } = buildOptions;

  try {
    await runThemekitCommand('version');
    await runThemekitCommand('deploy', { env, allowLive }, { cwd: outputPath });

    if (open) {
      await runThemekitCommand('open', { env }, { cwd: outputPath });
    }

    logger.info(`🎉 Successfully deployed ${projectName} theme to Shopify`);
    return { success: true };
  } catch (error) {
    logger.error(`❌ Failed to deploy ${projectName} theme to Shopify`);
    logger.error(error);
    return { success: true };
  }
}

function getBuildOptions(
  options: DeployExecutorSchema,
  context: ExecutorContext
): BuildExecutorSchema {
  const target = parseTargetString(options.buildTarget);
  const overrides: Partial<BuildExecutorSchema> = {
    watch: false,
  };

  const buildOptions = readTargetOptions(target, context);

  return {
    ...buildOptions,
    ...overrides,
  };
}

export default deployExecutor;
