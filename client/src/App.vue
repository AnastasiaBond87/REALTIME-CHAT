<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppFooter from '@/components/AppFooter/AppFooter.vue';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const appStore = useAppStore();
const authStore = useAuthStore();
const { theme } = storeToRefs(appStore);
const $toast = useToast();

const layoutClassList = computed(() => ({
  light: theme.value === 'light',
  dark: theme.value === 'dark',
}));

watch(
  () => authStore.error,
  (err) => {
    if (err) $toast.error(err);
  }
);
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
