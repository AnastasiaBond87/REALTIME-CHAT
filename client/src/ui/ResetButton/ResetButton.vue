<template>
  <base-button class="btn" size="md" @click="emits('reset')" :disabled="loading"
    ><span>{{ Buttons.Reset }}</span></base-button
  >
</template>

<script setup lang="ts">
import BaseButton from '@/ui/BaseButton/BaseButton.vue';
import { Buttons } from '@/constants/common';

interface IProps {
  loading?: boolean;
}

withDefaults(defineProps<IProps>(), {
  loading: false,
});

const emits = defineEmits<{ reset: [] }>();
</script>

<style lang="scss" scoped>
.btn {
  background: darken($color-secondary, 20%);

  &:not(:disabled):hover {
    background: darken($color-secondary, 25%);
  }

  &:not(:disabled):active {
    background: darken($color-secondary, 10%);
  }
}
</style>
