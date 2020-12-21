import { normalize } from '@angular-devkit/core';
import { statSync } from 'fs';
import { basename, dirname, relative, resolve } from 'path';
import {
  Asset,
  AssetObj,
  BuildBuilderOptions,
  FileReplacement,
} from '../builders/build/schema';

function normalizeAssets(
  assets: Asset[],
  root: string,
  sourceRoot: string
): AssetObj[] {
  return assets.map((asset) => {
    if (typeof asset === 'string') {
      const assetPath = normalize(asset);
      const resolvedAssetPath = resolve(root, assetPath);
      const resolvedSourceRoot = resolve(root, sourceRoot);

      if (!resolvedAssetPath.startsWith(resolvedSourceRoot)) {
        throw new Error(
          `The ${resolvedAssetPath} asset path must start with the project source root: ${sourceRoot}`
        );
      }

      const isDirectory = statSync(resolvedAssetPath).isDirectory();
      const input = isDirectory
        ? resolvedAssetPath
        : dirname(resolvedAssetPath);
      const output = 'assets';
      const glob = isDirectory ? '**/*' : basename(resolvedAssetPath);
      return {
        input,
        output,
        glob,
      };
    } else {
      if (asset.output.startsWith('..')) {
        throw new Error(
          'An asset cannot be written to a location outside of the output path.'
        );
      }

      const assetPath = normalize(asset.input);
      const resolvedAssetPath = resolve(root, assetPath);
      return {
        ...asset,
        input: resolvedAssetPath,
        // Now we remove starting slash to make Webpack place it from the output root.
        output: asset.output.replace(/^\//, ''),
      };
    }
  });
}

function normalizeFileReplacements(
  root: string,
  fileReplacements: FileReplacement[]
): FileReplacement[] {
  return fileReplacements
    ? fileReplacements.map((fileReplacement) => ({
        replace: resolve(root, fileReplacement.replace),
        with: resolve(root, fileReplacement.with),
      }))
    : [];
}

export function normalizeBuildOptions<T extends BuildBuilderOptions>(
  options: T,
  root: string,
  sourceRoot: string
): T {
  return {
    ...options,
    root: root,
    sourceRoot: sourceRoot,
    outputPath: resolve(root, options.outputPath),
    tsConfig: resolve(root, options.tsConfig),
    mediaQueriesConfig: resolve(root, options.mediaQueriesConfig),
    fileReplacements: normalizeFileReplacements(root, options.fileReplacements),
    assets: options.assets
      ? normalizeAssets(options.assets, root, sourceRoot)
      : options.assets,
    webpackConfig: options.webpackConfig
      ? resolve(root, options.webpackConfig)
      : options.webpackConfig,
  };
}
