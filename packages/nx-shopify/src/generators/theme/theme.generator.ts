import {
  addProjectConfiguration,
  convertNxGenerator,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  NxJsonProjectConfiguration,
  offsetFromRoot,
  ProjectConfiguration,
  readWorkspaceConfiguration,
  TargetConfiguration,
  Tree,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { join } from 'path';
import { BuildExecutorSchema } from '../../executors/build/schema';
import nxShopifyInitGenerator from '../init/init.generator';
import { ThemeGeneratorSchema } from './schema';

interface NormalizedSchema extends ThemeGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: ThemeGeneratorSchema
): NormalizedSchema {
  const { name, directory, tags } = options;

  const { fileName } = names(name);
  const projectDirectory = directory
    ? `${names(directory).fileName}/${fileName}`
    : fileName;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');

  const { appsDir } = getWorkspaceLayout(tree);

  const projectRoot = `${appsDir}/${projectDirectory}`;
  const parsedTags = tags ? tags.split(',').map((s) => s.trim()) : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function createApplicationFiles(tree: Tree, options: NormalizedSchema) {
  const { projectRoot, name } = options;

  generateFiles(tree, join(__dirname, './files'), projectRoot, {
    ...options,
    ...names(name),
    offsetFromRoot: offsetFromRoot(projectRoot),
    dot: '.',
  });
}

function addBuildTarget(
  project: ProjectConfiguration,
  options: NormalizedSchema
): ProjectConfiguration {
  const { projectRoot } = options;

  const buildOptions: BuildExecutorSchema = {
    outputPath: joinPathFragments('dist', projectRoot),
    tsConfig: joinPathFragments(projectRoot, `tsconfig.app.json`),
    postcssConfig: joinPathFragments(projectRoot, `postcss.config.js`),
    mediaQueriesConfig: joinPathFragments(
      projectRoot,
      `media-queries.config.js`
    ),
    themekitConfig: joinPathFragments(projectRoot, `config.yml`),
    sourceMap: true,
    assets: [joinPathFragments(projectRoot, `src/assets`)],
  };
  const productionBuildOptions: Partial<BuildExecutorSchema> = {
    optimization: true,
    sourceMap: false,
    fileReplacements: [
      {
        replace: joinPathFragments(
          projectRoot,
          `src/environments/environment.ts`
        ),
        with: joinPathFragments(
          projectRoot,
          `src/environments/environment.prod.ts`
        ),
      },
    ],
  };

  return {
    ...project,
    targets: {
      ...project.targets,
      build: {
        executor: '@trafilea/nx-shopify:build',
        outputs: ['{options.outputPath}'],
        options: buildOptions,
        configurations: {
          production: productionBuildOptions,
        },
      },
    },
  };
}

function addServeTarget(
  project: ProjectConfiguration,
  options: NormalizedSchema
) {
  const { projectName } = options;

  const serveTarget: TargetConfiguration = {
    executor: '@trafilea/nx-shopify:serve',
    options: {
      buildTarget: `${projectName}:build`,
    },
    configurations: {
      production: {
        buildTarget: `${projectName}:build:production`,
        themekitEnv: 'production',
      },
    },
  };

  return {
    ...project,
    targets: {
      ...project.targets,
      serve: serveTarget,
    },
  };
}

function addDeployTarget(
  project: ProjectConfiguration,
  options: NormalizedSchema
) {
  const { projectRoot, projectName } = options;

  const deployTarget: TargetConfiguration = {
    executor: '@trafilea/nx-shopify:deploy',
    options: {
      outputPath: joinPathFragments('dist', projectRoot),
      buildTarget: `${projectName}:build`,
    },
    configurations: {
      production: {
        buildTarget: `${projectName}:build:production`,
        themekitEnv: 'production',
      },
    },
  };

  return {
    ...project,
    targets: {
      ...project.targets,
      deploy: deployTarget,
    },
  };
}

function addProject(tree: Tree, options: NormalizedSchema) {
  const { projectRoot, projectName } = options;

  const targets: Record<string, TargetConfiguration> = {};
  let project: ProjectConfiguration & NxJsonProjectConfiguration = {
    projectType: 'application',
    root: projectRoot,
    sourceRoot: joinPathFragments(projectRoot, 'src'),
    tags: options.parsedTags,
    targets,
  };

  project = addBuildTarget(project, options);
  project = addServeTarget(project, options);
  project = addDeployTarget(project, options);

  addProjectConfiguration(tree, projectName, project);

  const workspace = readWorkspaceConfiguration(tree);

  if (!workspace.defaultProject) {
    workspace.defaultProject = projectName;

    updateWorkspaceConfiguration(tree, workspace);
  }
}

export async function themeGenerator(
  tree: Tree,
  options: ThemeGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);

  const tasks: GeneratorCallback[] = [
    await nxShopifyInitGenerator(tree, {
      ...options,
      skipFormat: true,
    }),
  ];

  createApplicationFiles(tree, normalizedOptions);
  addProject(tree, normalizedOptions);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

export default themeGenerator;
export const themeSchematic = convertNxGenerator(themeGenerator);
