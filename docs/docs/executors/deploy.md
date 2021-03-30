---
title: Deploy Command
---

Builds a theme using the specified build target configuration and deploys it to a Shopify theme configured in the thems's `./config.yml` file (`'development'` by default).

## Usage

```bash
$ nx deploy <theme-name> [options,...]
```

## Configuration

The `deploy` command is configured as a project target in the `workspace.json` file at your workspace root. By default, the target configuration should look similar to this:

```json
{
  "projects": {
    "my-theme": {
      "targets": {
        "deploy": {
          "executor": "@trafilea/nx-shopify:deploy",
          "options": {
            "buildTarget": "my-theme:build"
          },
          "configurations": {
            "production": {
              "buildTarget": "my-theme:build:production",
              "themekitEnv": "production"
            }
          }
        }
      }
    }
  }
}
```

The deploy target comes with a default `production` configuration that can be executed with:

```bash
nx deploy <theme-name> --configuration=production
nx deploy <theme-name> --c=production # same
nx deploy <theme-name> --prod # same, only works for the 'production' named config
```

You can add additional configurations that define new options or override the ones defined in the default options object.

:::tip

Learn more about Nx targets configurations at the [Nx website](https://nx.dev)

:::

You can also override/define options passing them as CLI arguments, these will take precedence over the `workspace.json` configurations.

Example:

```bash
nx serve <theme-name> --prod --themekitEnv staging --allowLive
```

## Options

### --buildTarget

Type: `string`

Name of the target to be used in the theme build process.

### --themekitEnv

Type: `string`

Name of the themekit config.yml environment to be used in the deployment ('development' by default) (default: development)

### --allowLive

Type: `boolean`

Enables making changes to the Shopify Live Theme

### --open

Type: `boolean`

Open theme preview in the broswer when the deployment is done.
