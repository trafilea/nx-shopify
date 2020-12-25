import { JsonObject } from '@angular-devkit/core';

export interface DeployBuilderSchema extends JsonObject {
  outputPath: string;
  buildTarget: string;
  themekitEnv: string;
  open: boolean;
  allowLive: boolean;
}
