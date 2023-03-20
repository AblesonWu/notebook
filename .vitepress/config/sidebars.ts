import { DefaultTheme } from "vitepress";

type SideBar = DefaultTheme.Sidebar;

const sidebars: SideBar = {
  "/前端开发/测试/": [
    { text: "Cypress", link: "/前端开发/测试/Cypress" },
    { text: "Jest", link: "/前端开发/测试/Jest" },
  ],
};


export default sidebars;
