<script setup lang="ts">
import { ButtonHTMLAttributes } from 'vue';

interface IProps {
  type?: ButtonHTMLAttributes['type'];
}

withDefaults(defineProps<IProps>(), {
  type: 'button',
});
</script>

<template>
  <button :type="type" class="icon-btn">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.icon-btn {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
