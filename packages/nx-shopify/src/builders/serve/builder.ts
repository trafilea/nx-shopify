import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
  scheduleTargetAndForget,
  targetFromTargetString,
} from '@angular-devkit/architect';
import { merge, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  runThemekitCommand,
  runThemekitWatchPromise,
} from '../../utils/themekit-utils';
import { ServeBuilderSchema } from './schema';

export function runBuilder(
  options: ServeBuilderSchema,
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
    allowLive,
  } = options;

  let isFirstBuild = true;

  const $buildWatch = scheduleTargetAndForget(
    context,
    targetFromTargetString(`${projectName}:build`),
    {
      outputPath,
      buildConfiguration,
      watch: true,
    }
  ).pipe(
    tap(() => {
      if (isFirstBuild) {
        runThemekitWatchPromise(
          context,
          { env, allowLive },
          { cwd: outputPath }
        ).then(() =>
          open
            ? runThemekitCommand(
                context,
                'open',
                { env },
                { cwd: outputPath }
              ).toPromise()
            : null
        );
        isFirstBuild = false;
      }
      context.reportRunning();
    })
  );

  return $buildWatch.pipe(
    catchError((err) => {
      const error = typeof err === 'string' ? err : undefined;
      const info = err && err instanceof Object ? err : undefined;
      context.logger.error(`❌ Failed to serve ${projectName} theme`, info);
      return of({
        success: false,
        info,
        error,
      });
    })
  );
}

export default createBuilder(runBuilder);
