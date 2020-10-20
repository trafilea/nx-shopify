import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as glob from 'glob';
import { Configuration } from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildBuilderOptions } from '../../builders/build/schema';
import { getTemplatesLiquidFiles } from '../utils/template-utils';
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

  function generateHtmlPlugins(dir) {
    const files = getTemplatesLiquidFiles(dir);
    return files.map((item) => {
      const parts = item.split('.');
      const name = parts[0];
      return new HTMLWebpackPlugin({
        filename: `templates/${name}.liquid`,
        template: `${dir}/${name}/${name}.liquid`,
        inject: false,
        templateBundle: `${name}`,
        cache: false,
      });
    });
  }

  const webpackConfig: Configuration = {
    entry: templatesEntries,
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
          // {
          //   from: `./${sourceRoot}/theme/templates/customers/*.liquid`,
          //   to: 'templates/[folder]/[name].[ext]',
          // },
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
      ...generateHtmlPlugins(`${sourceRoot}/theme/templates`),
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
