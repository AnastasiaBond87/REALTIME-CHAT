<template>
  <main class="main">
    <div class="container">
      <div class="main__wrapper">
        <div class="main__content">
          <upload-avatar />
          <div class="main__forms">
            <switch-tabs :active-tab="activeTab" :tabs="AccountTabs" @set-active-tab="switchTab" />
            <update-profile v-if="activeTab === 'user-info'" />
            <update-password v-if="activeTab === 'password'" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import UploadAvatar from '@/features/UploadAvatar/UploadAvatar.vue';
import SwitchTabs from '@/shared/ui/SwitchTabs/SwitchTabs.vue';
import UpdateProfile from '@/features/UpdateProfile/UpdateProfile.vue';
import UpdatePassword from '@/features/UpdatePassword/UpdatePassword.vue';
import { ref } from 'vue';
import { AccountTabs } from '@/shared/constants/common';

const activeTab = ref<string>('user-info');

const switchTab = (value: string): void => {
  activeTab.value = value;
};
</script>

<style lang="scss" scoped>
.main {
  flex: 1 1 auto;

  &__wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  &__content {
    width: 600px;
    min-height: 500px;
    max-width: 100%;
    padding: 2rem;
    height: 100%;
    background: var(--color-paper);
    box-shadow: var(--box-shadow);
    display: flex;
    flex-direction: column;
    gap: 3rem;
    transition: var(--change-theme-transition);
  }
}
</style>
