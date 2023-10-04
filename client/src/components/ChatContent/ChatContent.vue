<template>
  <div class="chat-content">
    <div class="chat-content__header header">
      <div class="container">
        <div class="header__wrapper"></div>
      </div>
    </div>
    <div class="chat-content__messages"></div>
    <div class="chat-content__footer footer">
      <div class="container">
        <div class="footer__wrapper">
          <text-field />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextField from '@/components/TextField/TextField.vue';
</script>

<style lang="scss" scoped>
.chat-content {
  @include flex-col;

  &__header {
    flex: 0;
    border-bottom: 1px solid var(--border-color);
  }

  &__messages {
    flex: 1;
  }

  &__footer {
    flex: 0;
    border-top: 1px solid var(--border-color);
  }
}

.footer {
  &__wrapper {
    padding: 1rem 0;
  }
}

.header {
  &__wrapper {
    padding: 1rem;
  }
}
</style>
