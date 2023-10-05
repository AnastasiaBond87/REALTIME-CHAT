<template>
  <base-button type="submit" class="btn" size="md" :disabled="loading">
    <span>{{ name }}</span>
    <v-icon name="fa-spinner" scale="0.9" v-if="loading" animation="spin" />
    <v-icon name="io-paw" scale="0.9" v-else />
  </base-button>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue';
import { Buttons } from '@/shared/constants/common';

interface IProps {
  loading?: boolean;
  name: Buttons;
}

withDefaults(defineProps<IProps>(), {
  loading: false,
});
</script>

<style lang="scss" scoped>
.btn {
  background: var(--color-primary);
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;

  &:not(:disabled):hover {
    background: var(--color-primary-medium);
  }

  &:not(:disabled):active {
    background: var(--color-primary-light);
  }
}
</style>
