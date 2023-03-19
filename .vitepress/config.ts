import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Ranwu's Blog",
  description: "This is a blog to record development learning, continuely update the content",
  srcDir: "src",
  themeConfig: {
    outline: "deep",
    nav: [
      {
        text: "前端开发",
        items: [{ text: "测试", link: "前端开发/测试/Cypress" }],
      },
      {
        text: "VitePress",
        link: "VitePress.md",
      },
    ],
    sidebar: {
      "/前端开发/测试/": [
        { text: "Cypress", link: "/前端开发/测试/Cypress" },
        { text: "Jest", link: "/前端开发/测试/Jest" },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
