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
  <button :type="props.type" class="icon-btn">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.icon-btn {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
