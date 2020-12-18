import { DeployBuilderSchema } from '../deploy/schema';

export interface ServeBuilderSchema extends DeployBuilderSchema {
  buildTarget: string;
  analyze?: boolean;
}
