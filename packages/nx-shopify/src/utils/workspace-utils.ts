import { ExecutorContext, logger } from '@nrwl/devkit';

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
