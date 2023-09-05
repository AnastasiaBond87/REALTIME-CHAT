<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppFooter from '@/components/AppFooter/AppFooter.vue';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);

const layoutClassList = computed(() => ({
  light: theme.value === 'light',
  dark: theme.value === 'dark',
}));
</script>

<template>
  <div class="app-layout" :class="layoutClassList">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<style lang="scss">
.app-layout {
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &.light {
    background: $color-background-light;
  }

  &.dark {
    background: $color-background-dark;
  }
}
</style>
