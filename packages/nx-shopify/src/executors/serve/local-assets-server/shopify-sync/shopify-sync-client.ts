import { AsyncSeriesHook, SyncHook } from 'tapable';
import { Stats as WebpackStats } from 'webpack';
import { runThemekitCommand, ThemeKitFlags } from '../../../../utils/themekit';

export class ShopifySyncClient {
  skipNextSync: boolean;
  isDeploymentInProgress: boolean;
  filesPendingDeploy: string[];

  hooks = {
    beforeSync: new AsyncSeriesHook<[string[], WebpackStats]>([
      'files',
      'stats',
    ]),
    sync: new SyncHook<[string[], WebpackStats]>(['files', 'stats']),
    syncDone: new SyncHook<[string[], WebpackStats]>(['files', 'stats']),
    afterSync: new AsyncSeriesHook<[string[], WebpackStats]>([
      'files',
      'stats',
    ]),
    syncSkipped: new SyncHook<[string[], WebpackStats]>(['files', 'stats']),
  };

  constructor() {
    this.skipNextSync = false;
    this.isDeploymentInProgress = false;
    this.filesPendingDeploy = [];
  }

  async syncChangedFiles(changedFiles: string[], stats: WebpackStats) {
    if (this.isDeploymentInProgress) {
      this.filesPendingDeploy = [
        ...new Set([...this.filesPendingDeploy, ...changedFiles]),
      ];
      throw new Error('A deployment is already in progress');
    }

    await this.hooks.beforeSync.promise(changedFiles, stats);

    if (changedFiles.length === 0) {
      this.skipNextSync = true;
    }

    if (this.skipNextSync) {
      this.hooks.syncSkipped.call(changedFiles, stats);
    } else {
      this.hooks.sync.call(changedFiles, stats);

      const {
        outputOptions: { path: outputPath },
      } = stats.compilation;

      await this.deployPendingFiles(outputPath);
      this.skipNextSync = false;
      this.hooks.syncDone.call(changedFiles, stats);
    }

    this.hooks.afterSync.promise(changedFiles, stats);

    this.skipNextSync = false;
  }

  async deployPendingFiles(compiledOutputPath: string) {
    const flags: ThemeKitFlags = {
      files: this.filesPendingDeploy,
    };

    await runThemekitCommand('deploy', flags, { cwd: compiledOutputPath });

    this.filesPendingDeploy = [];
    this.isDeploymentInProgress = false;
  }
}
