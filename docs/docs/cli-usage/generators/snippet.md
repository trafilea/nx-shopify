---
title: Snippet Generator
---

Create a theme snippet

## Usage

```bash
$ nx generate snippet [options,...]
```

```bash
$ nx g snip [options,...] # same
```

By default, Nx will search for the `snippet` generator in the default collection provisioned in `workspace.json`.

You can specify the collection explicitly as follows:

```bash
$ nx g @trafilea/nx-shopify:snippet [options,...]
```

Show what will be generated without writing to disk:

```bash
$ nx g snippet [options,...] --dry-run
```

### Examples

Generate a snippet in the my-theme theme:

```bash
$ nx g snippet my-snippet --project=my-theme
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
+           |   └── my-snippet
+           |       ├── my-snippet.snippet.scss
+           |       ├── my-snippet.snippet.ts
+           |       └── my-snippet.liquid
            └── templates
```

The `my-snippet.snippet.ts` file exports a `MySnippetSnippet` class that now you can import in any other theme block (layout, template, section or other snippet).

## Options

### --name

Type: `string`

The name of the snippet.

### --project

Alias(es): p

Type: `string`

The name of the project where the snippet will be generated.

### --directory

Alias(es): d

Type: `string`

Create the snippet under this directory relative to src/theme/snippets (can be nested).

### --flat

Default: `false`

Type: `boolean`

Create snippet files at the directory root rather than its own directory.
