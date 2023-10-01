<template>
  <transition>
    <div class="modal" v-if="isModalVisible">
      <div class="modal__container" @click.self="handleClick">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { isModalVisible } = storeToRefs(appStore);
const { showModal } = appStore;

const handleClick = () => {
  showModal(false);
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: var(--overlay-color);
  overflow: auto;

  &__container {
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-active {
  opacity: 0;
}
</style>
