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
import { SnippetGeneratorSchema } from './schema';

async function getSnippetsDirectory(options: SnippetGeneratorSchema) {
  const fileName = names(options.name).fileName;
  let baseDir = joinPathFragments('theme', 'snippets');
  if (options.directory) {
    baseDir = joinPathFragments(baseDir, options.directory);
  }
  return options.flat ? baseDir : joinPathFragments(baseDir, fileName);
}

interface NormalizedSchema extends SnippetGeneratorSchema {
  projectName: string;
  projectSourceRoot: string;
  importPath: string;
  snippetsDirectory: string;
}

async function normalizeOptions(
  host: Tree,
  options: SnippetGeneratorSchema
): Promise<NormalizedSchema> {
  const { name, directory, project: projectName } = options;

  assertValidGeneratorNameOption(name, directory, 'snippet');

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

  const snippetsDirectory = await getSnippetsDirectory(options);
  return {
    ...options,
    projectName,
    projectSourceRoot,
    importPath,
    snippetsDirectory,
  };
}

function createSnippetFiles(host: Tree, options: NormalizedSchema) {
  const { projectSourceRoot } = options;

  const snippetsDir = joinPathFragments(
    projectSourceRoot,
    options.snippetsDirectory
  );

  const snippetOptions = {
    ...options,
    ...names(options.name),
    template: '',
  };

  assertUniqueLiquidFileNameOption(
    snippetOptions.fileName,
    LiquidFileType.SNIPPET,
    joinPathFragments(projectSourceRoot, 'theme')
  );

  generateFiles(
    host,
    path.join(__dirname, 'files'),
    snippetsDir,
    snippetOptions
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

export async function snippetGenerator(
  host: Tree,
  options: SnippetGeneratorSchema
) {
  const normalizedOptions = await normalizeOptions(host, options);
  createSnippetFiles(host, normalizedOptions);

  await formatFiles(host);
}

export default snippetGenerator;
export const nxShopifySnippetSchematic = convertNxGenerator(snippetGenerator);
