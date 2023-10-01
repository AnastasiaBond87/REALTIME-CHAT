<template>
  <router-link :to="{ name: 'Home' }" class="logo">
    <curios-cat-icon class="logo__icon" />
    <p class="logo__text">
      <span class="logo__text-item logo__text-item_1">Cat</span>
      <span class="logo__text-item logo__text-item_2">Chat</span>
    </p>
  </router-link>
</template>

<script setup lang="ts">
import CuriosCatIcon from '@/assets/icons/curious-cat-icon.svg';
</script>

<style lang="scss" scoped>
.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  &__icon {
    color: var(--color-primary-light);
    height: 2.2rem;
  }

  &__text {
    margin: 0;
    font-size: 2.2rem;
  }

  &__text-item {
    font-family: 'Cookie', cursive;

    &_1 {
      color: var(--color-secondary);
    }

    &_2 {
      color: var(--color-primary-light);
    }
  }
}
</style>
