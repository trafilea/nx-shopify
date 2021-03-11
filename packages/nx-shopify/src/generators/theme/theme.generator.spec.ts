import {
  NxJsonConfiguration,
  readJson,
  Tree,
  WorkspaceJsonConfiguration,
} from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { ThemeGeneratorSchema } from './schema';
import { themeGenerator } from './theme.generator';

describe('theme', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  describe('nested', () => {
    it('should update workspace.json', async () => {
      const themeOptions: ThemeGeneratorSchema = { name: 'myTheme' };

      await themeGenerator(tree, themeOptions);
      const workspaceJson: WorkspaceJsonConfiguration = readJson(
        tree,
        '/workspace.json'
      );

      expect(workspaceJson.projects['my-theme'].root).toEqual('apps/my-theme');
      expect(workspaceJson.defaultProject).toEqual('my-theme');
    });

    it('should update nx.json', async () => {
      await themeGenerator(tree, { name: 'myTheme', tags: 'one,two' });
      const nxJson = readJson<NxJsonConfiguration>(tree, '/nx.json');
      expect(nxJson.projects).toEqual({
        'my-theme': {
          tags: ['one', 'two'],
        },
      });
    });

    it('should generate files', async () => {
      await themeGenerator(tree, { name: 'myTheme' });
      expect(tree.exists('apps/my-theme/config.yml')).toBeTruthy();
      expect(tree.exists('apps/my-theme/tsconfig.json')).toBeTruthy();
      expect(tree.exists('apps/my-theme/tsconfig.app.json')).toBeTruthy();
      expect(tree.exists('apps/my-theme/tsconfig.spec.json')).toBeTruthy();
      expect(tree.exists('apps/my-theme/postcss.config.js')).toBeTruthy();
      expect(tree.exists('apps/my-theme/media-queries.config.js')).toBeTruthy();

      expect(
        tree.exists('apps/my-theme/src/config/settings_data.json')
      ).toBeTruthy();
      expect(
        tree.exists('apps/my-theme/src/config/settings_schema.json')
      ).toBeTruthy();

      expect(
        tree.exists('apps/my-theme/src/theme/layout/theme/theme.liquid')
      ).toBeTruthy();
      expect(
        tree.exists('apps/my-theme/src/theme/layout/theme/theme.layout.ts')
      ).toBeTruthy();
      expect(
        tree.exists('apps/my-theme/src/theme/layout/theme/theme.layout.scss')
      ).toBeTruthy();

      const tsconfig = readJson(tree, 'apps/my-theme/tsconfig.json');
      expect(tsconfig.references).toEqual([
        {
          path: './tsconfig.app.json',
        },
        {
          path: './tsconfig.spec.json',
        },
      ]);

      const tsconfigApp = readJson(tree, 'apps/my-theme/tsconfig.app.json');
      expect(tsconfigApp.compilerOptions.outDir).toEqual('../../dist/out-tsc');
      expect(tsconfigApp.extends).toEqual('./tsconfig.json');
    });
  });
});
