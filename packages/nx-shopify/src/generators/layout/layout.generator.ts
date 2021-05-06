import {
  convertNxGenerator,
  formatFiles,
  generateFiles,
  getProjects,
  getWorkspaceLayout,
  joinPathFragments,
  logger,
  names,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import {
  assertUniqueLiquidFileNameOption,
  assertValidGeneratorNameOption,
} from '../../utils/generator-utils';
import { LiquidFileType } from '../../utils/shopify';
import { LayoutGeneratorSchema } from './schema';

async function getLayoutDirectory(options: LayoutGeneratorSchema) {
  const fileName = names(options.name).fileName;
  let baseDir = joinPathFragments('theme', 'layout');
  if (options.directory) {
    baseDir = joinPathFragments(baseDir, options.directory);
  }
  return options.flat ? baseDir : joinPathFragments(baseDir, fileName);
}

interface NormalizedSchema extends LayoutGeneratorSchema {
  projectName: string;
  projectSourceRoot: string;
  importPath: string;
  layoutDirectory: string;
}

async function normalizeOptions(
  host: Tree,
  options: LayoutGeneratorSchema
): Promise<NormalizedSchema> {
  const { name, directory, project: projectName } = options;

  assertValidGeneratorNameOption(name, directory, 'layout');

  const project = getProjects(host).get(projectName);

  if (!project) {
    logger.error(
      `Cannot find the ${projectName} project. Please double check the project name.`
    );
    throw new Error();
  }
  const { sourceRoot: projectSourceRoot, root: projectRoot } = project;

  const { npmScope } = getWorkspaceLayout(host);
  const importPath = `@${npmScope}/${projectRoot
    .split('/')
    .slice(1)
    .join('/')}`;

  const layoutDirectory = await getLayoutDirectory(options);
  return {
    ...options,
    projectName,
    projectSourceRoot,
    importPath,
    layoutDirectory,
  };
}

function createLayoutFiles(host: Tree, options: NormalizedSchema) {
  const { projectSourceRoot } = options;

  const layoutDir = joinPathFragments(
    projectSourceRoot,
    options.layoutDirectory
  );

  const templateOptions = {
    ...options,
    ...names(options.name),
    template: '',
  };

  assertUniqueLiquidFileNameOption(
    templateOptions.fileName,
    LiquidFileType.LAYOUT,
    joinPathFragments(projectSourceRoot, 'theme')
  );

  generateFiles(
    host,
    path.join(__dirname, 'files'),
    layoutDir,
    templateOptions
  );

  for (const c of host.listChanges()) {
    let deleteFile = false;

    if (options.skipTests && /.*.spec.ts/.test(c.path)) {
      deleteFile = true;
    }

    if (options.liquidOnly && !/.*.liquid/.test(c.path)) {
      deleteFile = true;
    }

    if (deleteFile) {
      host.delete(c.path);
    }
  }
}

export async function layoutGenerator(
  host: Tree,
  options: LayoutGeneratorSchema
) {
  const normalizedOptions = await normalizeOptions(host, options);
  createLayoutFiles(host, normalizedOptions);

  await formatFiles(host);
}

export default layoutGenerator;
export const nxShopifyLayoutSchematic = convertNxGenerator(layoutGenerator);
