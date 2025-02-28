const path = require('path')
const fs = require('fs')

// Change this value to update what the un-versioned docs url should be
const unreleasedTauriVersion = 'v1'
var lastestReleasedVersion

// Checks if Docusaurus has been versioned before and sets versions accordingly
try {
  lastestReleasedVersion = JSON.parse(
    fs.readFileSync('versions.json', 'utf-8')
  )[0]
} catch {
  console.error()
}

var baseUrl =
  process.env.LOCALE === 'en' || process.env.LOCALE == undefined
    ? '/'
    : `/${process.env.LOCALE}/`

const repoUrl = 'https://github.com/tauri-apps/tauri'
const discordUrl = 'https://discord.com/invite/tauri'
const devToUrl = 'https://dev.to/tauri'
const awesomeTauriUrl = 'https://github.com/tauri-apps/awesome-tauri'

const navbarItems = [
  {
    label: 'Guides',
    type: 'docSidebar',
    sidebarId: 'guides',
  },
  {
    label: 'API',
    items: [
      {
        type: 'doc',
        docId: 'api/config',
        label: 'Configuration',
      },
      {
        type: 'doc',
        docId: 'api/cli',
        label: 'CLI',
      },
      {
        type: 'doc',
        docId: 'api/js/modules/app',
        label: 'JavaScript / TypeScript',
      },
      {
        label: 'Rust (via Docs.rs)',
        href: 'https://docs.rs/tauri/1/',
      },
    ],
  },
  {
    label: 'References',
    type: 'docSidebar',
    sidebarId: 'references',
  },

  {
    label: 'Blog',
    to: 'blog',
    position: 'left',
  },
  {
    label: 'Community',
    position: 'left',
    items: [
      {
        label: 'Get Involved',
        href: 'https://github.com/tauri-apps/tauri/blob/dev/.github/CONTRIBUTING.md',
      },
      {
        label: 'Sponsors',
        to: '/#sponsors',
        activeBasePath: 'never-active',
      },
      {
        label: 'Discord',
        href: discordUrl,
      },
      {
        label: 'Awesome Tauri',
        href: awesomeTauriUrl,
      },
    ],
  },
  {
    label: 'About',
    to: 'about/intro',

    items: [
      {
        label: 'What is Tauri?',
        to: 'about/intro',
      },
      {
        label: 'Governance',
        to: 'about/governance',
      },
      {
        label: 'Trademark Guidelines',
        to: 'about/trademark',
      },
      {
        label: 'Get the Book',
        to: 'about/book',
      },
    ],
  },
  {
    label: 'Releases',
    to: 'releases',
    position: 'right',
    className: 'navbarIcon releasesIcon',
  },
  {
    label: 'GitHub',
    href: repoUrl,
    'aria-label': 'GitHub',
    position: 'right',
    className: 'navbarIcon gitHubIcon',
  },
  {
    type: 'localeDropdown',
    position: 'right',
    dropdownItemsAfter: [
      {
        to: 'https://tauri.crowdin.com/documentation',
        label: 'Help us translate',
      },
    ],
  },
  {
    type: 'search',
    position: 'right',
  },
]

const footerLinks = [
  {
    title: 'Repositories',
    items: [
      {
        label: 'Tauri',
        href: repoUrl,
      },
      {
        label: 'Tao',
        href: 'https://github.com/tauri-apps/tao',
      },
      {
        label: 'Wry',
        href: 'https://github.com/tauri-apps/wry',
      },
    ],
  },
  {
    title: 'Contact',
    items: [
      {
        label: 'Mail',
        href: 'mailto:contact@tauri.app',
      },
      {
        label: 'Twitter',
        href: 'https://twitter.com/TauriApps',
      },
    ],
  },
  {
    title: 'Network',
    items: [
      {
        label: 'DevTo Blog',
        href: devToUrl,
      },
      {
        label: 'OpenCollective',
        href: 'https://opencollective.com/tauri',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/tauri-apps',
      },
    ],
  },
  {
    title: 'Community',
    items: [
      {
        label: 'Sponsors',
        to: '/#sponsors',
      },
      {
        label: 'Discord',
        href: discordUrl,
      },
      {
        label: 'Awesome Tauri',
        href: awesomeTauriUrl,
      },
    ],
  },
]

