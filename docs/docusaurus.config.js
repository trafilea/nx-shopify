module.exports = {
  title: 'Nx-Shopify',
  tagline: 'Nx plugin for developing performance-first Shopify themes 🚀',
  url: 'https://trafilea.github.io',
  baseUrl: '/nx-shopify/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'trafilea',
  projectName: 'nx-shopify',
  themeConfig: {
    navbar: {
      title: 'Nx-Shopify',
      logo: {
        alt: 'Nx Shopify Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/trafilea/nx-shopify-examples',
          label: 'Examples',
          position: 'left',
          className: 'header-playground-link',
        },
        {
          href: 'https://github.com/trafilea/nx-shopify',
          label: ' ',
          position: 'right',
          className: 'header-icon-link header-github-link',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'docs/',
            },
            {
              label: 'Installation',
              to: 'docs/installation',
            },
            {
              label: 'Code Generators',
              to: 'docs/generators/layout',
            },
            {
              label: 'Theme Commands',
              to: 'docs/executors/build',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/nx-shopify',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/trafilea',
            },
            {
              label: 'Work with us',
              href: 'https://trafilea.com/careers',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Trafilea, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/trafilea/nx-shopify/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
