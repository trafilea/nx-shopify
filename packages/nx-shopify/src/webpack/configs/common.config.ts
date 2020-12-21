import { readTsConfig } from '@nrwl/workspace';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { LicenseWebpackPlugin } from 'license-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as MediaQueryPlugin from 'media-query-plugin';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { ScriptTarget } from 'typescript';
import { Configuration, Plugin, ProgressPlugin } from 'webpack';
import { BuildBuilderOptions } from '../../builders/build/schema';
import { getAliases, getStatsConfig } from '../../utils/webpack-utils';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';

import CircularDependencyPlugin = require('circular-dependency-plugin');
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function getExtraPlugins(options: BuildBuilderOptions) {
  const extraPlugins: Plugin[] = [];

  const { mediaQueriesConfig } = options;

  if (options.progress) {
    extraPlugins.push(new ProgressPlugin());
  }

  if (options.extractLicenses) {
    extraPlugins.push(
      (new LicenseWebpackPlugin({
        stats: {
          errors: false,
        },
        perChunkOutput: false,
        outputFilename: `3rdpartylicenses.txt`,
      }) as unknown) as Plugin
    );
  }

  // process asset entries
  if (Array.isArray(options.assets) && options.assets.length > 0) {
    const copyWebpackPluginInstance = new CopyWebpackPlugin({
      patterns: options.assets.map((asset: any) => {
        return {
          context: asset.input,
          // Now we remove starting slash to make Webpack place it from the output root.
          to: asset.output,
          from: asset.glob,
          flatten: true,
          globOptions: {
            ignore: [
              '.gitkeep',
              '**/.DS_Store',
              '**/Thumbs.db',
              ...(asset.ignore ? asset.ignore : []),
            ],
            dot: true,
          },
        };
      }),
    });
    extraPlugins.push(copyWebpackPluginInstance);
  }

  if (options.showCircularDependencies) {
    extraPlugins.push(
      new CircularDependencyPlugin({
        exclude: /[\\/]node_modules[\\/]/,
      })
    );
  }

  if (mediaQueriesConfig) {
    const mediaQueries = require(mediaQueriesConfig);

    if (typeof mediaQueries === 'object' && mediaQueries !== null) {
      extraPlugins.push(
        new MediaQueryPlugin({
          include: /.*/,
          queries: mediaQueries,
        })
      );
    }
  }

  return extraPlugins;
}

export function getCommonWebpackPartialConfig(
  options: BuildBuilderOptions
): Configuration {
  const {
    tsConfig,
    postcssConfig,
    sourceMap,
    optimization,
    memoryLimit,
    watch,
    poll,
  } = options;

  const {
    options: { target },
  } = readTsConfig(tsConfig);

  const supportsEs2015 =
    target !== ScriptTarget.ES3 && target !== ScriptTarget.ES5;

  const mainFields = [...(supportsEs2015 ? ['es2015'] : []), 'module', 'main'];
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];

  const webpackConfig: Configuration = {
    devtool:
      sourceMap && typeof sourceMap === 'boolean'
        ? 'source-map'
        : sourceMap
        ? sourceMap
        : false,
    mode: optimization ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          loader: `ts-loader`,
          exclude: /node_modules/,
          options: {
            configFile: tsConfig,
            transpileOnly: true,
            // https://github.com/TypeStrong/ts-loader/pull/685
            experimentalWatchApi: true,
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            MediaQueryPlugin.loader,
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: postcssConfig,
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions,
      alias: getAliases(options),
      plugins: [
        new TsConfigPathsPlugin({
          configFile: options.tsConfig,
          extensions,
          mainFields,
        }),
      ],
      mainFields,
    },
    performance: {
      hints: false,
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: tsConfig,
          memoryLimit: memoryLimit || 2048,
        },
      }),
      new CleanWebpackPlugin(),
      ...getExtraPlugins(options),
    ],
    watch,
    watchOptions: {
      poll,
    },
    stats: getStatsConfig(options),
  };

  return webpackConfig;
}
