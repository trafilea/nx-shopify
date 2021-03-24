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
        'generators/theme',
        'generators/layout',
        'generators/template',
        'generators/section',
        'generators/snippet',
      ],
    },
    {
      type: 'category',
      label: 'Project Executors',
      items: ['executors/build', 'executors/serve', 'executors/deploy'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/setup-theme-config',
        'guides/multiple-environments',
        'guides/liquid-in-styles',
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
