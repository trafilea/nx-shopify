# Contributing to Nx-Shopify

We would love for you to contribute to Nx-Shopify! Read this document to see how to do it.

## How to Get Started Video

Watch this 5-minute video to learn how Nx plugin development works:

<a href="https://www.youtube.com/watch?v=fC1-4fAZDP4" target="_blank">
<p style="text-align: center;"><img src="https://img.youtube.com/vi/fC1-4fAZDP4/0.jpg" width="600"></p>
</a>

https://youtu.be/fC1-4fAZDP4

## Got a Question?

We are trying to keep GitHub issues for bug reports and feature requests. Using the `nx-shopify` tag on [Stack Overflow](https://stackoverflow.com/questions/tagged/nx-shopify) is a much better place to ask general questions about how to use Nx-Shopify.

## Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can help us by [submitting an issue](#submit-issue) to [our GitHub Repository](https://github.com/trafilea/nx-shopify). Even better, you can [submit a Pull Request](#submit-pr) with a fix.

## Project Structure

Source code and documentation are included in the top-level folders listed below.

- `docs` - Markdown and configuration files for documentation including tutorials and guides for the plugin.
- `e2e` - E2E tests.
- `packages` - Source code for Nx-Shopify package including generators and executors (or builders).
- `tools` - Miscellaneous scripts for project tasks such as building documentation, testing, and code formatting.
- `tmp` - Folder used by e2e tests. If you are a WebStorm user, make sure to mark this folder as excluded.

## Building the Project

After cloning the project to your machine, to install the dependencies, run:

```bash
yarn
```

To build the package, run:

```bash
yarn build nx-shopify
```

### Running E2E Tests

To make sure your changes do not break any E2E tests, run:

```bash
yarn e2e nx-shopify-e2e
```

### Developing on Windows

To build Nx-Shopify on Windows, you need to use WSL.

- Run `yarn install` in WSL. Yarn will compile several dependencies. If you don't run `install` in WSL, they will be compiled for Windows.
- Run `yarn e2e` and other commands in WSL.

## Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker. An issue for your problem may already exist and has been resolved, or the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. Having a reproducible scenario gives us wealth of important information without going back and forth with you requiring additional information, such as:

- the output of `nx report`
- `yarn.lock` or `package-lock.json`
- and most importantly - a use-case that fails

A minimal reproduction allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem.

We will be insisting on a minimal reproduction in order to save maintainers time and ultimately be able to fix more bugs. Interestingly, from our experience, users often find coding problems themselves while preparing a minimal repository. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

You can file new issues by filling out our [issue form](https://github.com/trafilea/nx-shopify/issues/new).

### <a name="submit-pr"></a> Submitting a PR

Please follow the following guidelines:

- Make sure e2e tests pass (`yarn e2e nx-shopify-e2e`)
- Make sure you run `yarn format`
- Update your commit message to use the commitizen wizzard (use `yarn commit` to automate compliance)
  - `yarn check-commit` will check to make sure your commit messages are formatted correctly

#### Commitizen

To simplify and automate the process of committing with this format,
**Nx-Shopify is a [Commitizen](https://github.com/commitizen/cz-cli) friendly repository**, just do `git add` and execute `yarn commit`.
