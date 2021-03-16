import {
  addDependenciesToPackageJson,
  convertNxGenerator,
  formatFiles,
  Tree,
} from '@nrwl/devkit';
import { setDefaultCollection } from '@nrwl/workspace/src/utilities/set-default-collection';
import {
  autoprefixerVersion,
  documentReadyVersion,
  postcssCombineMediaQueryVersion,
} from '../../utils/versions';
import { InitGeneratorSchema } from './schema';

function updateDependencies(tree: Tree) {
  return addDependenciesToPackageJson(
    tree,
    {},
    {
      autoprefixer: autoprefixerVersion,
      'document-ready': documentReadyVersion,
      'postcss-combine-media-query': postcssCombineMediaQueryVersion,
    }
  );
}

export async function nxShopifyInitGenerator(
  tree: Tree,
  schema: InitGeneratorSchema
) {
  setDefaultCollection(tree, '@trafilea/nx-shopify');

  if (!schema.skipFormat) {
    await formatFiles(tree);
  }
  return updateDependencies(tree);
}

export default nxShopifyInitGenerator;
export const nxShopifyInitSchematic = convertNxGenerator(
  nxShopifyInitGenerator
);
