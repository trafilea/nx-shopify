import * as nrwlDevkit from '@nrwl/devkit';
import { ExecutorContext } from '@nrwl/devkit';
import * as normalizeUtils from '../../utils/normalize-utils';
import * as themekitConfigUtils from '../../utils/themekit/themekit-config-utils';
import * as themekitValidationUtils from '../../utils/themekit/themekit-validation-utils';
import { BuildExecutorSchema } from '../build/schema';
import { ServeExecutorSchema } from './schema';
import { serveExecutor } from './serve.executor';

jest.mock('webpack-dev-middleware');
jest.mock('webpack-hot-middleware');
jest.mock('../../webpack/configs/shopify.config', () => ({
  getShopifyWebpackConfig: jest.fn().mockReturnValue({}),
}));
describe('Serve Executor', () => {
  let context: ExecutorContext;
  let options: ServeExecutorSchema;

  beforeEach(async () => {
    jest.clearAllMocks();

    context = {
      root: '/root',
      cwd: '/root',
      projectName: 'proj',
      targetName: 'serve',
      workspace: {
        version: 2,
        projects: {
          proj: {
            root: 'proj',
            sourceRoot: 'proj/src',
            targets: {
              serve: {
                executor: '@trafilea/nx-shopify:serve',
                options: {
                  buildTarget: 'proj:build',
                },
              },
              build: {
                executor: 'build',
                options: {},
              },
            },
          },
        },
      },
      isVerbose: false,
    };

    options = {
      buildTarget: 'proj:build',
    } as ServeExecutorSchema;

    jest.mock('./local-assets-server');

    jest.spyOn(nrwlDevkit, 'readTargetOptions').mockImplementation(() => ({
      themekitConfig: 'proj/src/config.yml',
      outputPath: 'dist/proj',
      tsConfig: '',
      mediaQueriesConfig: '',
    }));

    jest.spyOn(normalizeUtils, 'normalizeBuildOptions').mockImplementation(
      () =>
        ({
          themekitConfig: 'proj/src/config.yml',
        } as BuildExecutorSchema)
    );

    jest
      .spyOn(themekitConfigUtils, 'getThemekitEnvironmentConfig')
      .mockImplementation(() =>
        Promise.resolve({
          store: '',
          themeId: '',
          password: '',
          proxy: '',
          ignoreFiles: [],
        })
      );
  });

  it('should pass `analyze` to build', async () => {
    jest.spyOn(themekitValidationUtils, 'isLiveTheme').mockResolvedValue(false);

    const analyze = true;
    await serveExecutor(
      { ...options, analyze, skipFirstDeploy: true },
      context
    );

    expect(normalizeUtils.normalizeBuildOptions).toHaveBeenCalledWith(
      expect.objectContaining({
        analyze,
      }),
      '/root',
      'proj/src'
    );
  });
});