async function siteConfig() {
  const mdxMermaid = await import('mdx-mermaid')
  return {
    title: 'Tauri Apps',
    tagline:
      'Build smaller, faster, and more secure desktop applications with a web frontend',
    organizationName: 'Tauri Apps',
    projectName: 'tauri',
    baseUrl: baseUrl,
    favicon: '/meta/favicon-32x32.png',
    url: 'https://tauri.app',
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'fr', 'ko', 'zh', 'it'],
    },
    themeConfig: {
      prism: {
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/oceanicNext'),
        additionalLanguages: ['rust', 'powershell', 'bash', 'toml'],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        content:
          "<b>🚀 Tauri 1.0 has launched! <a id='announcement-link' href='/blog/2022/06/19/tauri-1-0'>Read the blog post</a></b>",
        backgroundColor: 'var(--ifm-color-primary)',
        textColor: 'var(--ifm-button-color)',
      },
      navbar: {
        hideOnScroll: false,
        logo: {
          alt: 'Tauri Logo',
          src: 'meta/tauri_logo_light.svg',
          srcDark: 'meta/tauri_logo_dark.svg',
        },
        items: navbarItems,
      },

      footer: {
        style: 'dark',
        links: footerLinks,
        copyright: `Copyright © ${new Date().getFullYear()} Tauri Contributors. CC-BY / MIT`,
      },
    },

    presets: [
      [
        '@docusaurus/preset-classic',
        {
          docs: {
            routeBasePath: '/',
            path: './docs/',
            exclude: ['api/rust/**', 'api/js/js-api.json', '**/_*.{md,mdx}'],
            sidebarPath: require.resolve('./sidebars.js'),
            showLastUpdateTime: true,
            editUrl: ({ docPath, versionDocsDirPath }) => {
              if (docPath === "api/cli.md") {
                return 'https://github.com/tauri-apps/tauri/tree/dev/tooling/cli/src';
              } else if (docPath === "api/config.md") {
                return 'https://github.com/tauri-apps/tauri/edit/dev/core/tauri-utils/src/config.rs';
              } else if (docPath.startsWith("api/js")) {
                const mod = docPath.split('/').at(-1).split('.')[0];
                return `https://github.com/tauri-apps/tauri/edit/dev/tooling/api/src/${mod}.ts`;
              } else {
                return `https://github.com/tauri-apps/tauri-docs/edit/dev/${versionDocsDirPath}/${docPath}`;
              }
            },
            sidebarCollapsible: true,
            versions: {
              // Maps the working "current" version to a custom url instead of `next`
              current: {
                label: unreleasedTauriVersion,
                path: unreleasedTauriVersion,
              },
              // If there is a "latest" version, map url to version number
              ...(lastestReleasedVersion && {
                [lastestReleasedVersion]: {
                  label: lastestReleasedVersion,
                  path: lastestReleasedVersion,
                },
              }),
            },
            remarkPlugins: [require('mdx-mermaid')],
            async sidebarItemsGenerator({
              defaultSidebarItemsGenerator,
              ...args
            }) {
              const sidebarItems = await defaultSidebarItemsGenerator(args)
              return sidebarItems.filter(
                (item) =>
                  // This makes sure that the landing pages are not duplicated in the sidebars
                  item.id !== 'guides/readme' && item.id !== 'references/readme'
              )
            },
          },

          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },

          blog: {
            blogSidebarCount: 0,
          },
        },
      ],
    ],
    plugins: [
      path.resolve('./plugins/external-assets'),
      [
        '@docusaurus/plugin-pwa',
        {
          debug: process.env.NODE_ENV === 'development',
          offlineModeActivationStrategies: [
            'appInstalled',
            'standalone',
            'saveData',
          ],
          pwaHead: [
            {
              tagName: 'link',
              rel: 'icon',
              href: '/meta/favicon-96x96.png',
            },
            {
              tagName: 'meta',
              name: 'apple-mobile-web-app-capable',
              content: 'yes',
            },
            {
              tagName: 'link',
              rel: 'apple-touch-icon',
              href: '/meta/favicon-apple-touch-icon.png',
            },
            {
              tagName: 'meta',
              name: 'msapplication-TileImage',
              content: '/meta/favicon-144x144.png',
            },
            {
              tagName: 'link',
              rel: 'manifest',
              href: '/meta/manifest.json',
            },
            {
              tagName: 'meta',
              name: 'theme-color',
              content: '#0F0F0F',
            },
            {
              tagName: 'meta',
              name: 'apple-mobile-web-app-status-bar-style',
              content: '#0F0F0F',
            },
            {
              tagName: 'meta',
              name: 'msapplication-TileColor',
              content: '#0F0F0F',
            },
          ],
        },
      ],
    ],

    webpack: {
      jsLoader: (isServer) => ({
        loader: require.resolve('esbuild-loader'),
        options: {
          loader: 'tsx',
          format: isServer ? 'cjs' : undefined,
          target: isServer ? 'node12' : 'es2017',
        },
      }),
    },
  }
}

module.exports = siteConfig
