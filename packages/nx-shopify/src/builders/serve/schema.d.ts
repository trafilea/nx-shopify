import { JsonObject } from '@angular-devkit/core';

export interface ServeBuilderSchema extends JsonObject {
  buildTarget: string;
  themekitEnv: string;
  open: boolean;
  allowLive: boolean;
  analyze?: boolean;
}
