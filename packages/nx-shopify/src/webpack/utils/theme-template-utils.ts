import * as glob from 'glob';
import * as path from 'path';

export function getTemplateEntryPoints(sourceRoot) {
  const entrypoints = {};

  const templatesEntries = glob.sync(`${sourceRoot}/theme/templates/**/*.ts`, {
    ignore: `${sourceRoot}/theme/templates/customers/**`,
  });

  templatesEntries.forEach((filePath) => {
    const entryName = path.parse(filePath).name;
    entrypoints[`template.${entryName}`] = filePath;
  });

  const templatesCustomersEntries = glob.sync(
    `${sourceRoot}/theme/templates/customers/**/*.ts`
  );
  templatesCustomersEntries.forEach((filePath) => {
    const entryName = path.parse(filePath).name;
    entrypoints[`template.customers.${entryName}`] = filePath;
  });

  return entrypoints;
}
