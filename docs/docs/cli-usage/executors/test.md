---
title: Test Command
---

Run unit tests inside a theme

## Usage

```bash
$ nx test <theme-name> [options,...]
```

## Configuration

The `test` command is configured as a project target in the `workspace.json` file at your workspace root. This target is handled by the `@nrwl/jest` plugin, read more about it at the [official docs](https://nx.dev/latest/angular/jest/overview).

