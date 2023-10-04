<template>
  <base-tooltip title="Change theme">
    <div class="switch" :class="switchClassList" @click="appStore.switchTheme">
      <icon-button class="switch__btn" :class="switchClassList">
        <v-icon name="bi-sun-fill" scale="1" v-if="theme === 'light'" />
        <v-icon name="bi-moon-fill" scale="1" v-else />
      </icon-button>
    </div>
  </base-tooltip>
</template>

<script setup lang="ts">
import IconButton from '@/ui/IconButton/IconButton.vue';
import BaseTooltip from '@/ui/BaseTooltip/BaseTooltip.vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/app';
import { computed } from 'vue';

const appStore = useAppStore();
const { theme } = storeToRefs(appStore);

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
  position: relative;
  cursor: pointer;

  &.light {
    background: var(--color-secondary-light);
  }

  &.dark {
    background: var(--color-primary-light);
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    height: 22px;
    width: 22px;
    bottom: 4px;
    transition: all 0.3s ease-in-out;
    color: var(--text-color-primary);

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
