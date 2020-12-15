import * as glob from 'glob';
import * as path from 'path';

export function getLayoutEntryPoints(sourceRoot) {
  const entrypoints = {};

  const templatesEntries = glob.sync(`${sourceRoot}/theme/layout/**/*.ts`);

  templatesEntries.forEach((filePath) => {
    const entryName = path.parse(filePath).name;
    entrypoints[`layout.${entryName}`] = filePath;
  });

  return entrypoints;
}
