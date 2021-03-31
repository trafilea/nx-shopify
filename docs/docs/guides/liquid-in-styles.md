---
title: Liquid in Styles
---

Shopify has [deprected the use of SaSS in themes](https://www.shopify.com/partners/blog/deprecating-sass). But there are still ways of using Liquid to change the way your styles behave. Here is one simple approach to achieve this:

## Create a css-variables snippet

Create a snippet in `src/theme/snippets/css-variables/css-variables.liquid` where you are going to define all the CSS variables that will be controled by liquid statements (generally settings).

```html title="css-variables.liquid"
<style>
  :root {
    --color-primary: {{ settings.color_primary }};
    --color-secondary: {{ settings.color_secondary }};
  }
</style>
```

Then, render this snippet in the head tag of your layout(s) before the `script-tags` render.

```html {5} title="src/theme/layout/theme/theme.liquid"
<!DOCTYPE html>
<html>
  <head>
    ... {% render 'css-variables' %} {% render 'script-tags'%} ...
  </head>
  <body>
    ...
  </body>
</html>
```

## Initialize your Styles variables

Now, in your style files you can make use of this CSS variables as you need. For example, you can create SASS variables with the CSS variables as their value:

```scss title="src/theme/layout/theme/theme.layout.scss"
$color-primary: var(--color-primary);
$color-secondary: var(--color-primary);

.my_class {
  color: $color-primary;
  background-color: $color-secondary;
}
```
