import { chain, Rule } from '@angular-devkit/schematics';
import {
  addDepsToPackageJson,
  formatFiles,
  setDefaultCollection,
} from '@nrwl/workspace';
import { autoprefixerVersion } from '../../utils/versions';
import { InitSchematicSchema } from './schema';

function updateDependencies(): Rule {
  return addDepsToPackageJson(
    {},
    {
      autoprefixer: autoprefixerVersion,
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
