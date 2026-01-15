import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
// import starlightChangelogs from "starlight-changelogs";
import favicons from "astro-favicons";

// https://astro.build/config
export default defineConfig({
  site: "https://darkwavejs.com",
  integrations: [
    favicons(),
    starlight({
      sidebar: [
        { label: "Introduction", collapsed: true, autogenerate: { directory: "docs" } },
        { label: "Getting Started", collapsed: true, autogenerate: { directory: "getting-started" } },
        { label: "Workflow", collapsed: true, autogenerate: { directory: "workflow" } },
        { label: "Components", collapsed: true, autogenerate: { directory: "components" } },
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
      // customCss: ["./src/styles/styles.css"],
      customCss: ["./src/styles/styles-v0.css"],
      expressiveCode: {
        // Replace the default themes with a custom set of bundled themes:
        // "dracula" (a dark theme) and "solarized-light"
        // themes: ["catppuccin-latte", "catppuccin-frappe"],
        // themes: ['catppuccin-latte'],
        themes: ['catppuccin-frappe'],
        // themes: ["catppuccin-macchiato"],
        styleOverrides: {
          borderRadius: '0.25rem',
          frames: {
            shadowColor: 'transparent',
          },
          // Remove all italic styling
          'code[data-theme]': {
            fontStyle: 'normal',
          },
          'code': {
            fontStyle: 'normal',
          },
        },
      },
      social: [
        {
          label: "GitHub",
          href: "https://github.com/jyoungblood/darkwave",
          icon: "github",
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