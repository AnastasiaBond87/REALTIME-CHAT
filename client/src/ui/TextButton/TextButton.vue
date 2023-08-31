<script setup lang="ts">
import { ButtonHTMLAttributes, PropType } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
  },
});
</script>

<template>
  <button :type="props.type" class="btn">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  padding: 0;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  color: $color-primary;
  line-height: 1;
}
</style>
