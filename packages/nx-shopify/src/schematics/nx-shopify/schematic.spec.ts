import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { NxShopifySchematicSchema } from './schema';

describe('nx-shopify schematic', () => {
  let appTree: Tree;
  const options: NxShopifySchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@trafilea/nx-shopify',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('nx-shopify', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
