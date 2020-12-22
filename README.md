<p align="center">

<img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" height="100">

</p>
<h1 align="center">
  Nx-Shopify
</h1>

<div align="center">

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/github/license/trafilea/nx-shopify)](https://github.com/trafilea/nx-shopify/blob/master/LICENSE)
![npm (scoped)](https://img.shields.io/npm/v/@trafilea/nx-shopify)
![npm](https://img.shields.io/npm/dm/@trafilea/nx-shopify)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
</div>

🔎 **A [Nx](https://nx.dev) plugin for developing performance-first Shopify themes.**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@trafilea/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

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
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
