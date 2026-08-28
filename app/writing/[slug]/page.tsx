import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Prose } from "@/components/Prose";
import { mdxOptions } from "@/lib/mdx";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import styles from "./post.module.css";

type Params = { slug: string };

// output: "export" needs every route enumerated at build time.
export function generateStaticParams(): Params[] {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className={styles.shell}>
      <Link href="/writing" className={styles.back}>
        ← All writing
      </Link>

      <header className={styles.head}>
        <div className={styles.meta}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.reading}</span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.lede}>{post.excerpt}</p>
      </header>

      <Prose>
        <MDXRemote source={post.body} options={{ mdxOptions }} />
      </Prose>
    </article>
  );
}
