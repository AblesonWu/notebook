import { DefaultTheme } from "vitepress";

type NavItem = DefaultTheme.NavItem;

const nav: NavItem[] = [
  {
    text: "前端开发",
    items: [{ text: "测试", link: "前端开发/测试/Cypress" }],
  },
  {
    text: "VitePress",
    link: "VitePress.md",
  },
];

export default nav;
