---
title: Extend Webpack Configuration
---

With extensibility in mind, the [Build Command](../executors/build) accepts a `--webpackConfig` option containing a path to a function which takes a webpack config, context and returns the resulting webpack config

Here you have an example of a file containing such a function:

```javascript title="apps/my-theme/webpack.custom.js"
const { merge } = require('webpack-merge');

export default function (nxShopifyConfig, { options, configuration }) {
  const myConfig = {
    plugins: [new NewWebpackPlugin()],
  };

  return merge(nxShopifyConfig, myConfig);
}
```

Then you would need to configure the `webpackConfig` option with the `"apps/my-theme/webpack.custom.js"` value.
