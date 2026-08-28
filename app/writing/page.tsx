import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/posts";
import styles from "./writing.module.css";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on front-end engineering, search interfaces and side projects.",
  alternates: { canonical: "/writing/" },
};

export default function WritingIndex() {
  const posts = getPosts();

  return (
    <div className={styles.shell}>
      <header className={styles.head}>
        <p className="eyebrow">Writing</p>
        <h1 className={styles.title}>Notes</h1>
        <p className={styles.intro}>
          Occasional write-ups on front-end engineering, search interfaces and
          whatever I have just broken.
        </p>
      </header>

      {posts.length > 0 ? (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`} className={styles.row}>
                <span className={styles.date}>{formatDate(post.date)}</span>
                <span className={styles.main}>
                  <span className={styles.postTitle}>{post.title}</span>
                  <span className={styles.excerpt}>{post.excerpt}</span>
                </span>
                <span className={styles.reading}>{post.reading}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Nothing published yet.</p>
      )}
    </div>
  );
}
