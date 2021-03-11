import { Stats } from 'webpack';
import { BuildExecutorSchema } from '../executors/build/schema';

export function getAliases(
  options: BuildExecutorSchema
): { [key: string]: string } {
  return options.fileReplacements
    ? options.fileReplacements.reduce(
        (aliases, replacement) => ({
          ...aliases,
          [replacement.replace]: replacement.with,
        }),
        {}
      )
    : null;
}

export function getStatsConfig(
  options: BuildExecutorSchema
): Stats.ToStringOptions {
  return {
    hash: true,
    timings: false,
    cached: false,
    cachedAssets: false,
    modules: false,
    warnings: true,
    errors: true,
    colors: !options.verbose && !options.statsJson,
    chunks: !options.verbose,
    assets: !!options.verbose,
    chunkOrigins: !!options.verbose,
    chunkModules: !!options.verbose,
    children: !!options.verbose,
    reasons: !!options.verbose,
    version: !!options.verbose,
    errorDetails: !!options.verbose,
    moduleTrace: !!options.verbose,
    usedExports: !!options.verbose,
  };
}
