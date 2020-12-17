import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  url,
} from '@angular-devkit/schematics';
import {
  addProjectToNxJsonInTree,
  names,
  offsetFromRoot,
  projectRootDir,
  ProjectType,
  toFileName,
  updateWorkspace,
} from '@nrwl/workspace';
import { uniq } from '../../utils/output-dir-utils';
import { ThemeSchematicSchema } from './schema';
import init from '../init/schematic';

/**
 * Depending on your needs, you can change this to either `Library` or `Application`
 */
const projectType = ProjectType.Application;

interface NormalizedSchema extends ThemeSchematicSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(options: ThemeSchematicSchema): NormalizedSchema {
  const name = toFileName(options.name);
  const projectDirectory = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
        dot: '.',
      }),
      move(options.projectRoot),
    ])
  );
}

export default function (options: ThemeSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options);

  const { projectName, projectRoot } = normalizedOptions;

  return chain([
    init({
      ...options,
      skipFormat: true,
    }),
    updateWorkspace((workspace) => {
      const project = workspace.projects.add({
        name: projectName,
        root: projectRoot,
        sourceRoot: `${projectRoot}/src`,
        projectType,
      });

      project.targets.add({
        name: 'build',
        builder: '@trafilea/nx-shopify:build',
        options: {
          outputPath: `dist/${projectRootDir(projectType)}/${projectName}`,
          tsConfig: `${projectRoot}/tsconfig.app.json`,
          postcssConfig: `${projectRoot}/postcss.config.js`,
          mediaQueriesConfig: `${projectRoot}/media-queries.config.js`,
          themekitConfig: `${projectRoot}/config.yml`,
          sourceMap: true,
        },
        configurations: {
          production: {
            optimization: true,
            sourceMap: false,
            fileReplacements: [
              {
                replace: 'src/environments/environment.ts',
                with: 'src/environments/environment.prod.ts',
              },
            ],
          },
        },
      });

      project.targets.add({
        name: 'deploy',
        builder: '@trafilea/nx-shopify:deploy',
        options: {
          outputPath: `dist/${projectRootDir(projectType)}/${projectName}`,
        },
        configurations: {
          production: {
            buildConfiguration: 'production',
            themekitEnv: 'production',
          },
        },
      });

      project.targets.add({
        name: 'serve',
        builder: '@trafilea/nx-shopify:serve',
        options: {
          outputPath: `tmp/${uniq(projectName)}`,
        },
        configurations: {
          production: {
            buildConfiguration: 'production',
            themekitEnv: 'production',
          },
        },
      });
    }),
    addProjectToNxJsonInTree(projectName, {
      tags: normalizedOptions.parsedTags,
    }),
    addFiles(normalizedOptions),
  ]);
}
