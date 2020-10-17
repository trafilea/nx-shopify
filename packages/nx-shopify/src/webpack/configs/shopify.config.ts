import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as glob from 'glob';
import { Configuration } from 'webpack';
import * as webpackMerge from 'webpack-merge';
import { BuildBuilderOptions } from '../../builders/build/schema';
import { getCommonWebpackPartialConfig } from './common.config';

function getShopifyWebpackPartialConfig(options: BuildBuilderOptions) {
  const { sourceRoot, themekitConfig } = options;

  const templatesEntries = glob
    .sync(`${sourceRoot}/theme/templates/**/*.ts`)
    .reduce((acc, path) => {
      const entry = path.replace(/^.*[\\/]/, '').replace('.ts', '');
      acc[entry] = path;
      return acc;
    }, {});

  const webpackConfig: Configuration = {
    entry: templatesEntries,
    output: {
      path: options.outputPath,
      chunkFilename: './assets/[name].bundle.js',
      filename: './assets/[name].[contenthash].js',
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
            from: `./${sourceRoot}/theme/templates/customers/*.liquid`,
            to: 'templates/[folder]/[name].[ext]',
          },
          {
            from: `./${sourceRoot}/theme/templates/*/*.liquid`,
            to: 'templates/[name].[ext]',
            globOptions: {
              ignore: ['**/src/theme/templates/customers/**/*'],
            },
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
