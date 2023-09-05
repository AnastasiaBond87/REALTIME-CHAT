<template>
  <router-link :to="{ name: 'Home' }" class="logo">
    <v-icon name="la-cat-solid" scale="1.8" class="logo__icon" />
    <p class="logo__text">
      <span class="logo__text-item logo__text-item_1">Cat</span>
      <span class="logo__text-item logo__text-item_2">Chat</span>
    </p>
  </router-link>
</template>

<style lang="scss" scoped>
.logo {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  &__icon {
    color: $color-active;
  }

  &__text {
    margin: 0;
  }

  &__text-item {
    text-transform: uppercase;
    font-weight: 700;

    &_1 {
      color: darken($text-color-secondary, 20%);
    }

    &_2 {
      color: $color-active;
    }
  }
}
</style>
