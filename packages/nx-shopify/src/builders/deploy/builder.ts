import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
  scheduleTargetAndForget,
  targetFromTargetString,
} from '@angular-devkit/architect';
import { Observable, of, from } from 'rxjs';
import { catchError, concatMap, map, tap, switchMap } from 'rxjs/operators';
import { runThemekitCommand } from '../../utils/themekit-utils';
import { BuildBuilderOptions } from '../build/schema';
import { DeployBuilderSchema } from './schema';

export function runBuilder(
  options: DeployBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const projectName = context.target?.project;
  if (!projectName) {
    throw new Error('The builder requires a target.');
  }

  const { open, themekitEnv: env = 'development', allowLive = false } = options;

  const buildTarget = targetFromTargetString(options.buildTarget);

  async function setup(): Promise<{
    browserOptions: BuildBuilderOptions;
  }> {
    const browserOptions = (await context.getTargetOptions(
      buildTarget
    )) as BuildBuilderOptions;

    return { browserOptions };
  }

  return from(setup()).pipe(
    switchMap(({ browserOptions }) => {
      const { outputPath } = browserOptions;
      return scheduleTargetAndForget(context, buildTarget, browserOptions).pipe(
        concatMap(() => runThemekitCommand(context, 'version')),
        concatMap(() =>
          runThemekitCommand(
            context,
            'deploy',
            { env, allowLive },
            { cwd: outputPath }
          )
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
          context.logger.error(
            `❌ Failed to deploy ${projectName} theme`,
            info
          );
          return of({
            success: false,
            info,
            error,
          });
        })
      );
    })
  );
}

export default createBuilder(runBuilder);
