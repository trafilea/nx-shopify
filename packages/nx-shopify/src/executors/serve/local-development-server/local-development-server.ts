import * as browserSync from 'browser-sync';
import {
  BrowserSyncInstance,
  Options as BrowserSyncOptions,
} from 'browser-sync';

import { getSSLKeyPath, getSSLCertPath } from './ssl/server-ssl';

export interface LocalDevelopmentServerOptions {
  target: string;
  themeId: string;
  address: string;
  port: number;
  uiPort: number;
}

export class LocalDevelopmentServer {
  target: string;
  themeId: string;
  port: number;
  address: string;
  uiPort: number;
  proxyTarget: string;
  browserSyncInstance: BrowserSyncInstance;
  browserSyncServer: BrowserSyncInstance;

  constructor(options: LocalDevelopmentServerOptions) {
    this.browserSyncInstance = browserSync.create();
    this.target = `https://${options.target}`;
    this.themeId = options.themeId;
    this.port = options.port;
    this.address = options.address;
    this.uiPort = options.uiPort;
    this.proxyTarget =
      this.target +
      (this.themeId === 'live' ? '' : `?preview_theme_id=${this.themeId}`);
  }

  start() {
    const bsConfig: BrowserSyncOptions = {
      port: this.port,
      proxy: {
        target: this.proxyTarget,
        middleware: (req, res, next) => {
          // Shopify sites with redirection enabled for custom domains force redirection
          // to that domain. `?_fd=0` prevents that forwarding.
          // ?pb=0 hides the Shopify preview bar
          const prefix = req.url.indexOf('?') > -1 ? '&' : '?';
          const queryStringComponents = ['_fd=0&pb=0'];

          req.url += prefix + queryStringComponents.join('&');
          next();
        },
      },
      snippetOptions: {
        rule: {
          match: /<\/body>/i,
          fn(snippet, match) {
            return snippet + match;
          },
        },
      },
      https: { key: getSSLKeyPath(), cert: getSSLCertPath() },
      logLevel: 'silent',
      socket: {
        domain: `https://${this.address}:${this.port}`,
      },
      ui: {
        port: this.uiPort,
      },
      open: false,
    };

    return new Promise((resolve) => {
      this.browserSyncServer = this.browserSyncInstance.init(bsConfig, resolve);
    });
  }
}
