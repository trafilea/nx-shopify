import { resolve } from 'path';
import * as rimraf from 'rimraf';

/**
 * Delete an output directory, but error out if it's the root of the project.
 */
export function deleteOutputDir(root: string, outputPath: string) {
  const resolvedOutputPath = resolve(root, outputPath);
  if (resolvedOutputPath === root) {
    throw new Error('Output path MUST not be project root directory!');
  }

  rimraf.sync(resolvedOutputPath);
}

/**
 * Generate a unique name for running CLI commands
 * @param prefix
 *
 * @returns `'<prefix><random number>'`
 */
export function uniq(prefix) {
  return `${prefix}${Math.floor(Math.random() * 10000000)}`;
}
