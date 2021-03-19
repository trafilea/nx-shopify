import * as corsMiddleware from 'cors';
import * as express from 'express';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import { isHotUpdateFile } from '../../../webpack/utils';

export class AssetsServerApp {
  webpackDevMiddleware;
  webpackHotMiddleware;

  constructor(compiler) {
    this.webpackDevMiddleware = webpackDevMiddleware(compiler, {
      writeToDisk: (filePath: string) => {
        return !isHotUpdateFile(filePath);
      },
    });

    this.webpackHotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
    });
  }

  buildServer() {
    const app = express();
    app.use(corsMiddleware());
    app.use(this.webpackDevMiddleware);
    app.use(this.webpackHotMiddleware);
    return app;
  }
}
