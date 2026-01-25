import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const docs = await getCollection("docs", ({ data }) => data.status === "published");
  const fieldguide = await getCollection("fieldguide", ({ data }) => data.status === "published");

  // Helper to generate URL from collection entry
  const getUrl = (entry: { collection: string; slug: string }) => {
    const base = `https://darkwavejs.com/${entry.collection}`;
    if (entry.slug === "index") return base;
    if (entry.slug.endsWith("/index")) return `${base}/${entry.slug.replace("/index", "")}`;
    return `${base}/${entry.slug}`;
  };

  const formatEntry = (entry: { data: { title: string }; collection: string; slug: string; body: string }) => {
    return `## ${entry.data.title}

URL: ${getUrl(entry)}

${entry.body}`;
  };

  const content = `# Darkwave Documentation

> Darkwave is a batteries-included toolkit for building data-driven web applications with Astro.
> A meticulously curated selection of reliable and approachable tools, combined into a professional-grade full-stack boilerplate with pre-wired functionality and components for common SaaS and CRUD features.

Site: https://darkwavejs.com
Docs: https://darkwavejs.com/docs
Field Guide: https://darkwavejs.com/fieldguide

---

# Docs

${docs.map(formatEntry).join("\n\n---\n\n")}

---

# Field Guide

${fieldguide.map(formatEntry).join("\n\n---\n\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
