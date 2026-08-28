export type Role = {
  title: string;
  company: string;
  companyUrl: string;
  logo: string;
  /** Inset the mark inside the tile. Use for logos on a white or transparent
   *  field; marks with their own coloured background bleed to the edge. */
  logoInset?: boolean;
  dates: string;
  summary: string;
  bullets: string[];
  stack: string[];
};

export const roles: Role[] = [
    {
    title: "Senior Software Engineer → Staff Software Engineer",
    company: "Typeset",
    companyUrl: "https://www.typeset.com",
    logo: "/img/logos/typeset.png",
    logoInset: true,
    dates: "July 2023 — Present",
    summary:
      "Typeset is an AI design platform for producing digital content — ebooks, reports, presentations, landing pages and social posts — combining AI-assisted writing and layout with brand theming, stock imagery and built-in hosting. Typeset is now part of SamCart, where I moved from Senior to Staff Software Engineer.",
    bullets: [
      "Redesigned the document editor, reworking the React, Redux and TypeScript authoring surface that every piece of customer content is built in.",
      "Created a headless AI generation pipeline in Node.js and Express, separating content and design generation from the editor so it could be driven independently of the UI.",
      "Developed Pages, a website designer that lets customers lay out and publish full websites alongside their existing documents.",
      "Added document export to PDF and JPEG, so a design made in Typeset can leave the platform as a print-ready file or a flat image.",
    ],
    stack: ["React", "Redux", "TypeScript", "Node.JS", "Express", "MongoDB", "GCP", "GCS", "Posthog"],
  },
  {
    title: "Senior UI Developer → UI Lead",
    company: "SciBite",
    companyUrl: "https://www.scibite.com",
    logo: "/img/logos/scibite.png",
    logoInset: true,
    dates: "January 2020 — July 2023",
    summary:
      "SciBite is an award-winning semantic software company offering an ontology-led approach to transforming unstructured content into machine-readable clean data. Supporting the top 20 pharma with use cases across life sciences, SciBite empowers customers with a suite of fast, flexible, deployable API technologies, making it a critical component in scientific data-led strategies.",
    bullets: [
      "Led the front-end build of SciBite Search, the replacement for an ageing AngularJS product, which resolves medical terms across synonyms so heart attack and myocardial infarction match the same concept.",
      "Led the redesign of TERMite, the named entity recognition engine SciBite was founded on, moving it from jQuery to React on the same patterns and shared code as SciBite Search.",
      "Moved ageing brownfield products onto a greenfield stack of React, Redux, Recoil, Material-UI, Jest and Storybook.",
      "Designed and built the interfaces for our Keycloak authentication system — log-in, account management and the admin console.",
      "Built and maintained the shared packages both products draw on, aligning look, feel and design patterns across SciBite.",
    ],
    stack: [
      "React",
      "Redux",
      "Recoil",
      "Material-UI",
      "Web Components",
      "TypeScript",
      "Jest",
      "Storybook",
      "Keycloak",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "Lucidworks",
    companyUrl: "https://www.lucidworks.com",
    logo: "/img/logos/lw.png",
    dates: "May 2017 — December 2019",
    summary:
      "Twigkit was acquired by Lucidworks in May 2017 where I was promoted to Senior Software Engineer. Lucidworks provides a search platform with ML, AI, pipelines, search applications, dashboards and much more.",
    bullets: [
      "Continued development of Twigkit (rebranded App-Studio) including integrating into the Fusion UI allowing users to build search applications quicker then before.",
      "Worked with a multi-national team to create Lucidworks enterprise search offering using AngularJS, Webpack and LESS.",
      "Led the initial development on a new rapid low code development platform for building interconnected AI and data driven search apps built in Angular 2+ with version control built it.",
      "Led a small development team to develop the Predictive Merchandiser solution to allow customers to merchandise users queries from selecting facets, overriding relevance, boosting, blocking, pinning and burying products.",
    ],
    stack: ["Angular 2+", "AngularJS", "Webpack", "LESS"],
  },
  {
    title: "Front-end Developer",
    company: "Twigkit",
    companyUrl: "http://www.twigkit.com",
    logo: "/img/logos/twigkit.png",
    dates: "October 2015 — May 2017",
    summary:
      "Twigkit provided software to allow customers to build search applications across multiple search platforms from GSA, Solr, Elastic and many more.",
    bullets: [
      "Developed new features and maintained the existing JSP framework for creating search applications.",
      "Developed a framework using AngularJS to allow customers and field engineers to build rich and beautiful search applications and dashboards.",
      "Worked closely with field engineers to ensure our framework met the customers requirements as well as helping to develop custom feature requirements.",
      "Created a documentation site documenting all components of our framework with live examples.",
      "Implemented CI/CD using Travis CI.",
    ],
    stack: ["AngularJS", "JSP", "Travis CI"],
  },
  {
    title: "Developer",
    company: "Willmott Dixon",
    companyUrl: "https://www.willmottdixon.co.uk",
    logo: "/img/logos/wd.png",
    dates: "September 2014 — October 2015",
    summary:
      "I was recruited by Willmott Dixon to expand their growing development team and work on new projects using my experience of AngularJS and Web API. During my time with Willmott Dixon I've implemented an AngularJS/Web API template for future projects and helped members of the team with any issues regarding AngularJS and Web API from directives to testing.",
    bullets: [
      "eProcurement Asset Management — an AngularJS/Web API project supporting purchasing of IT equipment and tracking the assets once they had been purchased. The system links with Dell's API to order items through the web application.",
      "Expenses — previously expenses were done on paper; with this project the goal was to turn the whole process paperless, with attachments, costing and posting to the required HR and Finance systems via APIs and services.",
    ],
    stack: ["AngularJS", "Web API", "C#"],
  },
  {
    title: "Systems Developer",
    company: "North Hertfordshire College",
    companyUrl: "https://www.nhc.ac.uk",
    logo: "/img/logos/nhc.png",
    logoInset: true,
    dates: "June 2012 — September 2014",
    summary:
      "My initial role at the college involved creating and managing reports for different areas of the college using SQL Management Studio and SQL Server Reporting Services. Whilst undertaking the reporting responsibilities I was quickly given my own projects to manage, using ASP.NET MVC, C# and SQL Server to create web applications within the college.",
    bullets: [
      "Creating and managing responsive web applications across 6 projects using MVC and SQL for the 5000 members of North Hertfordshire College.",
      "Analysing user requirements & developing systems that meet their requirements.",
      "Implemented sentiment analysis to identify students who may need additional help or are unhappy on their course.",
    ],
    stack: ["ASP.NET MVC", "C#", "SQL Server", "Bootstrap"],
  },
];

export const education = {
  institution: "University of Hertfordshire",
  award: "Bachelor of Science — Computer Science, Networks",
  grade: "First",
  dates: "September 2009 — June 2012",
};

export type ProfileLinkIcon = "github" | "linkedin" | "flickr";

export type ProfileLink = {
  label: string;
  href: string;
  primary?: boolean;
  icon?: ProfileLinkIcon;
};

export const profile = {
  name: "Kieran Whiteman",
  role: "Staff Software Engineer",
  company: "Typeset",
  companyUrl: "https://www.typeset.com",
  location: "Hertfordshire, UK",
  intro:
    "Software engineer with experience across multiple disciplines, from full stack to purely front-end using technologies such as AngularJS, Angular 2+, Web Components, React, Redux, Recoil, Jasmine, Jest, C# and Java.",
  links: [
    { label: "CV ↓", href: "/assets/Kieran-Whiteman-CV-Web.pdf", primary: true },
    { label: "GitHub", href: "https://www.github.com/KieranDotCo", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kieran-whiteman-1b577328/", icon: "linkedin" },
    { label: "Flickr", href: "https://www.flickr.com/photos/kierandotco/", icon: "flickr" },
  ] as ProfileLink[],
};
