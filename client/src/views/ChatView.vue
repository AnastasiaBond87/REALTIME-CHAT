<script setup lang="ts">
import ChatSidebar from '@/components/ChatSidebar/ChatSidebar.vue';
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="main__wrapper">
        <chat-sidebar />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  flex: 1 1 auto;
}
</style>
