<script setup lang="ts">
import { ButtonHTMLAttributes, PropType, computed } from 'vue';
import type { TSize } from '@/types/common.types';

const props = defineProps({
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
  },
  size: {
    type: String as PropType<TSize>,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const btnClassList = computed(() => ({
  small: props.size === 'sm',
  medium: props.size === 'md',
  large: props.size === 'lg',
}));
</script>

<template>
  <button :type="props.type" class="btn" :class="btnClassList" :disabled="props.disabled">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  border: none;
  border-radius: 0.2rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  color: $text-color-primary;

  &:not(:disabled):hover {
    box-shadow: $shadow-primary;
  }

  &:not(:disabled):active {
    box-shadow: $shadow-primary;
  }

  &:disabled {
    color: $text-color-secondary;
    background: none;
    border: 1px solid $color-secondary;
    cursor: default;
  }
  :slotted(span) {
    line-height: 1.14rem;
    font-size: 1rem;
  }

  @include sizes;
}
</style>
