---
title: Template Generator
---

Create a theme template

## Usage

```bash
$ nx generate template ...
```

```bash
$ nx g t ... # same
```

By default, Nx will search for the `template` generator in the default collection provisioned in `workspace.json`.

You can specify the collection explicitly as follows:

```bash
$ nx g @trafilea/nx-shopify:template ...
```

Show what will be generated without writing to disk:

```bash
$ nx g template ... --dry-run
```

### Examples

Generate a template in the my-theme theme:

```bash
$ nx g template my-template --project=my-theme
```

This creates the following files:

```diff
apps
└── my-theme
    └── src
        └── theme
            ├── layout
            ├── sections
            ├── snippets
            └── templates
+               └── my-template
+                   ├── my-template.template.scss
+                   ├── my-template.template.ts
+                   └── my-template.liquid
```

Then you should add the generated template to the `apps/my-theme/src/theme/templates/theme-templates.ts` exported `themeTemplates` object so the new template is loaded in the bootstrap process:

```diff title="theme-templates.ts"
export const themeTemplates = {
  ...,
  '404': () => import('./404/404.template').then((m) => m.NotFound404Template),
  index: () => import('./index/index.template').then((m) => m.IndexTemplate),PageTemplate),
  product: () =>
    import('./product/product.template').then((m) => m.ProductTemplate),
+ 'my-template': () =>
+   import('./my-template/my-template.template').then((m) => m.MyTemplateTemplate),
};
```

:::tip

If want to know more about how the `theme-templates.ts` file works, head to the [Theme Boostrap Process](../theme-bootstrap) doc

:::

## Options

### --name

Type: `string`

The name of the template.

### --project

Alias(es): p

Type: `string`

The name of the project where the template will be generated.

### --directory

Alias(es): d

Type: `string`

Create the template under this directory relative to src/theme/templates (can be nested).

### --flat

Default: `false`

Type: `boolean`

Create template files at the directory root rather than its own directory.
