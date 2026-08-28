import { describe, expect, it } from "vitest";
import { formatDate, parsePost } from "./posts";

const frontmatter = (extra = "") => `---
title: "A post"
date: "2026-08-28"
excerpt: "One line."
${extra}---

Body text here.
`;

describe("parsePost", () => {
  it("takes the slug from the filename", () => {
    expect(parsePost("some-post.mdx", frontmatter()).slug).toBe("some-post");
  });

  it("reads the required frontmatter", () => {
    const post = parsePost("p.mdx", frontmatter());
    expect(post.title).toBe("A post");
    expect(post.date).toBe("2026-08-28");
    expect(post.excerpt).toBe("One line.");
  });

  it("keeps the body without the frontmatter block", () => {
    expect(parsePost("p.mdx", frontmatter()).body).not.toContain("title:");
    expect(parsePost("p.mdx", frontmatter()).body).toContain("Body text here.");
  });

  it.each(["title", "date", "excerpt"])("throws when %s is missing", (field) => {
    const raw = frontmatter().replace(new RegExp(`^${field}:.*\n`, "m"), "");
    expect(() => parsePost("broken.mdx", raw)).toThrow(
      new RegExp(`"${field}" is required`)
    );
  });

  it("names the offending file in the error", () => {
    const raw = frontmatter().replace(/^title:.*\n/m, "");
    expect(() => parsePost("broken.mdx", raw)).toThrow(/broken\.mdx/);
  });

  it("rounds reading time up to at least a minute", () => {
    expect(parsePost("p.mdx", frontmatter()).reading).toBe("1 min read");
  });

  it("scales reading time with length", () => {
    const long = frontmatter().replace("Body text here.", "word ".repeat(1000));
    expect(parsePost("p.mdx", long).reading).toBe("5 min read");
  });
});

describe("formatDate", () => {
  it("renders a UK short date", () => {
    expect(formatDate("2026-08-28")).toBe("28 Aug 2026");
  });
});
