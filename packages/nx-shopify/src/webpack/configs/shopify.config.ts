import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as glob from 'glob';
import * as path from 'path';
import { Configuration } from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildBuilderOptions } from '../../builders/build/schema';
import {
  getTemplateEntryPoints,
} from '../utils/template-utils';
import { getCommonWebpackPartialConfig } from './common.config';

function getShopifyWebpackPartialConfig(options: BuildBuilderOptions) {
  const { sourceRoot, themekitConfig } = options;

  const webpackConfig: Configuration = {
    entry: {
      ...getTemplateEntryPoints(sourceRoot),
    },
    output: {
      path: options.outputPath,
      // chunkFilename: './assets/[name].bundle.js',
      filename: './assets/[name].js',
    },
    node: false,
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: `${sourceRoot}/assets/**/*`,
            to: 'assets/',
            flatten: true,
          },
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
            from: `./${sourceRoot}/theme/layout/theme.liquid`,
            to: 'layout/[name].[ext]',
          },
          {
            from: `./${sourceRoot}/theme/templates/**/*.liquid`,
            to: 'templates/[name].[ext]',
            globOptions: {
              ignore: ['**/customers/**/*']
            }
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
    ],
  };
  return webpackConfig;
}

export function getShopifyWebpackConfig(
  options: BuildBuilderOptions
): Configuration {
  return webpackMerge.merge(
    getCommonWebpackPartialConfig(options),
    getShopifyWebpackPartialConfig(options)
  );
}
