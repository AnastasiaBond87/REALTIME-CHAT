<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <app-logo />
        <div class="header__panel panel">
          <icon-button v-if="isAuth" @click="authStore.logout">
            <v-icon name="ri-logout-circle-r-line" scale="1.5" />
          </icon-button>
          <router-link :to="{ name: 'Account' }" class="panel__account" v-if="isAuth">
            <v-icon name="ri-user-fill" scale="1.5" />
          </router-link>
          <theme-switch />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch.vue';
import AppLogo from '@/components/AppLogo/AppLogo.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { isAuth } = storeToRefs(authStore);
</script>

<style lang="scss" scoped>
.header {
  padding: 1rem 0;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__panel {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
.panel {
  &__account {
    color: $color-secondary;
  }
}
</style>
