import {
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
import { assertValidGeneratorNameOption } from '../../utils/themekit';
import { TemplateGeneratorSchema } from './schema';

async function getTemplatesDirectory(options: TemplateGeneratorSchema) {
  const fileName = names(options.name).fileName;
  let baseDir = joinPathFragments('theme', 'templates');
  if (options.directory) {
    baseDir = joinPathFragments(baseDir, options.directory);
  }
  return options.flat ? baseDir : joinPathFragments(baseDir, fileName);
}

interface NormalizedSchema extends TemplateGeneratorSchema {
  projectName: string;
  projectSourceRoot: string;
  importPath: string;
  templatesDirectory: string;
}

async function normalizeOptions(
  host: Tree,
  options: TemplateGeneratorSchema
): Promise<NormalizedSchema> {
  const { name, directory, project: projectName } = options;

  assertValidGeneratorNameOption(name, directory, 'template');

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

  const templatesDirectory = await getTemplatesDirectory(options);
  return {
    ...options,
    projectName,
    projectSourceRoot,
    importPath,
    templatesDirectory: templatesDirectory,
  };
}

function createTemplateFiles(host: Tree, options: NormalizedSchema) {
  const templatesDir = joinPathFragments(
    options.projectSourceRoot,
    options.templatesDirectory
  );

  const templateOptions = {
    ...options,
    ...names(options.name),
    template: '',
  };
  generateFiles(
    host,
    path.join(__dirname, 'files'),
    templatesDir,
    templateOptions
  );
}

export async function templateGenerator(
  host: Tree,
  options: TemplateGeneratorSchema
) {
  const normalizedOptions = await normalizeOptions(host, options);
  createTemplateFiles(host, normalizedOptions);

  await formatFiles(host);
}

export default templateGenerator;
