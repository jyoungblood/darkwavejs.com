import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import starlightThemeBlack from "starlight-theme-black";
import starlightSidebarTopics from "starlight-sidebar-topics";
// import starlightChangelogs from "starlight-changelogs";
import favicons from "astro-favicons";

// https://astro.build/config
export default defineConfig({
  site: "https://darkwavejs.com",
  integrations: [
    favicons(),
    starlight({
      plugins: [
        // starlightChangelogs(),
        starlightSidebarTopics([
          {
            label: "Introduction",
            link: "/docs/",
            // icon: "open-book",
            // icon: "information",
            items: [
              {
                label: "Introduction",
                autogenerate: { directory: "docs" },
              },
              { label: "Getting Started", autogenerate: { directory: "getting-started" } },
              { label: "Workflow", autogenerate: { directory: "workflow" } },
            ],
          },
          {
            label: "Components",
            link: "/components/",
            items: [
              {
                label: "Components",
                autogenerate: { directory: "components" },
              },
            ],
          },
          {
            label: "Field Guide",
            link: "/fieldguide/",
            items: [
              {
                label: "Field Guide",
                autogenerate: { directory: "fieldguide" },
              },
              { label: "Tutorials", autogenerate: { directory: "tutorials" } },
              { label: "Resources", autogenerate: { directory: "resources" } },
            ],
          },
          {
            label: "Project",
            link: "/project/roadmap/",
            items: [
              {
                label: "Project",
                autogenerate: { directory: "project" },
              },
            ],
          },
        ]),
        // starlightThemeBlack({
        //   navLinks: [
        //     {
        //       // optional
        //       label: "Docs",
        //       link: "/docs",
        //     },
        //     {
        //       label: "Components",
        //       link: "/components",
        //     },
        //     {
        //       label: "Admin",
        //       link: "/admin",
        //     },
        //     {
        //       label: "Field Guide",
        //       link: "/fieldguide",
        //     },
        //     {
        //       label: "Resources",
        //       link: "/resources",
        //     },
        //     {
        //       label: "Project",
        //       link: "/project/roadmap",
        //     },
        //   ],
        //   //optional
        //   footerText: "<a href='https://jonathanyoungblood.com/studio' target='_blank'>♥︎ JY</a>",
        // }),
      ],
      components: {
        // Override the default `Sidebar` component with a custom one.
        Sidebar: "./src/components/SidebarDropdown.astro",
      },

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
        themes: ["catppuccin-latte", "catppuccin-frappe"],
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
      // sidebar: [
      //   {
      //     label: "Documentation",
      //     // autogenerate: { directory: "docs" },
      //     items: [
      //       { label: "Introduction", slug: "docs" },
      //       { label: "What is it?", slug: "docs/what" },
      //       { label: "Ethos", slug: "docs/ethos" },
      //       { label: "Installation", slug: "docs/installation" },
      //       { label: "Architecture", slug: "docs/architecture" },
      //       { label: "Getting Started", slug: "docs/getting-started" },
      //       { label: "Configuring Services", slug: "docs/configuring" },
      //       { label: "Troubleshooting", slug: "docs/troubleshooting" },
      //       { label: "CLI", slug: "docs/cli" },
      //       { label: "Deployment", slug: "docs/deployment" },
      //       { label: "Why?", slug: "docs/why" },
      //       { label: "LLM Ergonomics", slug: "docs/llms" },
      //     ],
      //   },

      //   {
      //     label: "Components",
      //     autogenerate: { directory: "components" },
      //   },
      //   {
      //     label: "Admin",
      //     autogenerate: { directory: "admin" },
      //   },
      //   {
      //     label: "Field Guide",
      //     autogenerate: { directory: "fieldguide" },
      //   },
      //   {
      //     label: "Tutorials",
      //     autogenerate: { directory: "tutorials" },
      //   },

      //   {
      //     label: "Resources",
      //     autogenerate: { directory: "resources" },
      //   },
      //   {
      //     label: "Project",
      //     items: [
      //       { label: "Roadmap", slug: "project/roadmap" },
      //       { label: "Contributing", slug: "project/contributing" },
      //       { label: "Colofon", slug: "project/colofon" },
      //       { label: "Changelog", slug: "project/changelog" },
      //     ],
      //   },
      // ],
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
        // Conditional sidebar display based on current page
        // {
        //   tag: "script",
        //   attrs: {
        //     type: "text/javascript",
        //   },
        //   content: `
        //     // Conditional sidebar display based on current page
        //     document.addEventListener('DOMContentLoaded', function() {
        //       const pathname = window.location.pathname;
        //       const currentSection = pathname.split('/')[1] || 'docs';

        //       const sidebar = document.querySelector('aside.aside');
        //       if (sidebar) {
        //         // Try different selectors to find section headings
        //         const possibleSelectors = ['h2', 'h3', '.sidebar-title', '[class*="title"]', 'strong', 'b'];
        //         let headings = [];

        //         for (const selector of possibleSelectors) {
        //           headings = sidebar.querySelectorAll(selector);
        //           if (headings.length > 0) break;
        //         }

        //         if (headings.length === 0) {
        //           // Look for any elements that might contain section names
        //           const allElements = sidebar.querySelectorAll('*');
        //           headings = Array.from(allElements).filter(el => {
        //             const text = el.textContent?.toLowerCase().trim();
        //             return text && (
        //               text.includes('documentation') ||
        //               text.includes('components') ||
        //               text.includes('tutorials') ||
        //               text.includes('resources') ||
        //               text.includes('project')
        //             );
        //           });
        //         }

        //         headings.forEach((heading) => {
        //           const sectionName = heading.textContent.toLowerCase().trim();
        //           const sectionContainer = heading.closest('div') || heading.parentElement;

        //           if (!sectionContainer) return;

        //           // Determine which section should be visible
        //           let shouldShow = false;

        //           if (currentSection === 'docs' && sectionName.includes('documentation')) {
        //             shouldShow = true;
        //           } else if (currentSection === 'components' && sectionName.includes('components')) {
        //             shouldShow = true;
        //           } else if (currentSection === 'tutorials' && sectionName.includes('tutorials')) {
        //             shouldShow = true;
        //           } else if (currentSection === 'resources' && sectionName.includes('resources')) {
        //             shouldShow = true;
        //           } else if (currentSection === 'project' && sectionName.includes('project')) {
        //             shouldShow = true;
        //           }

        //           if (shouldShow) {
        //             sectionContainer.setAttribute('data-section-visible', 'true');
        //           } else {
        //             sectionContainer.setAttribute('data-section-hidden', 'true');
        //           }
        //         });
        //       }
        //     });
        //   `,
        // },
      ],
    }),
  ],
  vite: {
    // plugins: [tailwindcss()],
  },
});