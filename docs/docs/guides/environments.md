---
title: Environments
---

When working with `Nx-Shopify` themes, we can think of two kind of environemnts: `Build environments` and `Shopify Themekit environments`.

This guide will explain how to configure and work with each of these environments.

## Build environments

You can define different named build configurations for your theme's `build` target in the `workspace.json` file, such as stage and production, with different default options.

Among the options available for the `@trafilea/nx-shopify:build` executor, the `fileReplacements` option is used to work with multiple environments.

The default generated `build` target contains a **production** configuration that replaces the `environment.ts` content with the one inside `environment.prod.ts`.

```json {21-26} title="workspace.json"
{
  "projects": {
    "my-theme": {
      "targets": {
        "build": {
          "executor": "@trafilea/nx-shopify:build",
          "outputs": ["{options.outputPath}"],
          "options": {
            "outputPath": "dist/apps/my-theme",
            "main": "apps/my-theme/src/main.ts",
            "tsConfig": "apps/my-theme/tsconfig.app.json",
            "postcssConfig": "apps/my-theme/postcss.config.js",
            "themekitConfig": "apps/my-theme/config.yml",
            "sourceMap": true,
            "assets": ["apps/my-theme/src/assets"]
          },
          "configurations": {
            "production": {
              "optimization": true,
              "sourceMap": false,
              "fileReplacements": [
                {
                  "replace": "apps/my-theme/src/environments/environment.ts",
                  "with": "apps/my-theme/src/environments/environment.prod.ts"
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

And the project files look like this:

```treeview
apps/my-theme/src/environments
├── environment.prod.ts
├── environment-schema.ts
└── environment.ts
```

```typescript title="environment-schema.ts"
export interface EnvironmentSchema {
  production: boolean;
}
```

```typescript title="environment.ts"
import { EnvironmentSchema } from './environment-schema';

export const environment: EnvironmentSchema = {
  production: false,
};
```

```typescript title="environment.prod.ts"
import { EnvironmentSchema } from './environment-schema';

export const environment: EnvironmentSchema = {
  production: true,
};
```

That way, you should only import the `environment.ts` file and let the build process select the respective environemnt values.

You can use this file to place any content specific to the environment the theme is being executed in. For example an API url, an analytics service identifier, implement a simple feature flagging system, etc.

## Shopify Themekit environments

The theme's `serve` and `deploy` targets both receive a `themekitEnv` option with the name of the environment where files are going to be deployed to.

These themekit environments are configured in the theme's `config.yml` file (Learn more about how to configure this file [here](https://shopify.dev/tools/theme-kit/configuration-reference#config-file)).

:::important

If no value is passed to the `themekitEnv` option, the default `development` environment will be used.

:::

By default, the `config.example.yml` file (reference configuration) has an additional **production** environment.

```yml title="config.example.yml"
# See https://shopify.github.io/themekit/configuration/ for more about this config file.

development:
  password: <your_password>
  theme_id: '<your_theme_id>'
  store: <you_store_name>.myshopify.com

production:
  password: <your_password>
  theme_id: '<your_theme_id>'
  store: <you_store_name>.myshopify.com
```

That **production** environment is used by the **production** configurations of the theme's `serve` and `deploy` targets.

```json {11,23} title="workspace.json"
{
  "projects": {
    "my-theme": {
      "targets": {
        "serve": {
          "executor": "@trafilea/nx-shopify:serve",
          "options": { "buildTarget": "my-theme:build" },
          "configurations": {
            "production": {
              "buildTarget": "my-theme:build:production",
              "themekitEnv": "production"
            }
          }
        },
        "deploy": {
          "executor": "@trafilea/nx-shopify:deploy",
          "options": {
            "buildTarget": "my-theme:build"
          },
          "configurations": {
            "production": {
              "buildTarget": "my-theme:build:production",
              "themekitEnv": "production"
            }
          }
        }
      }
    }
  }
}
```

You can run these configurations using the nx cli:

```bash
$ nx serve my-theme -c=production
$ nx serve my-theme --prod #same
```

Or you can override the `themekitEnv` by passing it as a cli option:

```bash
$ nx serve my-theme --themekitEnv anotherenv
$ nx serve my-theme --prod --themekitEnv development
```

## Example

Let's configure our theme project for a given situation where we have three different environments and we communicate to a different API data source for each environment.

The environments are:

- `development` (default)
- `staging`
- `production`

This is our default `environment.ts` file (used for the default `development` environment).

```typescript title="environment.ts"
import { EnvironmentSchema } from './environment-schema';

