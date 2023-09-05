<template>
  <div class="upload-avatar">
    <div class="upload-avatar__wrapper">
      <v-icon name="ri-user-fill" class="upload-avatar__icon" scale="4" />
    </div>
    <icon-button class="upload-avatar__btn" @click="handleClick">
      <v-icon name="fa-cloud-upload-alt" scale="3" />
    </icon-button>
    <input type="file" ref="hiddenInput" hidden />
  </div>
</template>

<script setup lang="ts">
import IconButton from '@/ui/IconButton/IconButton.vue';
import { ref } from 'vue';
const hiddenInput = ref<HTMLInputElement | null>(null);

const handleClick = (): void => {
  hiddenInput.value?.click();
};
</script>

<style lang="scss" scoped>
.upload-avatar {
  position: relative;
  max-width: max-content;

  &__wrapper {
    width: 8rem;
    height: 8rem;
    background: lighten($color-secondary, 15%);
    border-radius: 50%;
    border: 1px solid $color-secondary;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__icon {
    color: $color-secondary;
  }

  &__btn {
    color: $color-primary;
    position: absolute;
    bottom: 0;
    right: -0.5rem;
    cursor: pointer;
  }
}
</style>
