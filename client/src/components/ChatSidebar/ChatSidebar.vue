<script setup lang="ts"></script>

<template>
  <aside class="sidebar">
    <div class="container sidebar__container">
      <div class="sidebar__wrapper">
        <div class="sidebar__header">
          <v-icon name="la-users-solid" :scale="1.8" />
          <h2 class="sidebar__title">Users Online</h2>
        </div>
        <ul class="sidebar__user-list">
          <li class="sidebar__user-item">User 1</li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  background: var(--color-paper-medium);
  padding: 1rem 0;

  &__container {
    @include flex-col;
  }

  &__wrapper {
    flex: 1;
    @include flex-col;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--text-color-primary);
    margin-bottom: 2rem;
  }

  &__title {
    margin: 0;
    line-height: 1;
  }

  &__user-list {
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
  }
}
</style>