export const environment: EnvironmentSchema = {
  production: false,
  apiUrl: 'https://dev.example.com',
};
```

We will need to create a copy of the `environment.ts` for the `staging` and `production` environments.

```typescript title="environment.staging.ts"
import { EnvironmentSchema } from './environment-schema';

export const environment: EnvironmentSchema = {
  production: false,
  apiUrl: 'https://staging.example.com',
};
```

```typescript title="environment.prod.ts"
import { EnvironmentSchema } from './environment-schema';

export const environment: EnvironmentSchema = {
  production: true,
  apiUrl: 'https://production.example.com',
};
```

Here is how our environments directory would look like:

```treeview
apps/my-theme/src/environments
├── environment-schema.ts
├── environment.prod.ts
├── environment.staging.ts
└── environment.ts
```

Now we just need to import the `environment.ts` file in our code, for example:

```typescript {2,13-19} title="index.template.ts"
import { ThemeModule, ThemeContext, ThemeOnReady } from '@proj/my-theme/core';
import { environment } from '@proj/my-theme/environments/environment';

import './index.template.scss';

export class IndexTemplate extends ThemeModule implements ThemeOnReady {
  constructor(context: ThemeContext) {
    super(context);
  }

  onReady() {
    const { production, apiUrl } = environment;

    if (production) {
      console.log('Hello from production env :)');
    }

    console.log(`apiUrl is: ${apiUrl}`);
  }
}
```

:::important

Remember to always import the deafult `environment.ts` file, contents from other environments will be automatically replaced.

:::

Then, we will need to add each environment to the `config.yml` file:

```yml title="config.example.yml"
# See https://shopify.github.io/themekit/configuration/ for more about this config file.

development:
  password: mydevpass
  theme_id: '123456'
  store: dev-store.myshopify.com

staging:
  password: mystagingpass
  theme_id: '456123'
  store: staging-store.myshopify.com

production:
  password: myprodpass
  theme_id: '654321'
  store: prod-store.myshopify.com
```

:::note

You could configure all themekit envs using the same store but different theme IDs. This depends on your specific case.

:::

Finally, we need to configure our `workspace.json` to use the environments.

```json {18,21-26,28,31-36,44-51,60-67} title="workspace.json"
{
  "projects": {
    "my-theme": {
      "targets": {
        "build": {
          "executor": "@trafilea/nx-shopify:build",
          "outputs": ["{options.outputPath}"],
          "options": {
            "outputPath": "dist/apps/my-theme",
            "main": "apps/my-theme/src/main.ts",
            "tsConfig": "apps/my-theme/tsconfig.app.json",
            "postcssConfig": "apps/my-theme/postcss.config.js",
            "themekitConfig": "apps/my-theme/config.yml",
            "sourceMap": true,
            "assets": ["apps/my-theme/src/assets"]
          },
          "configurations": {
            "staging": {
              "optimization": true,
              "sourceMap": false,
              "fileReplacements": [
                {
                  "replace": "apps/my-theme/src/environments/environment.ts",
                  "with": "apps/my-theme/src/environments/environment.staging.ts"
                }
              ]
            },
            "production": {
              "optimization": true,
              "sourceMap": false,
              "fileReplacements": [
                {
                  "replace": "apps/my-theme/src/environments/environment.ts",
                  "with": "apps/my-theme/src/environments/environment.prod.ts"
                }
              ]
            }
          }
        },
        "serve": {
          "executor": "@trafilea/nx-shopify:serve",
          "options": { "buildTarget": "my-theme:build" },
          "configurations": {
            "staging": {
              "buildTarget": "my-theme:build:staging",
              "themekitEnv": "staging"
            },
            "production": {
              "buildTarget": "my-theme:build:production",
              "themekitEnv": "production"
            }
          }
        },
        "deploy": {
          "executor": "@trafilea/nx-shopify:deploy",
          "options": {
            "buildTarget": "my-theme:build"
          },
          "configurations": {
            "staging": {
              "buildTarget": "my-theme:build:staging",
              "themekitEnv": "staging"
            },
            "production": {
              "buildTarget": "my-theme:build:production",
              "themekitEnv": "production"
            }
          }
        }
      }
    }
  }
}
```

To make use of our environments we can simple run:

```bash
# development

$ nx build my-theme
$ nx serve my-theme
$ nx deploy my-theme

# staging

$ nx build my-theme -c=staging
$ nx serve my-theme --configuration=staging
$ nx deploy my-theme -c=staging

# production

$ nx build my-theme --configuration=production
$ nx serve my-theme -c=production
$ nx deploy my-theme --prod # this alias only works for 'production' named configurations
```

You are ready to make the most out of environments! 🙂
