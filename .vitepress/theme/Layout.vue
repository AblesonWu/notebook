<template>
  <Layout>
    <template #doc-before>
      <div class="page-title">
        <span></span>
        <em>{{ frontmatter.title }}</em>
      </div>
      <span class="page-info">{{ frontmatter.author }}</span>
      <span class="page-info">{{ frontmatter.date }}</span>
    </template>
  </Layout>
  <button class="back-to-top">
    <svg-icon icon-name="icon-Other-29" class-name="back-to-top__icon" color="#ffffff"/>
  </button>
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
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;

  &__icon {
    text-align: center;
    height: 30px !important;
    width: 30px !important;
    margin-left: 10px;
  }
}
</style>