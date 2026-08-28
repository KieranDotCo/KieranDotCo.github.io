import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  reading: string;
  body: string;
};

const DIR = path.join(process.cwd(), "content", "writing");

const WORDS_PER_MINUTE = 200;

function readingTime(body: string): string {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

/** Pure so it can be tested without touching the filesystem. */
export function parsePost(file: string, raw: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  const { data, content } = matter(raw);

  for (const field of ["title", "date", "excerpt"] as const) {
    if (typeof data[field] !== "string") {
      throw new Error(`content/writing/${file}: frontmatter "${field}" is required`);
    }
  }

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    reading: readingTime(content),
    body: content,
  };
}

/** Newest first. Runs at build time only — this module touches the filesystem. */
export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => parsePost(file, fs.readFileSync(path.join(DIR, file), "utf8")))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
