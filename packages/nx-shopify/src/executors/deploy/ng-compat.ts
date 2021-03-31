import { convertNxExecutor } from '@nrwl/devkit';
import { deployExecutor } from './deploy.executor';

export default convertNxExecutor(deployExecutor);
