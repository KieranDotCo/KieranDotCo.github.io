import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// Dual themes emit --shiki-light / --shiki-dark per token instead of baked
// colours, so Prose.module.css can follow html[data-theme] with no client JS.
// keepBackground: false leaves the surface colour to our own tokens.
const prettyCode: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
  defaultLang: "text",
};

export const mdxOptions: NonNullable<MDXRemoteProps["options"]>["mdxOptions"] = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [rehypePrettyCode, prettyCode],
  ],
};
