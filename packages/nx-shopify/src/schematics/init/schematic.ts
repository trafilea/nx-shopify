import { chain } from '@angular-devkit/schematics';
import { formatFiles, setDefaultCollection } from '@nrwl/workspace';
import { InitSchematicSchema } from './schema';

export default function (schema: InitSchematicSchema) {
  return chain([
    setDefaultCollection('@trafilea/nx-shopify'),
    formatFiles(schema),
  ]);
}
