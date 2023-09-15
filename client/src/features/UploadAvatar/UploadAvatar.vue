<template>
  <div class="upload-avatar">
    <div class="upload-avatar__wrapper">
      <user-avatar :img-id="user.avatar" v-if="user && user.avatar" :width="112" :height="112" />
      <v-icon name="ri-user-fill" class="upload-avatar__icon" scale="4" v-else />
    </div>
    <icon-button class="upload-avatar__btn" @click="handleClick">
      <v-icon name="fa-cloud-upload-alt" scale="3" />
    </icon-button>
    <input type="file" ref="hiddenInput" hidden @change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import UserAvatar from '@/components/UserAvatar/UserAvatar.vue';
import IconButton from '@/ui/IconButton/IconButton.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { uploadAvatar } = authStore;
const hiddenInput = ref<HTMLInputElement | null>(null);

const handleClick = (): void => {
  hiddenInput.value?.click();
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files.length && user.value) {
    const formData = new FormData();

    formData.append('_id', user.value.id);
    formData.append('file', target.files[0]);

    uploadAvatar(formData);
  }
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
    overflow: hidden;
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
