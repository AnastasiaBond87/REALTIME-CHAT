<script setup lang="ts">
import { ButtonHTMLAttributes, computed } from 'vue';
import type { TSize } from '@/types/common.types';

interface IProps {
  type?: ButtonHTMLAttributes['type'];
  size?: TSize;
  disabled?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  size: 'md',
  disabled: false,
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

  &:disabled {
    color: $text-color-secondary;
    background: none;
    outline: 1px solid $color-secondary;
    cursor: default;
  }
  :slotted(span) {
    line-height: 1.14rem;
    font-size: 1rem;
  }

  @include sizes;
}
</style>
