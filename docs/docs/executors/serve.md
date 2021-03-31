---
title: Serve Command
---

Serves a theme for local development. Creates a local assets server and proxies the theme preview using a BrowserSync instance.

## Usage

```bash
$ nx serve <theme-name> [options,...]
```

## Configuration

The `serve` command is configured as a project target in the `workspace.json` file at your workspace root. By default, the target configuration should look similar to this:

```json
{
  "projects": {
    "my-theme": {
      "targets": {
        "serve": {
          "executor": "@trafilea/nx-shopify:serve",
          "options": { "buildTarget": "my-theme:build" },
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

The serve target comes with a default `production` configuration that can be executed with:

```bash
nx serve <theme-name> --configuration=production
nx serve <theme-name> --c=production # same
nx serve <theme-name> --prod # same, only works for the 'production' named config
```

You can add additional configurations that define new options or override the ones defined in the default options object.

:::tip

Learn more about Nx targets configurations at the [Nx website](https://nx.dev)

:::

You can also override/define options passing them as CLI arguments, these will take precedence over the `workspace.json` configurations.

Example:

```bash
nx serve <theme-name> --prod --themekitEnv staging
```

## Options

### --buildTarget

Type: `string`

Name of the target to be used in the theme build process.

### --analyze

Type: `boolean`

Analyze the generated bundle and open webpack-bundle-analyzer in the browser

### --themekitEnv

Type: `string`

Name of the themekit config.yml environment to be used in the deployment (default: development)

### --allowLive

Type: `boolean`

Enables making changes to the Shopify Live Theme

### --open

Type: `boolean`

Open theme preview in the broswer when the deployment is done.

### --skipFirstDeploy

Type: `boolean`

Tell if the first deploy should be skipped.

### --devServerIpAddress

Type: `string`

Set the local web server ip address. Valid values are: private (default), public, "interface name", "ip v4/6 address" (default: private)
