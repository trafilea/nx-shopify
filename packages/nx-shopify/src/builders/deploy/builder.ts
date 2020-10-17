import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
  scheduleTargetAndForget,
  targetFromTargetString,
} from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { runThemekitCommand } from '../../utils/themekit-utils';
import { DeployBuilderSchema } from './schema';

export function runBuilder(
  options: DeployBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const projectName = context.target?.project;
  if (!projectName) {
    throw new Error('The builder requires a target.');
  }

  const {
    outputPath,
    buildConfiguration,
    open,
    themekitEnv: env = 'development',
  } = options;

  return scheduleTargetAndForget(
    context,
    targetFromTargetString(
      `${context.target.project}:build${
        buildConfiguration ? `:${buildConfiguration}` : ''
      }`
    ),
    { outputPath }
  ).pipe(
    concatMap(() => runThemekitCommand(context, 'version')),
    concatMap(() =>
      runThemekitCommand(context, 'deploy', { env }, { cwd: outputPath })
    ),
    concatMap((themekitRunResult) =>
      open
        ? runThemekitCommand(context, 'open', { env }, { cwd: outputPath })
        : of(themekitRunResult)
    ),
    tap(() => {
      context.logger.info(`🎉 Successfully deployed ${projectName} theme`);
    }),
    map((themekitOutput) => ({
      success: themekitOutput.success,
    })),
    catchError((err) => {
      const error = typeof err === 'string' ? err : undefined;
      const info = err && err instanceof Object ? err : undefined;
      context.logger.error(`❌ Failed to deploy ${projectName} theme`, info);
      return of({
        success: false,
        info,
        error,
      });
    })
  );
}

export default createBuilder(runBuilder);
