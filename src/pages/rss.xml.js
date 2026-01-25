import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");

  // Sort by date (most recent first)
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  // Filter to published only in production
  const isDevelopment = import.meta.env.DEV;
  const filteredPosts = isDevelopment
    ? sortedPosts
    : sortedPosts.filter((post) => post.data.status === "published");

  return rss({
    title: "DarkwaveJS Blog",
    description: "Updates and articles from DarkwaveJS",
    site: context.site,
    items: filteredPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.subtitle,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
