<template>
  <div class="switch" :class="switchClassList">
    <icon-button @click="themeStore.switchTheme" class="switch__btn" :class="switchClassList">
      <v-icon name="bi-sun-fill" scale="1" v-if="theme === 'light'" />
      <v-icon name="bi-moon-fill" scale="1" v-else />
    </icon-button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';

const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);

const switchClassList = computed(() => ({
  dark: theme.value === 'dark',
  light: theme.value === 'light',
}));
</script>

<style lang="scss">
.switch {
  width: 48px;
  height: 30px;
  border-radius: 30px;
  background: $color-primary;
  position: relative;

  &.light {
    background: $color-secondary;
  }

  &.dark {
    background: $color-active;
  }

  &__btn {
    background-color: $color-white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    height: 22px;
    width: 22px;
    bottom: 4px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &.light {
      left: 4px;
      transform: translateX(0);
    }

    &.dark {
      transform: translateX(22px);
    }
  }
}
</style>
