import * as themekit from '@shopify/themekit';

export type ThemeKitCommand = 'version' | 'watch' | 'deploy' | 'open';

export type ThemeKitOptions = {
  cwd?: string;
  logLevel?: string;
};

export type ThemeKitFlags = {
  password?: string;
  store?: string;
  themeid?: string;
  env?: string;
  noIgnore?: string;
  allowLive?: boolean;
  ignoredFile?: string;
  ignoredFiles?: string[];
  notify?: string;
  nodelete?: boolean;
  files?: string[];
};

export type ThemekitRunResult = { success: boolean };

export function runThemekitCommand(
  command: ThemeKitCommand,
  flagObj: ThemeKitFlags = {},
  options?: ThemeKitOptions
): Promise<void> {
  return themekit.command(command, flagObj, options);
}
