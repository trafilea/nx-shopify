export interface ServeExecutorSchema {
  buildTarget: string;
  themekitEnv: string;
  open: boolean;
  allowLive: boolean;
  analyze?: boolean;
  skipFirstDeploy: boolean;
  devServerIpAddress: string;
  proxyConfig?: string;
}
