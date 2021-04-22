import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration, Plugin } from 'webpack';
import { BuildExecutorSchema } from '../../../executors/build/schema';
import { getOutputHashFormat } from '../../utils';

function getExtraPlugins(options: BuildExecutorSchema) {
  const extraPlugins: Plugin[] = [];
  return extraPlugins;
}

export function getStylesWebpackPartialConfig(
  options: BuildExecutorSchema,
  chunksBaseName: string,
  isDevServer: boolean
): Configuration {
  const { postcssConfig, outputHashing } = options;

  const hashFormat = getOutputHashFormat(outputHashing);

  const webpackConfig: Configuration = {
    module: {
      rules: [
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          sideEffects: true,
          use: [
            isDevServer
              ? require.resolve('style-loader')
              : MiniCssExtractPlugin.loader,
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
    plugins: [
      new MiniCssExtractPlugin({
        filename: `assets/[name]${hashFormat.script}.css`,
        chunkFilename: `assets/[name]${hashFormat.chunk}.css`,
      }),
      ...getExtraPlugins(options),
    ],
  };

  return webpackConfig;
}
