<template>
  <div class="tabs">
    <text-button
      v-for="{ id, name, title } in tabs"
      :key="id"
      class="tabs__btn"
      :class="{ active: activeTab === name }"
      @click="emit('setActiveTab', name)"
      >{{ title }}</text-button
    >
  </div>
</template>

<script setup lang="ts">
import TextButton from '@/shared/ui/TextButton/TextButton.vue';
import { ITabs } from '@/shared/types/common.types';

interface IProps {
  tabs: ITabs[];
  activeTab: string;
}

defineProps<IProps>();

const emit = defineEmits<{
  setActiveTab: [value: string];
}>();
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  gap: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);

  &__btn {
    color: var(--text-color-primary);
    font-size: 1.2rem;
    position: relative;
    transition: all 0.5s;

    &::before {
      content: '';
      position: absolute;
      right: 50%;
      width: 0;
      bottom: -0.5rem;
      height: 1px;
      background: var(--color-primary-light);
      transition: all 0.5s;
    }

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      width: 0;
      bottom: -0.5rem;
      height: 1px;
      background: var(--color-primary-light);
      transition: all 0.5s;
    }

    &.active {
      color: var(--color-primary-light);

      &::after,
      &::before {
        width: 50%;
      }
    }
  }
}
</style>
