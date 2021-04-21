export interface AssetObj {
  input: string;
  output: string;
  glob: string;
  ignore?: string;
}

export type SourceMapOptions = 'source-map' | 'inline-source-map';

export interface FileReplacement {
  replace: string;
  with: string;
}

export type Asset = string | AssetObj;
export interface BuildExecutorSchema {
  outputPath: string;
  main: string;
  tsConfig: string;
  postcssConfig: string;
  themekitConfig: string;

  watch?: boolean;
  sourceMap?: boolean | SourceMapOptions;
  outputHashing?: string;
  optimization?: boolean | OptimizationOptions;
  showCircularDependencies?: boolean;
  memoryLimit?: number;
  poll?: number;

  fileReplacements?: FileReplacement[];
  assets?: Array<Asset>;

  progress?: boolean;
  analyze?: boolean;
  statsJson?: boolean;
  extractLicenses?: boolean;
  verbose?: boolean;

  webpackConfig?: string;

  root?: string;
  sourceRoot?: Path;
}
