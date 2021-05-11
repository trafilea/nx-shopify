<p align="center">

<img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="80" height="50">

</p>
<h1 align="center">
  Nx-Shopify
</h1>

<div align="center">

[![e2e](https://github.com/trafilea/nx-shopify/actions/workflows/e2e.yml/badge.svg)](https://github.com/trafilea/nx-shopify/actions/workflows/e2e.yml)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/github/license/trafilea/nx-shopify)](https://github.com/trafilea/nx-shopify/blob/master/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@trafilea/nx-shopify)](https://www.npmjs.com/package/@trafilea/nx-shopify)
[![npm](https://img.shields.io/npm/dt/@trafilea/nx-shopify)](https://www.npmjs.com/package/@trafilea/nx-shopify)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
</div>

> 🔎 **A [Nx](https://nx.dev) plugin for developing performance-first Shopify themes 🚀**

Be it you need to build a custom Shopify store theme, develop a generic theme or even maintain multiple stores/themes with shared code across them, this Nx plugin helps you power-up your development experience

<hr />

## Getting Started

Install the Nx CLI globally

```
# npm
$ npm install --global nx

# yarn
$ yarn add --global nx

# pnpm
$ pnpm install --global nx
```

Create an empty Nx workspace (or use an existing one)

```
$ npx create-nx-workspace my-org --preset=empty
$ cd ./my-org
```

Install the Nx-Shopify plugin as a devDependency

```
# npm
$ npm install --save-dev @trafilea/nx-shopify

# yarn
$ yarn add --save-dev @trafilea/nx-shopify

# pnpm
$ pnpm install --save-dev @trafilea/nx-shopify
```

Generate a Shopify theme using the Nx CLI

```
$ nx generate @trafilea/nx-shopify:theme my-theme
```

Check the generators and executors provided by the plugin

```
$ nx list @trafilea/nx-shopify
```

## Documentation

- 🤓 Read the full documentation on the [docs site](https://trafilea.github.io/nx-shopify)
- 👀 Checkout the [examples workspace](https://github.com/trafilea/nx-shopify-examples)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://sebastiandg7.github.io/"><img src="https://avatars0.githubusercontent.com/u/13395979?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sebastian Duque Gutierrez</b></sub></a><br /><a href="https://github.com/trafilea/nx-shopify/commits?author=sebastiandg7" title="Code">💻</a> <a href="#infra-sebastiandg7" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-sebastiandg7" title="Ideas, Planning, & Feedback">🤔</a> <a href="#blog-sebastiandg7" title="Blogposts">📝</a> <a href="https://github.com/trafilea/nx-shopify/commits?author=sebastiandg7" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.karensantana.co/"><img src="https://avatars1.githubusercontent.com/u/2827260?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Karen Santana</b></sub></a><br /><a href="https://github.com/trafilea/nx-shopify/commits?author=karensantana" title="Code">💻</a> <a href="#ideas-karensantana" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/andisadiazl"><img src="https://avatars1.githubusercontent.com/u/31493497?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andisa Diaz</b></sub></a><br /><a href="https://github.com/trafilea/nx-shopify/commits?author=andisadiazl" title="Code">💻</a></td>
    <td align="center"><a href="https://www.mvuljevas.com/"><img src="https://avatars1.githubusercontent.com/u/14046897?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mauricio Vuljevas</b></sub></a><br /><a href="#ideas-mvuljevas" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/jsalinasvela"><img src="https://avatars2.githubusercontent.com/u/28662284?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jesus Salinas Vela</b></sub></a><br /><a href="#ideas-jsalinasvela" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-jsalinasvela" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/sophiecarreras"><img src="https://avatars0.githubusercontent.com/u/49928680?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sophie</b></sub></a><br /><a href="#projectManagement-sophiecarreras" title="Project Management">📆</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
