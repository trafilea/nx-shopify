export interface SnippetGeneratorSchema {
  name: string;
  project: string;
  directory?: string;
  tags?: string;
  directory?: string;
  flat?: boolean;
  skipTests?: boolean;
}
