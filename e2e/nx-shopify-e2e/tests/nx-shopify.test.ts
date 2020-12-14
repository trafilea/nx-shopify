import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('nx-shopify e2e', () => {
  beforeAll(() => {
    ensureNxProject('@trafilea/nx-shopify', 'dist/packages/nx-shopify');
  });

  it('should create nx-shopify', async (done) => {
    const plugin = uniq('nx-shopify');
    await runNxCommandAsync(`generate @trafilea/nx-shopify:theme ${plugin}`);
    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Successfully built');

    done();
  }, 250000);

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('nx-shopify');
      await runNxCommandAsync(
        `generate @trafilea/nx-shopify:theme ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`apps/subdir/${plugin}/config.yml`)
      ).not.toThrow();
      done();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('nx-shopify');
      await runNxCommandAsync(
        `generate @trafilea/nx-shopify:theme ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    }, 120000);
  });
});
