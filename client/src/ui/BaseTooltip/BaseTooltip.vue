<template>
  <div class="tooltip">
    <span class="tooltip__title">{{ title }}</span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title: string;
}
defineProps<IProps>();
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;

  &__title {
    position: absolute;
    bottom: -100%;
    left: -110%;
    font-size: 0.9rem;
    color: var(--text-color-primary);
    font-weight: 600;
    display: inline-block;
    width: max-content;
    border: 1px solid var(--border-color);
    border-radius: 2px;
    padding: 4px 7px;
    background: var(--color-paper);
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease;
  }

  &:hover &__title {
    opacity: 1;
    visibility: visible;
  }
}
</style>
