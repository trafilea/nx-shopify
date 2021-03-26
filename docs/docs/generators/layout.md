---
title: Layout Generator
---

Create a theme layout

## Usage

```bash
$ nx generate layout ...
```

```bash
$ nx g l ... # same
```

By default, Nx will search for the `layout` generator in the default collection provisioned in `workspace.json`.

You can specify the collection explicitly as follows:

```bash
$ nx g @trafilea/nx-shopify:layout ...
```

Show what will be generated without writing to disk:

```bash
$ nx g layout ... --dry-run
```

### Examples

Generate a layout in the my-theme theme:

```bash
$ nx g layout my-layout --project=my-theme
```

This creates the following files:

```diff
apps
└── my-theme
    └── src
        └── theme
            ├── layout
+           |   └── my-layout
+           |       ├── my-layout.layout.scss
+           |       ├── my-layout.layout.ts
+           |       └── my-layout.liquid
            ├── sections
            ├── snippets
            └── templates
```

Then you should add the generated layout to the `apps/my-theme/src/theme/layout/theme-layouts.ts` exported `themeLayouts` object so the new layout is loaded in the bootstrap process:

```diff
export const themeLayouts = {
  theme: () => import('./theme/theme.layout').then((m) => m.ThemeLayout),
+ 'my-layout': () => import('./my-layout/my-layout.layout').then((m) => m.MyLayoutLayout),
};
```

:::tip

If want to know more about how the `theme-layouts.ts` file works, head to the [Theme Boostrap Process](../theme-bootstrap) doc

:::

## Options

### --name

Type: `string`

The name of the layout.

### --project

Alias(es): p

Type: `string`

The name of the project.

### --directory

Alias(es): d

Type: `string`

Create the layout under this directory relative to src/theme/layout (can be nested).

### --flat

Default: `false`

Type: `boolean`

Create layout files at the directory root rather than its own directory.
