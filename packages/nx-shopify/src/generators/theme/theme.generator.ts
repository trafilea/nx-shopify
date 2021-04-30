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
  updateJson,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { join } from 'path';
import { BuildExecutorSchema } from '../../executors/build/schema';
import { assertValidGeneratorNameOption } from '../../utils/generator-utils';
import nxShopifyInitGenerator from '../init/init.generator';
import { addJest } from './lib/add-jest';
import { NormalizedSchema, ThemeGeneratorSchema } from './schema';

function normalizeOptions(
  tree: Tree,
  options: ThemeGeneratorSchema
): NormalizedSchema {
  const { name, directory, tags } = options;

  assertValidGeneratorNameOption(name, directory, 'theme');

  const { fileName } = names(name);
  const projectDirectory = directory
    ? `${names(directory).fileName}/${fileName}`
    : fileName;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');

  const { appsDir, npmScope } = getWorkspaceLayout(tree);

  const projectRoot = `${appsDir}/${projectDirectory}`;
  const parsedTags = tags ? tags.split(',').map((s) => s.trim()) : [];
  const importPath = `@${npmScope}/${projectDirectory}`;

  return {
    ...options,
    importPath,
    npmScope,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function createApplicationFiles(host: Tree, options: NormalizedSchema) {
  const { projectRoot, name, npmScope, importPath } = options;

  generateFiles(host, join(__dirname, './files'), projectRoot, {
    ...options,
    ...names(name),
    offsetFromRoot: offsetFromRoot(projectRoot),
    dot: '.',
    npmScope,
    importPath,
  });

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

function addBuildTarget(
  project: ProjectConfiguration,
  options: NormalizedSchema
): ProjectConfiguration {
  const { projectRoot } = options;
  const { sourceRoot } = project;

  const buildOptions: BuildExecutorSchema = {
    outputPath: joinPathFragments('dist', projectRoot),
    main: joinPathFragments(sourceRoot, `main.ts`),
    tsConfig: joinPathFragments(projectRoot, `tsconfig.app.json`),
    postcssConfig: joinPathFragments(projectRoot, `postcss.config.js`),
    themekitConfig: joinPathFragments(projectRoot, `config.yml`),
    sourceMap: true,
    assets: [joinPathFragments(projectRoot, `src/assets`)],
  };
  const productionBuildOptions: Partial<BuildExecutorSchema> = {
    optimization: true,
    sourceMap: false,
    outputHashing: 'all',
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
  const { projectRoot, projectName } = options;

  const serveTarget: TargetConfiguration = {
    executor: '@trafilea/nx-shopify:serve',
    options: {
      buildTarget: `${projectName}:build`,
      proxyConfig: `${projectRoot}/proxy.conf.json`,
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
  const { projectName } = options;

  const deployTarget: TargetConfiguration = {
    executor: '@trafilea/nx-shopify:deploy',
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
      deploy: deployTarget,
    },
  };
}

function updateRootTsConfig(host: Tree, options: NormalizedSchema) {
  updateJson(host, 'tsconfig.base.json', (json) => {
    const { name, importPath, projectRoot } = options;

    const compilerOptions = json.compilerOptions;
    compilerOptions.paths = compilerOptions.paths || {};
    delete compilerOptions.paths[name];

    if (compilerOptions.paths[importPath]) {
      throw new Error(
        `You already have a library using the import path "${importPath}". Make sure to specify a unique one.`
      );
    }

    compilerOptions.paths[`${importPath}/*`] = [
      joinPathFragments(projectRoot, './src/*'),
    ];

    return json;
  });
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

  createApplicationFiles(tree, normalizedOptions);
  updateRootTsConfig(tree, normalizedOptions);
  addProject(tree, normalizedOptions);

  const tasks: GeneratorCallback[] = [
    await nxShopifyInitGenerator(tree, {
      ...options,
      skipFormat: true,
    }),
    await addJest(tree, normalizedOptions),
  ];

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

export default themeGenerator;
export const nxShopifyThemeSchematic = convertNxGenerator(themeGenerator);
