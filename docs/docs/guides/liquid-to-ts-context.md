---
title: Liquid To TypeScript Context
---

The `ThemeContext` object is one of the `ShopifyBootstrapOptions` object properties used in the [Theme Bootstrap Process](../theme-bootstrap). The purpose of this object is to make data from Liquid available in the TypeScript context.

## Creation of the ThemeContext

The value of this object comes from the `theme-context.liquid` snippet. The `theme-context.liquid` snippet is rendered in the `src/theme/layout/theme/theme.liquid` layout file.

```html {10} title="src/theme/layout/theme/theme.liquid"
<html>
  ...
  <body>
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

By default, The `ThemeContext` object is defined in the `src/core/theme-context.ts` file that exports an interface with the same name

```typescript title="src/core/theme-context.ts"
export interface ThemeContext {
  themeName: string;
}
```

and it's value, as mentioned above, is created in the `theme-context.liquid` snippet:

```html title="src/theme/snippets/theme-context/theme-context.liquid"
{ themeName: '{{ theme.name }}', }
```

that follows the same structure defined by the `ThemeContext` interface.

## Modifying the ThemeContext

In order add additional data to the `ThemeContext` you just need to follow two steps.

### Modify the `ThemeContext` interface

Add the additional properties to the theme context interface. For example, let's add the product information to the context:

```typescript {1-4,8} title="src/core/theme-context.ts"
export interface ProductContext {
  name: string;
  id: string;
}

export interface ThemeContext {
  themeName: string;
  product?: ProductContext;
}
```

:::caution

You should take into account the data availability when defining your `ThemeContext`, while this context object has the same structure everywhere, not all the data may be avaialble for every template. For example, notice that the product property is optional (see the `?` symbol at the end of the property name) because the product information is not available in every theme template.

:::

### Modify the `theme-context` snippet

Now that you already defined the new properties, create them in the liquid-built object. For our example:

Let's create a `theme-context-product` snippet inside the `theme-context` directory.

```bash
$ nx generate snippet theme-context-product --directory theme-context --project my-theme

CREATE apps/my-theme/src/theme/snippets/theme-context/theme-context-product/theme-context-product.liquid
CREATE apps/my-theme/src/theme/snippets/theme-context/theme-context-product/theme-context-product.snippet.scss
CREATE apps/my-theme/src/theme/snippets/theme-context/theme-context-product/theme-context-product.snippet.ts
```

As we are only going to use the liquid file, we can delete the TypeScript and Styles files.

```bash
$ rm apps/my-theme/src/theme/snippets/theme-context/theme-context-product/theme-context-product.snippet.scss
$ rm apps/my-theme/src/theme/snippets/theme-context/theme-context-product/theme-context-product.snippet.ts
```

This new snippet will be responsible of the newly defined `ProductContext`.

```html title="theme-context-product.liquid"
{% if product %} { name: '{{ product.name }}', id: '{{ product.id }}', } {% else
%} null {% endif %}
```

:::caution

It is very important to follow the exact same type definition made in the `ThemeContext` interface when building the object in the `theme-context.liquid` snippet. If you add additional data that is not in the interface, it will not be available in TypeScript.

:::

Notice that, as the product variable is not always defined we need to provide a null value when is not present.

Finally we need to render the `theme-context-product` snippet in the `theme-context` snippet.

```html title="src/theme/snippets/theme-context/theme-context.liquid"
{ themeName: '{{ theme.name }}', product: {% render 'theme-context-product' %} }
```

That's it! You can structure the `ThemeContext` object as better fits your needs.
