import { defineConfig } from "vitepress";
import nav from "./config/nav";
import sidebars from "./config/sidebars";

export default defineConfig({
  title: "Ranwu's Blog",
  description: "This is a blog to record development learning, continuely update the content",
  srcDir: "src",
  themeConfig: {
    outline: "deep",
    nav: nav,
    sidebar: sidebars,
    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
