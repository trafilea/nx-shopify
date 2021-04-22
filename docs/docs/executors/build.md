---
title: Build Command
---

Builds a theme to be uploaded to Shopify

## Usage

```bash
$ nx build <theme-name> [options,...]
```

## Configuration

The `build` command is configured as a project target in the `workspace.json` file at your workspace root. By default, the target configuration should look similar to this:

```json
{
  "projects": {
    "my-theme": {
      "targets": {
        "build": {
          "executor": "@trafilea/nx-shopify:build",
          "outputs": ["{options.outputPath}"],
          "options": {
            "outputPath": "dist/apps/my-theme",
            "main": "apps/my-theme/src/main.ts",
            "tsConfig": "apps/my-theme/tsconfig.app.json",
            "postcssConfig": "apps/my-theme/postcss.config.js",
            "themekitConfig": "apps/my-theme/config.yml",
            "sourceMap": true,
            "assets": ["apps/my-theme/src/assets"]
          },
          "configurations": {
            "production": {
              "optimization": true,
              "sourceMap": false,
              "fileReplacements": [
                {
                  "replace": "apps/my-theme/src/environments/environment.ts",
                  "with": "apps/my-theme/src/environments/environment.prod.ts"
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

The build target comes with a default `production` configuration that can be executed with:

```bash
nx build <theme-name> --configuration=production
nx build <theme-name> --c=production # same
nx build <theme-name> --prod # same, only works for the 'production' named config
```

You can add additional configurations that define new options or override the ones defined in the default options object.

:::tip

Learn more about Nx targets configurations at the [Nx website](https://nx.dev)

:::

You can also override/define options passing them as CLI arguments, these will take precedence over the `workspace.json` configurations.

Example:

```bash
nx build <theme-name> --prod --optimization false
```

## Options

### --outputPath

Type: `string`

The output path of the generated files

### --main

Type: `string`

The main application file path

### --tsConfig

Type: `string`

The path to the Typescript configuration file

### --themekitConfig

Type: `string`

The path to the themekit config.yml configuration file

### --postcssConfig

Type: `string`

The path to the PostCSS configuration file

### --watch

Type: `boolean`

Run build when files change

### --poll

Type: `number`

### --vendorChunk

Type: `boolean`

Use a separate bundle containing only vendor libraries. (default: true)

### --commonChunk

Type: `boolean`

Use a separate bundle containing code used across multiple bundles. (default: true)

### --runtimeChunk

Type: `boolean`

Use a separate bundle containing the runtime. (default: true)

### --sourceMap

Type: `boolean`

Produce source maps (default: true)

### --outputHashing

Type: `string`

Configure webpack output hashing (default: none)

| option  | chunk | extract | file | script |
| :------ | :---: | :-----: | :--: | :----: |
| none    |  ❌   |   ❌    |  ❌  |   ❌   |
| media   |  ❌   |   ❌    |  ✅  |   ❌   |
| bundles |  ✅   |   ✅    |  ❌  |   ✅   |
| all     |  ✅   |   ✅    |  ✅  |   ✅   |

### --progress

Type: `boolean`

Log progress to the console while building

### --assets

Type: `Array<string or AssetPattern>`

List of static theme assets (default: [])

```typescript title="AssetPattern"
interface AssetPattern {
  // The pattern to match.
  glob: string;

  //The input directory path in which to apply 'glob'. Defaults to the project root.
  input: string;

  // An array of globs to ignore.
  ignore: Array<string>;

  //Absolute path within the output.
  output: string;
}
```

### --analyze

Type: `boolean`

Analyze the generated bundle and open webpack-bundle-analyzer in the browser

### --statsJson

Type: `boolean`

Generates a 'stats.json' file which can be analyzed using tools such as: #webpack-bundle-analyzer' or https://webpack.github.io/analyse

### --verbose

Type: `boolean`

Emits verbose output

### --extractLicenses

Type: `boolean`

Extract all licenses in a separate file, in the case of production builds only.

### --optimization

Type: `boolean`

Defines the optimization level of the build.

### --showCircularDependencies

Type: `boolean`

Show circular dependency warnings on builds. (default: true)

### --memoryLimit

Type: `number`

Memory limit for type checking service process in MB. (defaults to 2048)

### --fileReplacements

Type: `Array<FileReplacementPattern>`

Replace files with other files in the build. (default: [])

```typescript title="FileReplacementPattern"
interface FileReplacementPattern {
  // File to replace its content.
  replace: string;

  // File with the new content
  with: string;
}
```

### --webpackConfig

Type: `string`

Path to a function which takes a webpack config, context and returns the resulting webpack config. See [Extend Webpack Configuration](../guides/extend-webpack) to learn more.
