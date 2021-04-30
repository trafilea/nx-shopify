import {
  addDependenciesToPackageJson,
  convertNxGenerator,
  formatFiles,
  GeneratorCallback,
  Tree,
} from '@nrwl/devkit';
import { jestInitGenerator } from '@nrwl/jest';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
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
    {
      'document-ready': documentReadyVersion,
    },
    {
      autoprefixer: autoprefixerVersion,
      'postcss-combine-media-query': postcssCombineMediaQueryVersion,
    }
  );
}

export async function nxShopifyInitGenerator(
  host: Tree,
  schema: InitGeneratorSchema
) {
  setDefaultCollection(host, '@trafilea/nx-shopify');

  const tasks: GeneratorCallback[] = [];

  if (!schema.unitTestRunner || schema.unitTestRunner === 'jest') {
    const jestTask = jestInitGenerator(host, {});
    tasks.push(jestTask);
  }

  const updateDepsTask = updateDependencies(host);
  tasks.push(updateDepsTask);

  if (!schema.skipFormat) {
    await formatFiles(host);
  }
  return runTasksInSerial(...tasks);
}

export default nxShopifyInitGenerator;
export const nxShopifyInitSchematic = convertNxGenerator(
  nxShopifyInitGenerator
);
