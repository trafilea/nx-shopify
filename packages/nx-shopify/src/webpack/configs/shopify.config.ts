import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { Configuration } from 'webpack';
import * as webpackMerge from 'webpack-merge';
import { BuildExecutorSchema } from '../../executors/build/schema';
import { getCoreWebpackPartialConfig } from './partials/core.config';
import { getStylesWebpackPartialConfig } from './partials/styles.config';

export function getShopifyWebpackConfig(
  options: BuildExecutorSchema,
  isDevServer: boolean
) {
  const { sourceRoot, outputPath, themekitConfig, main } = options;

  const chunksBaseName = isDevServer
    ? 'assets/[name]'
    : 'assets/[name].[contenthash]';
  const chunksOutputPath = `${outputPath}`;

  let webpackConfig: Configuration = {
    entry: isDevServer
      ? [path.join(__dirname, './hmr/hot-client.js'), main]
      : main,
    output: {
      path: chunksOutputPath,
      filename: `${chunksBaseName}.js`,
      publicPath: '/assets',
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: `./${sourceRoot}/config/*.json`,
            to: 'config/[name].[ext]',
          },
          {
            from: `./${sourceRoot}/locales/*.json`,
            to: 'locales/[name].[ext]',
          },
          {
            from: `./${themekitConfig}`,
            to: '[name].[ext]',
          },
          {
            from: `./${sourceRoot}/theme/layout/**/*.liquid`,
            to: 'layout/[name].[ext]',
          },
          {
            from: `./${sourceRoot}/theme/templates/**/*.liquid`,
            to: 'templates/[name].[ext]',
            globOptions: {
              ignore: ['**/customers/**/*'],
            },
          },
          {
            from: `./${sourceRoot}/theme/templates/customers/**/*.liquid`,
            to: 'templates/customers/[name].[ext]',
          },
          {
            from: `./${sourceRoot}/theme/snippets/**/*.liquid`,
            to: 'snippets/[name].[ext]',
          },
          {
            from: `./${sourceRoot}/theme/sections/**/*.liquid`,
            to: 'sections/[name].[ext]',
          },
        ],
      }),
      new HTMLWebpackPlugin({
        excludeChunks: ['static'],
        filename: `snippets/style-tags.liquid`,
        template: path.resolve(__dirname, 'templates', 'style-tags.html'),
        inject: false,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          preserveLineBreaks: true,
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'auto',
        isDevServer,
      }),
      new HTMLWebpackPlugin({
        excludeChunks: ['static'],
        filename: `snippets/script-tags.liquid`,
        template: path.resolve(__dirname, 'templates', 'script-tags.html'),
        inject: false,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          preserveLineBreaks: true,
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'auto',
        isDevServer,
      }),
      new HTMLWebpackPlugin({
        filename: `snippets/webpack-public-path.liquid`,
        template: path.resolve(
          __dirname,
          'templates',
          'webpack-public-path.html'
        ),
        inject: false,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false,
          preserveLineBreaks: true,
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        isDevServer,
      }),
    ],
  };

  webpackConfig = webpackMerge.merge(
    getCoreWebpackPartialConfig(options, isDevServer),
    getStylesWebpackPartialConfig(options, chunksBaseName, isDevServer),
    webpackConfig
  );

  if (options.webpackConfig) {
    webpackConfig = require(options.webpackConfig)(webpackConfig, {
      options,
      configuration: null, // context.configurationName,
    });
  }

  return webpackConfig;
}
