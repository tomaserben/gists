import { slugify } from "../lib/utils.js";
import fs from "fs";
import path from "path";

const domain = "https://tomaserben.com";
const blogsDir = "src/blogs"; // Path to your blog markdown files

// Function to extract frontmatter from markdown
const extractFrontmatter = (content) => {
  const match = content.match(/^---\n([\s\S]+?)\n---/);
  if (!match) return null;

  const metadata = match[1]
    .split("\n")
    .map((line) => line.split(/:(.+)/).map((x) => x.trim())) // Handle colons properly
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value?.replace(/^['"]|['"]$/g, '') }), {});

  return metadata;
};

// Get all blog posts
const blogPosts = fs
  .readdirSync(blogsDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const content = fs.readFileSync(path.join(blogsDir, file), "utf-8");
    const metadata = extractFrontmatter(content);
    if (!metadata || !metadata.title) return null;

    return {
      title: slugify(metadata.title), // Convert title to a URL slug
      lastmod: metadata.date || new Date().toLocaleDateString(), // Default date if not provided
    };
  })
  .filter(Boolean); // Remove any null values

const staticRoutes = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/blog", priority: "0.7", changefreq: "daily" },
  { loc: "/free-tools/days-until-date", priority: "0.7", changefreq: "monthly" },
  { loc: "/free-tools/image-background-remover", priority: "0.7", changefreq: "monthly" },
  { loc: "/free-tools/image-to-ascii-art", priority: "0.7", changefreq: "monthly" },
];

// Generate XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      ({ loc, priority, changefreq }) => `
    <url>
      <loc>${domain}${loc}</loc>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `
    )
    .join("")}
  ${blogPosts
    .map(
      ({ title, lastmod }) => `
    <url>
      <loc>${domain}/blog/${title}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>
  `
    )
    .join("")}
</urlset>`;

// Write the sitemap file
fs.writeFileSync("static/sitemap.xml", xml, "utf-8");
console.log(`✅ Sitemap generated with ${blogPosts.length} blog posts!`);
