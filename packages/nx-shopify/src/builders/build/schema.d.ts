import { JsonObject } from '@angular-devkit/core';

export interface AssetObj {
  input: string;
  output: string;
  glob: string;
  ignore?: string;
}

export type SourceMapOptions = 'source-map' | 'inline-source-map';

export type Asset = string | AssetObj;
export interface BuildBuilderOptions extends JsonObject {
  outputPath: string;
  tsConfig: string;
  postcssConfig: string;
  themekitConfig: string;

  watch?: boolean;
  sourceMap?: boolean | SourceMapOptions;
  optimization?: boolean | OptimizationOptions;
  showCircularDependencies?: boolean;
  memoryLimit?: number;
  poll?: number;

  fileReplacements?: FileReplacement[];
  assets?: Array<Asset>;

  progress?: boolean;
  statsJson?: boolean;
  extractLicenses?: boolean;
  verbose?: boolean;

  webpackConfig?: string;

  root?: string;
  sourceRoot?: Path;
}

export interface FileReplacement {
  replace: string;
  with: string;
}
