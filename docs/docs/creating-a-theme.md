---
title: Creating a Theme
---

:::important

If this is your first experience developing Shopify themes, we recommend you to start by reading the basics of Shopify themes development at the [Shopify's Themekit documentation](https://shopify.dev/tools/theme-kit).

:::

## Generating Themes

Generating new themes can be done with the following:

```shell script
$ nx generate @trafilea/nx-shopify:theme <theme-name>
```

This creates the following theme structure:

```treeview
apps
└── my-theme
    ├── browserslist
    ├── config.example.yml
    ├── config.yml
    ├── package.json
    ├── postcss.config.js
    ├── src
    │   ├── assets
    │   │   ├── favicon
    │   │   ├── fonts
    │   │   ├── images
    │   │   └── svg
    │   ├── config
    │   │   ├── settings_data.json
    │   │   └── settings_schema.json
    │   ├── core
    │   ├── locales
    │   │   └── en.default.json
    │   ├── main.ts
    │   ├── theme
    │   │   ├── layout
    │   │   ├── sections
    │   │   ├── snippets
    │   │   └── templates
    │   │       ├── customers
    │   └── typings.d.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    └── tsconfig.spec.json
```

The main.ts content should look similar to this:

```typescript title="src/main.ts"
__webpack_public_path__ = window['__webpack_public_path__'];

import { themeBootstrapFactory } from '@my-org/my-theme/core/theme-bootstrap';
import { themeLayouts } from '@my-org/my-theme/theme/layout';
import { themeTemplates } from '@my-org/my-theme/theme/templates';

window['themeBootstrap'] = themeBootstrapFactory(themeLayouts, themeTemplates);
```

Note that the `@my-org/my-theme` in the import paths are an alias to the `apps/my-theme/src` path configured in your workspace root `tsconfig.base.json` file.

## Theme Configuration

After generating your theme, the next step is to configure the themekit's `apps/my-theme/config.yml` file.

:::tip

To know more about configuring the themekit's `config.yml` file, see the [Themekit Configuration Reference](https://shopify.dev/tools/theme-kit/configuration-reference).

:::

## Theme Commands

When a Shopify theme is added to the workspace.json, the following targets are available for execution:

### build

```bash
$ nx build <theme-name>
```

The build command will compile the application using Webpack. It supports a production configuration by building with the following command:

```bash
$ nx build <theme-name> --configuration=production
$ nx build <theme-name> -c=production # same
```

Additional configurations can be added in the workspace.json. Changing the --configuration flag with the new configuration name will run that config.

For the specific configuration named `production`, nx provides the following alias:

```bash
$ nx build <theme-name> --prod
```

:::info

Learn more about the build command at the [Build Executor](./executors/build) doc.

:::

### serve

```bash
$ nx serve <theme-name>
```

Builds and servers the theme using a local assets server and a runs a BrowserSync instance that proxies your theme preview.

The serve command will run in watch mode. This allows code to be changed, and the theme will be rebuilt automatically.

Different build configurations can be used when serving a theme, they can be configured in the target options inside the `workspace.json` file or using cli options.

:::info

Learn more about the serve command at the [Serve Executor](./executors/serve) doc.

:::

### deploy

```bash
$ nx deploy <theme-name>
```

Deploys the theme's last build to the themekit environment configured in the `apps/<theme-name>/config.yml` file. It will use the `development` environment by default.

:::info

Learn more about the deploy command at the [Deploy Executor](./executors/deploy) doc.

:::
