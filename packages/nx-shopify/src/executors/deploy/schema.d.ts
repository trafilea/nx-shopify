export interface DeployExecutorSchema {
  outputPath: string;
  buildTarget: string;
  themekitEnv: string;
  open: boolean;
  allowLive: boolean;
}
