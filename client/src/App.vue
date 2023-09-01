<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppFooter from '@/components/AppFooter/AppFooter.vue';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
</script>

<template>
  <div class="app-layout">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>

<style lang="scss">
.app-layout {
  min-width: 100%;
  min-height: 100%;
  background: $color-background-dark;
  display: flex;
  flex-direction: column;
}
</style>
