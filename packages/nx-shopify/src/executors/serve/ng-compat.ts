import { convertNxExecutor } from '@nrwl/devkit';
import { serveExecutor } from './serve.executor';

export default convertNxExecutor(serveExecutor);
