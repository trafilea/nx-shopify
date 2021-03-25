---
title: Introduction
slug: /
---

<p align="center">

<img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" height="100"/>

</p>
<h1 align="center">
  Nx-Shopify
</h1>

> 🔎 **A [Nx](https://nx.dev) plugin for developing performance-first Shopify themes 🚀**

Be it you need to build a custom Shopify store theme, develop a generic theme or even maintain multiple stores/themes with shared code across them, this Nx plugin helps you power-up your development experience

<hr />

<div align="center">

[![e2e](https://github.com/trafilea/nx-shopify/actions/workflows/e2e.yml/badge.svg)](https://github.com/trafilea/nx-shopify/actions/workflows/e2e.yml)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/github/license/trafilea/nx-shopify)](https://github.com/trafilea/nx-shopify/blob/master/LICENSE)
![npm (scoped)](https://img.shields.io/npm/v/@trafilea/nx-shopify)
![npm](https://img.shields.io/npm/dt/@trafilea/nx-shopify)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

</div>

This Nx Plugin for Shopify contains generators and executors for managing Shopify themes within an Nx workspace. It provides:

- Support for writing themes using [TypeScript](https://www.typescriptlang.org/).
- Out of the box code formatting using Prettier and ESLint.
- Scaffolding for creating new themes with separate configs.
- Scaffolding for creating theme block suchs as layouts, templates, sections and snippets.
- Utilities for working with different application environments & [themekit](https://shopify.dev/tools/theme-kit) environments.

[//]: # '- Integration with libraries such as [Jest](https://jestjs.io/) and Cypress.'

# Get stared

You can quickly jump in with the following commands:

```bash
$ npx create-nx-workspace my-org --preset=empty
$ cd ./my-org
$ npm i -D @trafilea/nx-shopify
$ nx g @trafilea/nx-shopify:theme my-theme
# Configure your apps/my-theme/config.yml file
$ nx serve my-theme
$ nx build my-theme
$ nx deploy my-theme
```

Read more about everything that comes with Nx-Shopify in our documentation.
