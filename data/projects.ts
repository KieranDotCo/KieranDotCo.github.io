export type Project = {
  name: string;
  tag: string;
  href: string;
  repo?: string;
  blurb: string;
};

export const projects: Project[] = [
  {
    name: "What's The Score?",
    tag: "Connect IQ",
    href: "https://github.com/KieranDotCo/whats-the-score",
    repo: "https://github.com/KieranDotCo/whats-the-score",
    blurb:
      "\"What's the score?\" is a simple Garmin Connect-IQ app designed for the Forerunner 230. Tracks the score of a two team game.",
  },
  {
    name: "Angular Dencoder",
    tag: "Angular",
    href: "https://kieran.co/dencoder/",
    repo: "https://github.com/KieranDotCo/dencoder",
    blurb: "A simple Angular website for decoding and encoding URL's. Inspired by meyerweb's URL decoder and encoder.",
  },
  {
    name: "React Dencoder",
    tag: "React",
    href: "https://kieran.co/react-dencoder/",
    repo: "https://github.com/KieranDotCo/react-dencoder",
    blurb: "A simple React website for decoding and encoding URL's. Inspired by meyerweb's URL decoder and encoder.",
  },
  {
    name: "React Snackbar With Recoil",
    tag: "Recoil",
    href: "https://kieran.co/snackbar-recoil/",
    repo: "https://github.com/KieranDotCo/snackbar-recoil",
    blurb: "A project to show how to use Recoil in React to manage state to show a Snackbar.",
  },
  {
    name: "React Shopping Cart With Recoil",
    tag: "Recoil",
    href: "https://kieran.co/shopping-cart-recoil/",
    repo: "https://github.com/KieranDotCo/shopping-cart-recoil",
    blurb:
      "A project to show how to use Recoil in React to manage state with local storage by creating a shopping cart. Cart state is restored when you open the site in a new window.",
  },
];
