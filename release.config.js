/* eslint-disable no-undef */
// npx semantic-release --no-ci --branch=semantic-release-plus --extends=./packages/nx-shopify/release.config.js --debug
const name = 'nx-shopify';
const srcRoot = `packages/${name}`;

module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'latest',
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
  ],
};
