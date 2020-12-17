import { chain, Rule } from '@angular-devkit/schematics';
import {
  addDepsToPackageJson,
  formatFiles,
  setDefaultCollection,
} from '@nrwl/workspace';
import {
  autoprefixerVersion,
  postcssCombineMediaQueryVersion,
} from '../../utils/versions';
import { InitSchematicSchema } from './schema';

function updateDependencies(): Rule {
  return addDepsToPackageJson(
    {},
    {
      autoprefixer: autoprefixerVersion,
      'postcss-combine-media-query': postcssCombineMediaQueryVersion,
    }
  );
}

export default function (schema: InitSchematicSchema) {
  return chain([
    setDefaultCollection('@trafilea/nx-shopify'),
    updateDependencies(),
    formatFiles(schema),
  ]);
}
