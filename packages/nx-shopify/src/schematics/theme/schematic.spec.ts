import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { ThemeSchematicSchema } from './schema';

describe('theme schematic', () => {
  let appTree: Tree;
  const options: ThemeSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@trafilea/theme',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('theme', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
