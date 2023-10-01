<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <app-logo />
        <div class="header__panel panel">
          <icon-button v-if="isAuth" @click="logout">
            <v-icon name="ri-logout-circle-r-line" scale="1.5" />
          </icon-button>
          <router-link :to="{ name: 'Profile' }" class="panel__account" v-if="isAuth">
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
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isAuth } = storeToRefs(userStore);
const { logout } = userStore;
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
    color: var(--color-secondary);
  }
}
</style>
