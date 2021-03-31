---
title: Installation
---

## Prerequisites

You will need to have an Nx workspace created to make use of this tool

:::note

Using Node 12+ and Nx 11+ is recommended

:::

Install the Nx CLI globally

```bash
# npm
$ npm install --global nx

# yarn
$ yarn add --global nx

# pnpm
$ pnpm install --global nx
```

Create an empty Nx workspace (or use an existing one)

```bash
$ npx create-nx-workspace <org-name> --preset=empty
$ cd ./<org-name>
```

Example:

```bash
$ npx create-nx-workspace my-org --preset=empty
$ cd ./my-org
```

---

## Installing the plugin

While in your Nx workspace, install the Nx-Shopify plugin as a devDependency

```bash
# npm
$ npm install --save-dev @trafilea/nx-shopify

# yarn
$ yarn add --save-dev @trafilea/nx-shopify

# pnpm
$ pnpm install --save-dev @trafilea/nx-shopify
```

Check the plugin was successfully installed by using the `nx list` command:

```bash
$ nx list @trafilea/nx-shopify

>  NX  Capabilities in @trafilea/nx-shopify:

  GENERATORS

  init : Initialize plugin
  theme : Generate a new Shopify theme
  layout : Generate a theme layout
  template : Generate a theme template
  snippet : Generate a theme snippet
  section : Generate a theme section

  EXECUTORS/BUILDERS

  build : Build a Shopify theme
  serve : Serves a Shopify theme for local development
  deploy : Deploy a Shopify theme to Shopify
```

Now you are ready to power-up your Shopify theme development experience!
