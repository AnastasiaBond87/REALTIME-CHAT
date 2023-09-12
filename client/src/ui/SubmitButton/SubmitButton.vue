<template>
  <base-button type="submit" class="btn" size="md" :disabled="loading">
    <span>{{ name }}</span>
    <v-icon name="fa-spinner" scale="0.9" v-if="loading" animation="spin" />
    <v-icon name="io-paw" scale="0.9" v-else />
  </base-button>
</template>

<script setup lang="ts">
import BaseButton from '@/ui/BaseButton/BaseButton.vue';
import { Buttons } from '@/constants/common';
import { PropType } from 'vue';

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String as PropType<Buttons>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.btn {
  background: $color-primary;
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;

  &:not(:disabled):hover {
    background: $color-hover;
  }

  &:not(:disabled):active {
    background: $color-active;
  }
}
</style>
