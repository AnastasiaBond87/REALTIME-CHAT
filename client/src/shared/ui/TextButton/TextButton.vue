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
  <button :type="type" class="btn">
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
  color: var(--color-primary);
  line-height: 1;
}
</style>
