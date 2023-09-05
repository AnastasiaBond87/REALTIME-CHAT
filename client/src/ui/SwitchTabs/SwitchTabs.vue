<template>
  <div class="tabs">
    <text-button
      v-for="{ id, name, title } in props.tabs"
      :key="id"
      class="tabs__btn"
      :class="{ active: activeTab === name }"
      @click="emit('setActiveTab', name)"
      >{{ title }}</text-button
    >
  </div>
</template>

<script setup lang="ts">
import TextButton from '@/ui/TextButton/TextButton.vue';
import { PropType } from 'vue';
import { ITabs } from '@/types/common.types';

const props = defineProps({
  tabs: {
    type: Array as PropType<ITabs[]>,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  setActiveTab: [value: string];
}>();
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  gap: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid $color-secondary;

  &__btn {
    color: darken($color-secondary, 20%);
    font-size: 1.2rem;
    position: relative;
    transition: all 0.5s;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 0;
      bottom: -0.5rem;
      height: 1px;
      background: $color-active;
      transition: all 0.5s;
    }

    &.active {
      color: $color-active;

      &::after {
        width: 100%;
      }
    }
  }
}
</style>
