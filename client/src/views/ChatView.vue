<template>
  <main class="chat-view">
    <div class="container chat-view__container">
      <div class="chat-view__wrapper">
        <chat-sidebar class="chat-view__sidebar" />
        <chat-content class="chat-view__content" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import ChatSidebar from '@/components/ChatSidebar/ChatSidebar.vue';
import ChatContent from '@/components/ChatContent/ChatContent.vue';
</script>

<style lang="scss" scoped>
.chat-view {
  @include flex-col;
  flex: 1 1 auto;

  &__container {
    @include flex-col;
    flex: 1;
  }

  &__wrapper {
    background: var(--color-paper);
    flex: 1;
    box-shadow: var(--box-shadow);
    display: flex;
  }

  &__sidebar {
    flex: 1 1 30%;
  }

  &__content {
    flex: 1 1 70%;
  }
}
</style>
