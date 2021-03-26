import { convertNxExecutor } from '@nrwl/devkit';
import { buildExecutor } from './build.executor';

export default convertNxExecutor(buildExecutor);
