import { readJson, Tree, WorkspaceJsonConfiguration } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {
  autoprefixerVersion,
  postcssCombineMediaQueryVersion,
} from '../../utils/versions';
import { nxShopifyInitGenerator } from './init.generator';
import { InitGeneratorSchema } from './schema';

describe('init', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should update default collection', async () => {
    const initOptions: InitGeneratorSchema = { skipFormat: false };

    await nxShopifyInitGenerator(tree, initOptions);
    const workspaceJson = readJson<WorkspaceJsonConfiguration>(
      tree,
      '/workspace.json'
    );

    expect(workspaceJson.cli?.defaultCollection).toEqual(
      '@trafilea/nx-shopify'
    );
  });

  it('should update package.json', async () => {
    const initOptions: InitGeneratorSchema = { skipFormat: false };

    await nxShopifyInitGenerator(tree, initOptions);
    const packageJson = readJson(tree, '/package.json');

    expect(packageJson.devDependencies).toEqual(
      expect.objectContaining({
        autoprefixer: autoprefixerVersion,
        'postcss-combine-media-query': postcssCombineMediaQueryVersion,
      })
    );
  });
});
