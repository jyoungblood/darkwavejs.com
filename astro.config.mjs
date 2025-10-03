import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Darkwave",
      components: {
        TwoColumnContent: "/src/components/TwoColumnContent.astro",
        ThemeProvider: "/src/components/ThemeProvider.astro",
        ThemeSelect: "/src/components/ThemeSelect.astro",
      },
      logo: {
        light: "/src/assets/dw-triangles.svg",
        dark: "/src/assets/dw-triangles-white.svg",
        // replacesTitle: true,
      },
      customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"],
      expressiveCode: {
        // Replace the default themes with a custom set of bundled themes:
        // "dracula" (a dark theme) and "solarized-light"
        // themes: ['catppuccin-frappe', 'catppuccin-latte'],
        // themes: ['catppuccin-latte'],
        // themes: ['catppuccin-frappe'],
        themes: ["catppuccin-macchiato"],
      },
      social: [
        {
          label: "GitHub",
          href: "https://github.com/jyoungblood/darkwave",
          icon: "github",
        },
      ],
      sidebar: [
        {
          label: "Documentation",
          // autogenerate: { directory: "docs" },
          items: [
            { label: "Introduction", slug: "docs" },
            { label: "Installation", slug: "docs/installation" },
            { label: "Architecture", slug: "docs/architecture" },
            { label: "Getting Started", slug: "docs/getting-started" },
            { label: "Configuring Services", slug: "docs/configuring" },
            { label: "Troubleshooting", slug: "docs/troubleshooting" },
            { label: "Deployment", slug: "docs/deployment" },
          ],
        },

        {
          label: "Components",
          autogenerate: { directory: "components" },
        },
        {
          label: "Admin",
          autogenerate: { directory: "admin" },
        },
        {
          label: "Field Guide",
          autogenerate: { directory: "fieldguide" },
        },
        {
          label: "Tutorials",
          autogenerate: { directory: "tutorials" },
        },

        {
          label: "Resources",
          autogenerate: { directory: "resources" },
        },
        {
          label: "Project",
          items: [
            { label: "Roadmap", slug: "project/roadmap" },
            { label: "Contributing", slug: "project/contributing" },
          ],
        },
      ],
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://beamanalytics.b-cdn.net/beam.min.js",
            "data-token": "4345c349-059a-42dd-8483-67b7c0730da6",
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