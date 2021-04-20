import { ExecutorContext, logger } from '@nrwl/devkit';
import {
  getEmittedFiles,
  runWebpack,
} from '@nrwl/workspace/src/utilities/run-webpack';
import { from } from 'rxjs';
import { eachValueFrom } from 'rxjs-for-await';
import { concatMap, map, tap } from 'rxjs/operators';
import { normalizeBuildOptions } from '../../utils/normalize-utils';
import { deleteOutputDir } from '../../utils/output-dir-utils';
import { getSourceRoot } from '../../utils/workspace-utils';
import { getShopifyWebpackConfig } from '../../webpack/configs/shopify.config';
import { BuildExecutorSchema } from './schema';

export function buildExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  const projectName = context.projectName;
  if (!projectName) {
    throw new Error('The builder requires a target.');
  }

  // Delete output path before bundling
  deleteOutputDir(context.root, options.outputPath);

  return eachValueFrom(
    from(getSourceRoot(context)).pipe(
      map((sourceRoot) =>
        normalizeBuildOptions(options, context.root, sourceRoot)
      ),
      concatMap((normalizedOptions) => {
        const webpackConfig = getShopifyWebpackConfig(normalizedOptions, false);
        return runWebpack(webpackConfig).pipe(
          tap((stats) => {
            logger.info(stats.toString(webpackConfig.stats));
          })
        );
      }),
      map((webpackStats) => {
        return {
          success: webpackStats && !webpackStats.hasErrors(),
          emittedFiles: getEmittedFiles(webpackStats),
        };
      }),
      tap((builderOutput) => {
        // context.logger.info(JSON.stringify(builderOutput.webpackStats['errors']));
        if (builderOutput.success) {
          logger.info(`🎉 Successfully built ${projectName} theme\n`);
        } else {
          logger.error(`❌ Failed to build ${projectName} theme\n`);
        }
      })
    )
  );
}

export default buildExecutor;
