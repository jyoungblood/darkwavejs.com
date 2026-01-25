import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import favicons from "astro-favicons";

// https://astro.build/config
export default defineConfig({
  site: "https://darkwavejs.com",
  integrations: [
    favicons(),
    expressiveCode({
      themes: [
        // "dracula",
        // "synthwave-84",
        // "poimandres",
        // "catppuccin-macchiato",
        // "dracula-soft",
        // "houston",
        // "kanagawa-dragon",
        // "kanagawa-wave",
        // "laserwave",
        // "night-owl",
        "nord", // **
        // "rose-pine",
        // 'tokyo-night'
        // "vitesse-black",
        // "vesper",
      ],
      styleOverrides: {
        codeFontFamily:
          // '"Source Code Pro Variable", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
          '"Inconsolata Variable", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
        codeFontWeight: "400",
        codeFontSize: "0.95rem",
        codeLineHeight: "1.5",
        frames: {
          inlineButtonBorderOpacity: "0",
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    // plugins: [tailwindcss()],
  },
});
