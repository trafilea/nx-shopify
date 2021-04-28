---
title: Using React Components
---

<p align="center">

<img src="/nx-shopify/img/react-logo.png" height="250"/>

</p>

Nx-Shopify leverage from Nx workspaces power and provides customization capabilities in order to integrate technologies like React. The following guide will take you step by step in how to use React components in your Shopify theme in a clean, simple and well-architected way.

## Preparing the workspace

Having Nx-Shopify installed in your Nx workspace, let's generate a theme called `my-theme` to integrate React in it.

```bash
$ nx g @trafilea/nx-shopify:theme my-theme
```

## Installing dependencies

Taking advantage of Nx, we will use the [Nx plugin for React](https://nx.dev/latest/react/react/overview) to integrate react in our Shopify theme.

Install the plugin in your workspace:

```bash
# npm
$ npm install --save-dev @nrwl/react

# yarn
$ yarn add --dev @nrwl/react

# pnpm
$ pnpm add --save-dev @nrwl/react
```

Then initialize the plugin:

```bash
# npm
$ nx generate @nrwl/react:init

$ nx g @nrwl/react:init # same
```

:::tip

Learn more about the usage of the `@nrwl/react` plugin at [Nx docs site](https://nx.dev/latest/react/react/overview)

:::

## Configuring your theme for React

In order to support react components, make sure the following properties are configured in the `apps/my-theme/tsconfig.json` file

```diff title="apps/my-theme/tsconfig.json"
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
+   "jsx": "react-jsx",
+   "allowJs": true, (this one is optional)
+   "esModuleInterop": true,
+   "allowSyntheticDefaultImports": true
  },
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
```

And your `apps/my-theme/tsconfig.app.json` should look similar to this:

```diff title="apps/my-theme/tsconfig.app.json"
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "types": ["node"]
  },
+ "files": [
+   "../../node_modules/@nrwl/react/typings/cssmodule.d.ts",
+   "../../node_modules/@nrwl/react/typings/image.d.ts"
+ ],
  "exclude": ["**/*.spec.ts", "**/*.spec.tsx"],
  "include": ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"]
}
```

Note: set the paths according to your theme's location in the workspace.

Finally, add the `@nrwl/nx/react` eslint plugin to the theme's `.eslintrc.json` config file.

```json {2} title="apps/my-theme/.eslintrc.json"
{
  "extends": ["plugin:@nrwl/nx/react", "../../.eslintrc.json"],
  "ignorePatterns": ["!**/*"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "parserOptions": {
        "project": ["apps/my-theme/tsconfig.*?.json"]
      },
      "rules": {}
    },
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {}
    },
    {
      "files": ["*.js", "*.jsx"],
      "rules": {}
    }
  ]
}
```

---

If you are planning to have react components within your theme project (more info about this below) then create a `.babelrc` file with the following content:

```json title="apps/my-theme/.babelrc"
{
  "presets": [
    [
      "@nrwl/react/babel",
      {
        "runtime": "automatic"
      }
    ]
  ]
}
```

:::info

Depending on your choosen styling option you may need add one (or many) additional plugins to your `.babelrc`.

:::

Next modify your `apps/my-theme/jest.config.js` like the following:

```javascript {5-6} title="apps/my-theme/jest.config.js"
module.exports = {
  displayName: 'my-theme',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/my-theme',
};
```

## Creating your React components

You can make use of the `@nrwl/react` Nx plugin to generate your React components. Where you are going to generate your components depends on your choice, here you have multiple options: generate the components in your theme project, create React libraries or both!

:::warning

When generating your components, you can make use of `SASS` or any `styles in JS (styled-components, emotion, styled-jsx, etc)` styling option. Other styling options are not supported.

:::

### Creating components in your theme project

If you are going to have your components in your theme project you can simply generate them using the nx cli. See the following example:

```bash
nx generate @nrwl/react:component hello-world --project my-theme --export false
nx g @nrwl/react:component foo --project my-theme --export false
nx g @nrwl/react:c bar --project my-theme --export false
```

And this will create the following components

```treeview
apps/my-theme/src/app
├── bar
│   ├── bar.spec.tsx
│   └── bar.tsx
├── foo
│   ├── foo.spec.tsx
│   └── foo.tsx
└── hello-world
    ├── hello-world.spec.tsx
    └── hello-world.tsx
```

Notice that, because of how the `@nrwl/react` plugin works, your React components will live under the `src/app` directory by default. You can specify where do you want your component to be generated with the `--directory` option in the generate command. Example:

```bash
nx generate @nrwl/react:component hello-world --project my-theme --export false --directory components
nx g @nrwl/react:component foo --project my-theme --export false --directory components/example
nx g @nrwl/react:c bar --project my-theme --export false --directory components/example
```

Now your components will be located at

```treeview
apps/my-theme/src/components
├── example
│   ├── bar
│   │   ├── bar.module.scss
│   │   ├── bar.spec.tsx
│   │   └── bar.tsx
│   └── foo
│       ├── foo.module.scss
│       ├── foo.spec.tsx
│       └── foo.tsx
└── hello-world
    ├── hello-world.module.scss
    ├── hello-world.spec.tsx
    └── hello-world.tsx
```

### Creating components in React libraries

Using this approach, you can use the `@nrwl/react` plugin to create React libraries as you would normally do. Let's create a feature lib for our theme that would display a banner on the top of our store.

```bash
nx g @nrwl/react:lib feature-banner --directory my-theme
```

This will create the following library

```treeview
libs
└── my-theme
    └── feature-banner
        ├── jest.config.js
        ├── README.md
        ├── src
        │   ├── index.ts
        │   └── lib
        │       ├── my-theme-feature-banner.module.scss
        │       ├── my-theme-feature-banner.spec.tsx
        │       └── my-theme-feature-banner.tsx
        ├── tsconfig.json
        ├── tsconfig.lib.json
        └── tsconfig.spec.json
```

Then you can generate as many additional components as you need to your react library. Example:

```bash
nx g @nrwl/react:c banner-text --project my-theme-feature-banner
```

And use it in your main lib component

```tsx {4,13} title="libs/my-theme/feature-banner/src/lib/my-theme-feature-banner.tsx"
import React from 'react';

import './my-theme-feature-banner.module.scss';
import BannerText from './banner-text/banner-text';

/* eslint-disable-next-line */
export interface MyThemeFeatureBannerProps {}

export function MyThemeFeatureBanner(props: MyThemeFeatureBannerProps) {
  return (
    <div>
      <h1>Welcome to my-theme-feature-banner!</h1>
      <BannerText></BannerText>
    </div>
  );
}

export default MyThemeFeatureBanner;
```

## Rendering React components in your theme

Now that everything is configured and your React components are ready to be used, it's time to actually render them in your theme.

As your theme code is actually TypeScript (not TSX syntax) creating a wrapper function for your root components can help you easily import them. For the above example:

```tsx {18-20} title="libs/my-theme/feature-banner/src/lib/my-theme-feature-banner.tsx"
import React from 'react';

import './my-theme-feature-banner.module.scss';
import BannerText from './banner-text/banner-text';

/* eslint-disable-next-line */
export interface MyThemeFeatureBannerProps {}

export function MyThemeFeatureBanner(props: MyThemeFeatureBannerProps) {
  return (
    <div>
      <h1>Welcome to my-theme-feature-banner!</h1>
      <BannerText></BannerText>
    </div>
  );
}

export function MyThemeFeatureBannerWrapper(props: MyThemeFeatureBannerProps) {
  return <MyThemeFeatureBanner {...props} />;
}

export default MyThemeFeatureBanner;
```

Now you can call this function to render your component in your `theme-global.module.ts`, a layout TS files, a template TS file, etc... depending on your use case. Let's, for example, render the above component in our `theme` layout.

Add the root element where the component will be rendered in the respective liquid file. For this case, add the following to the `theme.liquid` layout file.

```html {15} title="apps/my-theme/src/theme/layout/theme/theme.liquid"
<!DOCTYPE html>
<html>
  <head>
    <title>{{ page_title }}</title>

    ... {% render 'script-tags' %} {% render 'style-tags' %} {{
    content_for_header }}
    <!-- Header hook for plugins -->
  </head>
  <body>
    <div id="banner-root"></div>

    ...

    <main role="main">{{ content_for_layout }}</main>

    ...

    <script>
      window.addEventListener('DOMContentLoaded', function() {
          window.themeBootstrap({
              themeLayoutName: 'theme',
              themeTemplateName: '{{ template }}',
              themeContext: {% render 'theme-context' %},
              loadGlobal: true,
          });
        });
    </script>
  </body>
</html>
```

Now, import the `render` function from the `react-dom` package and your component wrapper function in the `theme.layout.ts` file.

Next, call the render function and pass the return value of the component wrapper function (that receives the components props) and the root element.

```typescript {2-6,16-21} title="apps/my-theme/src/theme/layout/theme/theme.layout.ts"
import { ThemeModule, ThemeContext, ThemeOnReady } from '@myorg/my-theme/core';
import { render } from 'react-dom';
import {
  MyThemeFeatureBannerWrapper,
  MyThemeFeatureBannerProps,
} from '@myorg/my-theme/feature-banner';

import './theme.layout.scss';

export class ThemeLayout extends ThemeModule implements ThemeOnReady {
  constructor(context: ThemeContext) {
    super(context);
  }

  onReady() {
    const bannerProps: MyThemeFeatureBannerProps = {};

    render(
      MyThemeFeatureBannerWrapper(bannerProps),
      document.getElementById('banner-root')
    );
  }
}
```

Finally, run the serve target to view your theme with your React components working!

```bash
nx serve my-theme -o
```

### Bonus: passing the ThemeContext to React libraries

It may be possible that you would like to have your `ThemeContext` (or part of it) available inside a React library used by your theme.

To achieve this, you can certainly define the typings of your components props object in the react library. However, it may come handy to share a single `ThemeContext` type definition across your theme project and your libraries. Let's go through the process.

First you will need to create a shared library where your `ThemeContext` type definitons are going to live.

```bash
nx g @nrwl/workspace:lib theme-context --directory my-theme/shared
```

You will get a lib structure like the following (you can delete the test files). The `ThemeContext` will be defined in the `my-theme-shared-theme-context.ts` file.

```treeview {8}
libs/my-theme/shared
└── theme-context
    ├── jest.config.js
    ├── README.md
    ├── src
    │   ├── index.ts
    │   └── lib
    │       └── my-theme-shared-theme-context.ts
    ├── tsconfig.json
    ├── tsconfig.lib.json
    └── tsconfig.spec.json
```

Add the type definitions to the `my-theme-shared-theme-context.ts` file:

```typescript title="libs/my-theme/shared/theme-context/src/lib/my-theme-shared-theme-context.ts"
export interface BannerContext {
  globalMessage: string;
}

export interface ThemeContext {
  themeName: string;
  banner?: BannerContext;
}
```

:::note

You can, and perhaps you should, organize the portions of your `ThemeContext` interface in different files according to your needs. Make sure they are exported in the library's `index.ts` file.

:::

Go to the `apps/my-theme/src/core/theme-context.ts` file, remove the current content and export everything from the theme context library.

```typescript title="apps/my-theme/src/core/theme-context.ts"
export * from '@myorg/my-theme/shared/theme-context';
```

The above will make your theme work with the types defined in the library without requiring to change the imports from all of the theme blocks (layouts, templates, sections and snippets).

Go to your React libray and add the `ThemeContext` (or part of it) to your components props type definition and make use of it. Notice the interface is imported from the shared library.

```typescript {5,9,13,18} title="libs/my-theme/feature-banner/src/lib/my-theme-feature-banner.tsx"
import React from 'react';

import './my-theme-feature-banner.module.scss';
import BannerText from './banner-text/banner-text';
import { BannerContext } from '@myorg/my-theme/shared/theme-context';

/* eslint-disable-next-line */
export interface MyThemeFeatureBannerProps {
  banner: BannerContext;
}

export function MyThemeFeatureBanner(props: MyThemeFeatureBannerProps) {
  const { banner } = props;

  return (
    <div>
      <h1>Welcome to my-theme-feature-banner!</h1>
      <BannerText>{banner.globalMessage}</BannerText>
    </div>
  );
}

export function MyThemeFeatureBannerWrapper(props: MyThemeFeatureBannerProps) {
  return <MyThemeFeatureBanner {...props} />;
}

export default MyThemeFeatureBanner;
```

Now back in the `theme.layout.ts` file, you just need to pass the respective context in the component props to the component wrapper function:

```typescript {17-19} title="apps/my-theme/src/theme/layout/theme/theme.layout.ts"
import { ThemeContext, ThemeModule, ThemeOnReady } from '@myorg/my-theme/core';
import {
  MyThemeFeatureBannerProps,
  MyThemeFeatureBannerWrapper,
} from '@myorg/my-theme/feature-banner';
import { render } from 'react-dom';
import './theme.layout.scss';

export class ThemeLayout extends ThemeModule implements ThemeOnReady {
  constructor(context: ThemeContext) {
    super(context);
  }

  onReady() {
    console.log('MyTheme | Theme Layout: onReady() called');

    const bannerProps: MyThemeFeatureBannerProps = {
      banner: this.context.banner,
    };

    render(
      MyThemeFeatureBannerWrapper(bannerProps),
      document.getElementById('banner-root')
    );
  }
}
```

And you're ready to go!
