<template>
  <Layout>
    <template #doc-before>
      <h1 class="page-title">
        <span></span>
        <p>{{ frontmatter.title }}</p>
      </h1>
      <span class="page-info">{{ frontmatter.author }}</span>
      <span class="page-info">{{ frontmatter.date }}</span>
    </template>

    <template #aside-bottom>
      <button class="back-to-top"><svg-icon icon-name="icon-Other-29" class-name="back-to-top__icon"/></button>
    </template>
  </Layout>
</template>
<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import {useData} from "vitepress";
import SvgIcon from "../plugins/svg-icon.vue";

const {Layout} = DefaultTheme

const {frontmatter, theme, page} = useData();
</script>
<style lang="scss">
.page-title {
  font-size: 26px;
  color: var(--vp-c-text-1);
  font-weight: bold;
  margin-bottom: 30px;
}

.page-info {
  font-size: 13px;
  color: #7f7f7f;
  margin-right: 10px;
}

.back-to-top {
  position: absolute;
  bottom: 10px;
  right: 10px;

  &__icon {
    color: red;
  }
}
</style>