import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Darkwave',
          components: {
            TwoColumnContent: '/src/components/TwoColumnContent.astro',
            ThemeProvider: '/src/components/ThemeProvider.astro',
            ThemeSelect: '/src/components/ThemeSelect.astro',
          },
      logo: {
				light: '/src/assets/dw-triangles.svg',
				dark: '/src/assets/dw-triangles-white.svg',
				replacesTitle: true,
			},
      customCss: [
        './src/styles/tailwind.css',
        './src/styles/custom.css',
      ],
      expressiveCode: {
        // Replace the default themes with a custom set of bundled themes:
        // "dracula" (a dark theme) and "solarized-light"
        // themes: ['catppuccin-frappe', 'catppuccin-latte'],
        // themes: ['catppuccin-latte'],
        // themes: ['catppuccin-frappe'],
        themes: ['catppuccin-macchiato'],
      },
      social: [
        {
          label: 'GitHub',
          href: 'https://github.com/jyoungblood/darkwave',
          icon: 'github',
        },
      ],
            sidebar: [
        {
                    label: 'User Manual',
                    items: [
                        { label: 'Introduction', slug: 'manual' },
            { label: 'Installation', slug: 'manual/installation' },
            { label: 'Structure', slug: 'manual/structure' },
            { label: 'Routing & Rendering', slug: 'manual/routing' },
            { label: 'Templates', slug: 'manual/templates' },
            { label: 'Deployment', slug: 'manual/deployment' },
            { label: 'Resources', slug: 'manual/resources' },
                    ],
                },

                {
                	label: 'Misc',
                	autogenerate: { directory: 'misc' },
                },

            ],
            head: [
                {
                    tag: 'script',
                    attrs: {
                        src: 'https://beamanalytics.b-cdn.net/beam.min.js',
                        'data-token': '4345c349-059a-42dd-8483-67b7c0730da6',
                        defer: true,
                    },
                },
            ],
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
});