import { projects } from "@/data/projects";

/** Post metadata handed in from a server component — lib/posts.ts reads the
 *  filesystem, so it cannot be imported into the client bundle. */
export type PostLink = { slug: string; title: string; excerpt: string };

export type Command = {
  id: string;
  group: "Go to" | "Writing" | "Project" | "Action" | "Link";
  label: string;
  hint?: string;
  keywords?: string;
  run: (ctx: CommandContext) => void;
};

export type CommandContext = {
  jump: (id: string) => void;
  navigate: (href: string) => void;
  openExternal: (href: string) => void;
  toggleTheme: () => void;
  setSystemTheme: () => void;
};

const sections = ["about", "experience", "education", "projects"] as const;

export function buildCommands(posts: PostLink[] = []): Command[] {
  return [
    ...sections.map<Command>((id) => ({
      id: `go-${id}`,
      group: "Go to",
      label: id[0].toUpperCase() + id.slice(1),
      hint: "↵",
      run: (c) => c.jump(id),
    })),
    ...posts.map<Command>((p) => ({
      id: `post-${p.slug}`,
      group: "Writing",
      label: p.title,
      hint: "↵",
      keywords: p.excerpt,
      run: (c) => c.navigate(`/writing/${p.slug}`),
    })),
    ...projects.map<Command>((p) => ({
      id: `project-${p.name}`,
      group: "Project",
      label: p.name,
      hint: "↗",
      keywords: `${p.tag} ${p.blurb}`,
      run: (c) => c.openExternal(p.href),
    })),
    {
      id: "cv",
      group: "Action",
      label: "Download CV (PDF)",
      hint: "↗",
      run: (c) => c.openExternal("/assets/Kieran-Whiteman-CV-Web.pdf"),
    },
    { id: "theme", group: "Action", label: "Toggle theme", hint: "Mod+J", run: (c) => c.toggleTheme() },
    { id: "theme-system", group: "Action", label: "Follow system theme", hint: "auto", run: (c) => c.setSystemTheme() },
    { id: "github", group: "Link", label: "GitHub", hint: "↗", run: (c) => c.openExternal("https://www.github.com/KieranDotCo") },
    { id: "linkedin", group: "Link", label: "LinkedIn", hint: "↗", run: (c) => c.openExternal("https://www.linkedin.com/in/kieran-whiteman-1b577328/") },
    { id: "flickr", group: "Link", label: "Flickr", hint: "↗", run: (c) => c.openExternal("https://www.flickr.com/photos/kierandotco/") },
  ];
}

export function filterCommands(all: Command[], query: string): Command[] {
  const q = query.trim().toLowerCase();
  if (!q) return all;
  return all.filter((c) =>
    `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q)
  );
}
