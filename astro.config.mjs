import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import starlightThemeBlack from "starlight-theme-black";

// https://astro.build/config
export default defineConfig({
  site: "https://darkwavejs.com",
  integrations: [
    starlight({
      plugins: [
        starlightThemeBlack({
          navLinks: [
            {
              // optional
              label: "Docs",
              link: "/docs",
            },
            {
              label: "Components",
              link: "/components",
            },
            {
              label: "Admin",
              link: "/admin",
            },
            {
              label: "Field Guide",
              link: "/fieldguide",
            },
            {
              label: "Resources",
              link: "/resources",
            },
            {
              label: "Project",
              link: "/project/roadmap",
            },
          ],
          //optional
          footerText:
            "<a href='https://jyoungblood.github.io/'>♥︎ JY</a>",
        }),
      ],

      title: "Darkwave",
      // components: {
      //   TwoColumnContent: "/src/components/TwoColumnContent.astro",
      //   ThemeProvider: "/src/components/ThemeProvider.astro",
      //   ThemeSelect: "/src/components/ThemeSelect.astro",
      // },
      logo: {
        light: "/src/assets/dw-triangles.svg",
        dark: "/src/assets/dw-triangles-white.svg",
        // replacesTitle: true,
      },
      // customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"],
      customCss: ["./src/styles/styles.css"],
      expressiveCode: {
        // Replace the default themes with a custom set of bundled themes:
        // "dracula" (a dark theme) and "solarized-light"
        // themes: ['catppuccin-frappe', 'catppuccin-latte'],
        // themes: ['catppuccin-latte'],
        // themes: ['catppuccin-frappe'],
        // themes: ["catppuccin-macchiato"],
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
            { label: "What is it?", slug: "docs/what" },
            { label: "Ethos", slug: "docs/ethos" },
            { label: "Installation", slug: "docs/installation" },
            { label: "Architecture", slug: "docs/architecture" },
            { label: "Getting Started", slug: "docs/getting-started" },
            { label: "Configuring Services", slug: "docs/configuring" },
            { label: "Troubleshooting", slug: "docs/troubleshooting" },
            { label: "CLI", slug: "docs/cli" },
            { label: "Deployment", slug: "docs/deployment" },
            { label: "Why?", slug: "docs/why" },
            { label: "LLM Ergonomics", slug: "docs/llms" },
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
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/svg+xml",
            href: "/favicon.svg",
          },
        },
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
    // plugins: [tailwindcss()],
  },
});