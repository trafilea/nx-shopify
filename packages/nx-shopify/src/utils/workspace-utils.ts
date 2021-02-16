import { BuilderContext } from '@angular-devkit/architect';
import { ExecutorContext, logger } from '@nrwl/devkit';

export async function getSourceRootNg(
  context: BuilderContext
): Promise<string> {
  const projectMeta = await context.getProjectMetadata(context.target.project);
  if (projectMeta.sourceRoot) {
    return projectMeta.sourceRoot as string;
  } else {
    context.reportStatus('Error');
    const message = `${context.target.project} does not have a sourceRoot. Please define one.`;
    context.logger.error(message);
    throw new Error(message);
  }
}

export async function getSourceRoot(
  context: ExecutorContext,
  projectName: string = null
): Promise<string> {
  projectName = projectName ? projectName : context.projectName;
  const project = context.workspace.projects[projectName];

  if (project.sourceRoot) {
    return project.sourceRoot as string;
  } else {
    const message = `${projectName} does not have a sourceRoot. Please define one.`;
    logger.error(message);
    throw new Error(message);
  }
}

export async function getTargetOptions(
  targetString: string,
  context: ExecutorContext
) {
  const [project, targetName, config] = targetString.split(':');

  const target = context.workspace.projects[project].targets[targetName];
  return config
    ? { ...target.options, ...target.configurations[config] }
    : target.options;
}

export async function getProjectFromTarget(target: string) {
  const [project] = target.split(':');
  return project;
}
