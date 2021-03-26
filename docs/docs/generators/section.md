---
title: Section Generator
---

Create a theme section

## Usage

```bash
$ nx generate section ...
```

```bash
$ nx g sec ... # same
```

By default, Nx will search for the `section` generator in the default collection provisioned in `workspace.json`.

You can specify the collection explicitly as follows:

```bash
$ nx g @trafilea/nx-shopify:section ...
```

Show what will be generated without writing to disk:

```bash
$ nx g section ... --dry-run
```

### Examples

Generate a section in the my-theme theme:

```bash
$ nx g section my-section --project=my-theme
```

This creates the following files:

```diff
apps
└── my-theme
    └── src
        └── theme
            ├── layout
            ├── sections
+           |   └── my-section
+           |       ├── my-section.section.scss
+           |       ├── my-section.section.ts
+           |       └── my-section.liquid
            ├── snippets
            └── templates
```

The `my-section.section.ts` file exports a `MySectionSection` class that now you can import in any other theme block (layout, template, snippet or other section).

## Options

### --name

Type: `string`

The name of the section.

### --project

Alias(es): p

Type: `string`

The name of the project where the section will be generated.

### --directory

Alias(es): d

Type: `string`

Create the section under this directory relative to src/theme/sections (can be nested).

### --flat

Default: `false`

Type: `boolean`

Create section files at the directory root rather than its own directory.
