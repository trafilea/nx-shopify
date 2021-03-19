/* eslint-disable no-undef */
// npx semantic-release --no-ci --branch=semantic-release-plus --extends=./packages/nx-shopify/release.config.js --debug
const name = 'nx-shopify';
const srcRoot = `packages/${name}`;

module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'master',
    'next',
    'next-major',
    { name: 'rc', prerelease: true },
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
  pkgRoot: `dist/${srcRoot}`,
  tagFormat: 'v${version}',
  assets: [`CHANGELOG.md`],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `CHANGELOG.md`,
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        message:
          `chore(release): ${name}` +
          '-v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      'semantic-release-slack-bot',
      {
        notifyOnSuccess: true,
        notifyOnFail: true,
        onSuccessTemplate: {
          text:
            '<!here>\n\n:tada: A new version of `$package_name`  has been released at <$repo_url|$repo_path>!\n\n' +
            '$release_notes\n\n' +
            'The release is available on:\n' +
            '• <https://github.com/trafilea/nx-shopify/releases/tag/v$npm_package_version|GitHub release>\n' +
            '• <https://www.npmjs.com/package/@trafilea/nx-shopify/v/$npm_package_version|npm package>\n\n' +
            'Your <https://github.com/semantic-release/semantic-release|semantic-release> bot',
        },
        markdownReleaseNotes: true,
        branchesConfig: [
          {
            pattern: 'alpha',
            notifyOnFail: false,
          },
        ],
      },
    ],
  ],
};
