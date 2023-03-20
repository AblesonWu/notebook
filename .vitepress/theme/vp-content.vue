<template>
  <main :class="{ 'page-content': true, 'has-sidebar': true }">
    <div class="doc-content-wrapper">
      <div class="doc-content-container">
        <Content ref="content" class="doc-content" />
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useData } from 'vitepress';
import { ref } from 'vue'

const { page } = useData();
const content = ref<{ $el: HTMLElement }>()
</script>
