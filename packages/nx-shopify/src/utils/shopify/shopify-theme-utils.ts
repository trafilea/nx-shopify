import { joinPathFragments } from '@nrwl/devkit';
import * as glob from 'glob';

export const enum LiquidFileType {
  LAYOUT = 'layout',
  TEMPLATE = 'templates',
  SNIPPET = 'snippets',
  SECTION = 'sections',
}

export function getThemeLiquidFiles(
  fileBasename: string,
  liquidFileType: LiquidFileType,
  themeBaseDirectory: string
): string[] {
  const files = glob.sync(
    joinPathFragments(
      themeBaseDirectory,
      liquidFileType,
      '**',
      `${fileBasename}.liquid`
    )
  );
  return files;
}
