import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { runWebpack } from '@angular-devkit/build-webpack';
import { from, Observable } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { deleteOutputDir } from '../../utils/output-dir-utils';
import { normalizeBuildOptions } from '../../utils/normalize-utils';
import { getSourceRoot } from '../../utils/workspace-utils';
import { getShopifyWebpackConfig } from '../../webpack/configs/shopify.config';
import { BuildBuilderOptions } from './schema';

export function runBuilder(
  options: BuildBuilderOptions,
  context: BuilderContext
): Observable<BuilderOutput> {
  const projectName = context.target?.project;
  if (!projectName) {
    throw new Error('The builder requires a target.');
  }

  // Delete output path before bundling
  deleteOutputDir(context.workspaceRoot, options.outputPath);

  return from(getSourceRoot(context)).pipe(
    map((sourceRoot) =>
      normalizeBuildOptions(options, context.workspaceRoot, sourceRoot)
    ),
    map((normalizedOptions) => {
      let webpackConfig = getShopifyWebpackConfig(normalizedOptions);
      if (normalizedOptions.webpackConfig) {
        webpackConfig = require(normalizedOptions.webpackConfig)(
          webpackConfig,
          {
            options: normalizedOptions,
            configuration: context.target.configuration,
          }
        );
      }
      return webpackConfig;
    }),
    concatMap((webpackConfig) =>
      runWebpack(webpackConfig, context, {
        logging: (stats) => {
          context.logger.info(stats.toString(webpackConfig.stats));
        },
        webpackFactory: require('webpack'),
      })
    ),
    tap((builderOutput) => {
      // context.logger.info(JSON.stringify(builderOutput.webpackStats['errors']));
      if (builderOutput.success) {
        context.logger.info(`🎉 Successfully built ${projectName} theme\n`);
      } else {
        context.logger.error(`❌ Failed to build ${projectName} theme\n`);
      }
    })
  );
}

export default createBuilder(runBuilder);
