import { readTsConfig } from '@nrwl/workspace/src/utilities/typescript';
import * as CircularDependencyPlugin from 'circular-dependency-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import { LicenseWebpackPlugin } from 'license-webpack-plugin';
import * as MediaQuerySplittingPlugin from 'media-query-splitting-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { ScriptTarget } from 'typescript';
import { Configuration, Plugin, ProgressPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildExecutorSchema } from '../../executors/build/schema';
import { getAliases, getStatsConfig } from '../../utils/webpack-utils';

import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function getExtraPlugins(options: BuildExecutorSchema, isDevServer: boolean) {
  const extraPlugins: Plugin[] = [];

  const { mediaQueriesConfig, watch, analyze, statsJson } = options;

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
        new MediaQuerySplittingPlugin({
          media: mediaQueries,
          minify: true,
        })
      );
    }
  }

  if (analyze || statsJson) {
    extraPlugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: analyze
          ? statsJson
            ? 'json'
            : isDevServer || watch
            ? 'server'
            : 'static'
          : 'disabled',
        generateStatsFile: statsJson,
      })
    );
  }

  return extraPlugins;
}

export function getCommonWebpackPartialConfig(
  options: BuildExecutorSchema,
  isDevServer: boolean
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
          loader: require.resolve(`ts-loader`),
          exclude: /node_modules/,
          options: {
            configFile: tsConfig,
            transpileOnly: true,
            // https://github.com/TypeStrong/ts-loader/pull/685
            experimentalWatchApi: true,
          },
        },
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          sideEffects: true,
          use: [
            MiniCssExtractPlugin.loader,
            require.resolve('css-loader'),
            {
              loader: require.resolve('postcss-loader'),
              options: {
                implementation: require('postcss'),
                postcssOptions: {
                  config: postcssConfig,
                },
              },
            },
            require.resolve('sass-loader'),
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
      ...getExtraPlugins(options, isDevServer),
    ],
    watch,
    watchOptions: {
      poll,
    },
    stats: getStatsConfig(options),
  };

  return webpackConfig;
}
