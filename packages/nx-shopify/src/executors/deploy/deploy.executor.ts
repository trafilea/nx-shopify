import {
  ExecutorContext,
  logger,
  parseTargetString,
  readTargetOptions,
  runExecutor,
} from '@nrwl/devkit';
import { BuildExecutorSchema } from '../../executors/build/schema';
import { runThemekitCommand } from '../../utils/themekit';
import { DeployExecutorSchema } from './schema';

export async function deployExecutor(
  options: DeployExecutorSchema,
  context: ExecutorContext
) {
  const projectName = context.projectName ?? 'your';
  const {
    open,
    themekitEnv: env = 'development',
    allowLive = false,
    buildTarget,
  } = options;
  const buildOptions: BuildExecutorSchema = getBuildOptions(options, context);
  const { outputPath } = buildOptions;

  await runExecutor(parseTargetString(buildTarget), {}, context);

  for await (const output of await runExecutor<{
    success: boolean;
  }>(parseTargetString(buildTarget), {}, context)) {
    if (!output.success) throw new Error('Could not compile application files');
  }

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
