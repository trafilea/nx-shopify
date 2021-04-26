module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'introduction',
    },
    {
      type: 'doc',
      id: 'installation',
    },
    {
      type: 'category',
      label: 'Fundamentals',
      items: [
        'fundamentals/creating-a-theme',
        'fundamentals/theme-structure',
        'fundamentals/theme-bootstrap',
      ],
    },
    {
      type: 'category',
      label: 'CLI Usage',
      items: [
        {
          type: 'category',
          label: 'Code Generators',
          items: [
            'cli-usage/generators/layout',
            'cli-usage/generators/template',
            'cli-usage/generators/section',
            'cli-usage/generators/snippet',
          ],
        },
        {
          type: 'category',
          label: 'Theme Commands',
          items: [
            'cli-usage/executors/build',
            'cli-usage/executors/serve',
            'cli-usage/executors/deploy',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/environments',
        'guides/liquid-to-ts-context',
        'guides/liquid-in-styles',
        'guides/using-react',
        'guides/extend-webpack',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        {
          type: 'link',
          label: 'Submit an issue',
          href: 'https://github.com/trafilea/nx-shopify/issues/new/choose',
        },
      ],
    },
  ],
};
