export interface ThemeGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
  skipFormat?: boolean;
  unitTestRunner: 'jest' | 'none';
  skipTests?: boolean;
}

interface NormalizedSchema extends ThemeGeneratorSchema {
  importPath: string;
  npmScope: string;
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
