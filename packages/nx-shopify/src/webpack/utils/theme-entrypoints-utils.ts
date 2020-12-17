import * as glob from 'glob';
import * as path from 'path';

export function getLayoutEntryPoints(sourceRoot) {
  const entrypoints = {};

  const templatesEntries = glob.sync(`${sourceRoot}/theme/layout/**/*.ts`);

  templatesEntries.forEach((filePath) => {
    const entryName = path.parse(filePath).name;

    if (entryName.endsWith('.layout')) {
      entrypoints[entryName] = filePath;
    }
  });

  return entrypoints;
}

export function getTemplateEntryPoints(sourceRoot) {
  const entrypoints = {};

  const templatesEntries = glob.sync(`${sourceRoot}/theme/templates/**/*.ts`, {
    ignore: `${sourceRoot}/theme/templates/customers/**`,
  });

  templatesEntries.forEach((filePath) => {
    const entryName = path.parse(filePath).name;
    if (entryName.endsWith('.template')) {
      entrypoints[entryName] = filePath;
    }
  });

  const templatesCustomersEntries = glob.sync(
    `${sourceRoot}/theme/templates/customers/**/*.ts`
  );
  templatesCustomersEntries.forEach((filePath) => {
    const entryName = path.parse(filePath).name;
    if (entryName.startsWith('customers.') && entryName.endsWith('.template')) {
      entrypoints[entryName] = filePath;
    }
  });

  return entrypoints;
}
