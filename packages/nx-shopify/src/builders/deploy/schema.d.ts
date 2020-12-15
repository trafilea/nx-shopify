import { JsonObject } from '@angular-devkit/core';

export interface DeployBuilderSchema extends JsonObject {
  outputPath: string;
  buildConfiguration: string;
  themekitEnv: string;
  open: boolean;
  allowLive: boolean;
}
