<script setup lang="ts">
import { ButtonHTMLAttributes, PropType, computed } from 'vue';

type TButtonSize = 'sm' | 'md' | 'lg';

const props = defineProps({
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
  },
  size: {
    type: String as PropType<TButtonSize>,
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
  background: $color-primary;
  color: $text-color-primary;
  line-height: 1.14rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  transition: all ease-in-out 0.3s;

  &:not(:disabled):hover {
    background: $color-hover;
    box-shadow: $shadow-primary;
  }

  &:not(:disabled):active {
    background: $color-active;
    box-shadow: $shadow-primary;
  }

  &:disabled {
    color: $text-color-secondary;
    background: none;
    border: 1px solid $color-secondary;
    cursor: default;
  }

  @include sizes;
}
</style>
