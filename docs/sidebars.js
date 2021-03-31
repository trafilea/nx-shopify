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
      type: 'doc',
      id: 'creating-a-theme',
    },
    {
      type: 'doc',
      id: 'theme-structure',
    },
    {
      type: 'doc',
      id: 'theme-bootstrap',
    },
    {
      type: 'category',
      label: 'Code Generators',
      items: [
        'generators/layout',
        'generators/template',
        'generators/section',
        'generators/snippet',
      ],
    },
    {
      type: 'category',
      label: 'Theme Commands',
      items: ['executors/build', 'executors/serve', 'executors/deploy'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/environments',
        'guides/liquid-to-ts-context',
        'guides/liquid-in-styles',
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
