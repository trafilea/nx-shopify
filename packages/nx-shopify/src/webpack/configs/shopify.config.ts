import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as glob from 'glob';
import * as path from 'path';
import { Configuration } from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import * as TerserPlugin from 'terser-webpack-plugin';
import { BuildBuilderOptions } from '../../builders/build/schema';
import {
  getTemplateEntryPoints,
  getLayoutEntryPoints,
  getChunkName,
  getExtractedStyles,
} from '../utils';
import { getCommonWebpackPartialConfig } from './common.config';

function getShopifyWebpackPartialConfig(
  options: BuildBuilderOptions,
  isDevServer: boolean
) {
  const { sourceRoot, themekitConfig } = options;

  const webpackConfig: Configuration = {
    entry: {
      ...getTemplateEntryPoints(sourceRoot),
      ...getLayoutEntryPoints(sourceRoot),
    },
    output: {
      path: options.outputPath,
      // chunkFilename: './assets/[name].bundle.js',
      filename: 'assets/[name].js',
    },
    node: false,
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
      new MiniCssExtractPlugin({
        filename: 'assets/[name].css',
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
        liquidTemplates: getTemplateEntryPoints(sourceRoot),
        liquidLayouts: getLayoutEntryPoints(sourceRoot),
      }),
      new HTMLWebpackPlugin({
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
        liquidTemplates: getTemplateEntryPoints(sourceRoot),
        liquidLayouts: getLayoutEntryPoints(sourceRoot),
        getExtractedStyles,
      }),
    ],

    optimization: {
      usedExports: true,
      splitChunks: {
        chunks: 'initial',
        name: getChunkName,
      },
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
  };
  return webpackConfig;
}

export function getShopifyWebpackConfig(
  options: BuildBuilderOptions,
  isDevServer: boolean
): Configuration {
  return webpackMerge.merge(
    getCommonWebpackPartialConfig(options, isDevServer),
    getShopifyWebpackPartialConfig(options, isDevServer)
  );
}
