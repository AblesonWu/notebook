<template>
  <aside class="sidebar open">
    <div class="sidebar-groups">
      <section v-for="(item, key) of customSidebars" :key="key" class="sidebar-group">
        <p class="sidebar-group__title">
          {{ item.text }}
        </p>
      </section>
    </div>
  </aside>
</template>
<script lang="ts" setup>
import {useData, useRoute} from 'vitepress'
import {computed, defineComponent} from 'vue'
import sidebars from '../config/sidebars';

const route = useRoute();
const {site, page} = useData();

const customSidebars = computed(() => {
  console.log('relativePath: ', route.data.relativePath);
  return sidebars;
})
</script>
