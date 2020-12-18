import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
  scheduleTargetAndForget,
  targetFromTargetString,
} from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { from, Observable, of } from 'rxjs';
import { catchError, concatMap, skip, switchMap } from 'rxjs/operators';
import { runThemekitCommand } from '../../utils/themekit-utils';
import { BuildBuilderOptions } from '../build/schema';
import { ServeBuilderSchema } from './schema';

const devServerBuildOverriddenKeys: (keyof BuildBuilderOptions)[] = [
  'watch',
  'optimization',
  'analyze',
  'sourceMap',
  'open',
];

export function runBuilder(
  options: ServeBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  const { logger } = context;

  const projectName = context.target?.project;
  if (!projectName) {
    throw new Error('The builder requires a target.');
  }

  const { open, themekitEnv: env = 'development', allowLive = false } = options;

  const buildTarget = targetFromTargetString(options.buildTarget);

  async function setup(): Promise<{
    browserOptions: BuildBuilderOptions;
  }> {
    const rawBrowserOptions = (await context.getTargetOptions(
      buildTarget
    )) as BuildBuilderOptions;

    // Override options we need to override, if defined.
    const overrides = (Object.keys(options) as (keyof ServeBuilderSchema)[])
      .filter(
        (key) =>
          options[key] !== undefined &&
          devServerBuildOverriddenKeys.includes(key)
      )
      .reduce<Partial<BuildBuilderOptions>>(
        (previous, key) => ({
          ...previous,
          [key]: options[key],
        }),
        {}
      );

    const browserOptions = { ...rawBrowserOptions, ...overrides };
    browserOptions.watch = true;

    return { browserOptions };
  }

  const $buildWatch = from(setup()).pipe(
    switchMap(({ browserOptions }) => {
      return scheduleTargetAndForget(context, buildTarget, {
        ...browserOptions,
      }).pipe(
        concatMap((buildEvent, index) => {
          const { outputPath } = browserOptions;

          if (index === 0) {
            if (open) {
              runThemekitCommand(
                context,
                'open',
                { env },
                { cwd: outputPath }
              ).toPromise();
            }

            return runThemekitCommand(
              context,
              'watch',
              { env, allowLive },
              { cwd: outputPath }
            );
          }

          context.reportRunning();
          return of(buildEvent);
        }),
        skip(1)
      );
    })
  );

  return $buildWatch.pipe(
    catchError((err) => {
      const error = typeof err === 'string' ? err : undefined;
      const info = err && err instanceof Object ? err : undefined;
      logger.error(`❌ Failed to serve ${projectName} theme`, info);
      return of({
        success: false,
        info,
        error,
      });
    })
  );
}

export default createBuilder(runBuilder);
