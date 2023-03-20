import Layout from "./Layout.vue";
import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import '../assets/icons';
import SvgIcon from "../plugins/svg-icon.vue";

const customTheme: Theme = {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // app.use(ElementPlus);
    app.component('SvgIcon', SvgIcon);
  },
};

export default customTheme;
