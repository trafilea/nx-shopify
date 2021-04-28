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
import { SectionGeneratorSchema } from './schema';

async function getSectionsDirectory(options: SectionGeneratorSchema) {
  const fileName = names(options.name).fileName;
  let baseDir = joinPathFragments('theme', 'sections');
  if (options.directory) {
    baseDir = joinPathFragments(baseDir, options.directory);
  }
  return options.flat ? baseDir : joinPathFragments(baseDir, fileName);
}

interface NormalizedSchema extends SectionGeneratorSchema {
  projectName: string;
  projectSourceRoot: string;
  importPath: string;
  sectionsDirectory: string;
}

async function normalizeOptions(
  host: Tree,
  options: SectionGeneratorSchema
): Promise<NormalizedSchema> {
  const { name, directory, project: projectName } = options;

  assertValidGeneratorNameOption(name, directory, 'section');

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

  const sectionsDirectory = await getSectionsDirectory(options);
  return {
    ...options,
    projectName,
    projectSourceRoot,
    importPath,
    sectionsDirectory,
  };
}

function createSectionFiles(host: Tree, options: NormalizedSchema) {
  const { projectSourceRoot } = options;

  const sectionsDir = joinPathFragments(
    projectSourceRoot,
    options.sectionsDirectory
  );

  const sectionOptions = {
    ...options,
    ...names(options.name),
    template: '',
  };

  assertUniqueLiquidFileNameOption(
    sectionOptions.fileName,
    LiquidFileType.SECTION,
    joinPathFragments(projectSourceRoot, 'theme')
  );

  generateFiles(
    host,
    path.join(__dirname, 'files'),
    sectionsDir,
    sectionOptions
  );

  for (const c of host.listChanges()) {
    let deleteFile = false;

    if (options.skipTests && /.*.spec.ts/.test(c.path)) {
      deleteFile = true;
    }

    if (deleteFile) {
      host.delete(c.path);
    }
  }
}

export async function sectionGenerator(
  host: Tree,
  options: SectionGeneratorSchema
) {
  const normalizedOptions = await normalizeOptions(host, options);

  createSectionFiles(host, normalizedOptions);
  await formatFiles(host);
}

export default sectionGenerator;
export const nxShopifySectionSchematic = convertNxGenerator(sectionGenerator);
