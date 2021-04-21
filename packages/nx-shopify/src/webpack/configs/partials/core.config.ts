import { readTsConfig } from '@nrwl/workspace/src/utilities/typescript';
import * as CircularDependencyPlugin from 'circular-dependency-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { LicenseWebpackPlugin } from 'license-webpack-plugin';
import * as path from 'path';
import * as TerserPlugin from 'terser-webpack-plugin';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { ScriptTarget } from 'typescript';
import {
  Configuration,
  HotModuleReplacementPlugin,
  optimize as WebpackOptimize,
  Plugin,
  ProgressPlugin,
} from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildExecutorSchema } from '../../../executors/build/schema';
import { getAliases, getStatsConfig } from '../../../utils/webpack-utils';
import { getOutputHashFormat } from '../../utils';

import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function getExtraPlugins(options: BuildExecutorSchema, isDevServer: boolean) {
  const extraPlugins: Plugin[] = [];

  const {
    watch,
    analyze,
    statsJson,
    showCircularDependencies,
    progress,
    extractLicenses,
  } = options;

  if (progress) {
    extraPlugins.push(new ProgressPlugin());
  }

  if (extractLicenses) {
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

  if (showCircularDependencies) {
    extraPlugins.push(
      new CircularDependencyPlugin({
        exclude: /[\\/]node_modules[\\/]/,
      })
    );
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

  if (isDevServer) {
    extraPlugins.push(new WebpackOptimize.OccurrenceOrderPlugin(true));
    extraPlugins.push(new HotModuleReplacementPlugin());
  }

  return extraPlugins;
}

export function getCoreWebpackPartialConfig(
  options: BuildExecutorSchema,
  isDevServer: boolean
): Configuration {
  const {
    tsConfig,
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

  const hashFormat = getOutputHashFormat(options.outputHashing);

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
          test: /\.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
          loader: require.resolve('file-loader'),
          options: {
            name: `assets/[name]${hashFormat.file}.[ext]`,
          },
        },
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: (isDevServer
            ? [
                {
                  loader: path.resolve(__dirname, '../hmr/hmr-alamo-loader'),
                  options: {
                    configFile: tsConfig,
                    transpileOnly: true,
                    // https://github.com/TypeStrong/ts-loader/pull/685
                    experimentalWatchApi: true,
                  },
                },
              ]
            : []
          ).concat({
            loader: require.resolve(`ts-loader`),
            options: {
              configFile: tsConfig,
              transpileOnly: true,
              // https://github.com/TypeStrong/ts-loader/pull/685
              experimentalWatchApi: true,
            },
          }),
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
    optimization: {
      usedExports: true,
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '--',
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: tsConfig,
          memoryLimit: memoryLimit || 2048,
        },
      }),
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
