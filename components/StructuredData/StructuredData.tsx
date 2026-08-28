import { education, profile } from "@/data/cv";

const SITE = "https://kieran.co";

/** Stable ids so a post's author can point at the Person rather than repeat it. */
export const PERSON_ID = `${SITE}/#person`;

type Json = Record<string, unknown>;

/**
 * `<` is escaped because the payload is injected as raw HTML — the data is ours,
 * but a stray "</script>" in any field would otherwise close the block early.
 */
function Script({ data }: { data: Json }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function PersonSchema() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": PERSON_ID,
        name: profile.name,
        url: SITE,
        image: `${SITE}/img/profile.jpg`,
        jobTitle: profile.role,
        worksFor: {
          "@type": "Organization",
          name: profile.company,
          url: profile.companyUrl,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: education.institution,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location,
        },
        description: profile.intro,
        sameAs: profile.links
          .map((l) => l.href)
          .filter((href): href is string => Boolean(href?.startsWith("http"))),
      }}
    />
  );
}

type PostSchemaProps = {
  title: string;
  description: string;
  date: string;
  slug: string;
};

export function PostSchema({ title, description, date, slug }: PostSchemaProps) {
  const url = `${SITE}/writing/${slug}/`;

  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        datePublished: date,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: `${url}og.png`,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      }}
    />
  );
}
