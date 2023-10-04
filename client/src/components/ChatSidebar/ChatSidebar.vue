<script setup lang="ts"></script>

<template>
  <aside class="sidebar">
    <ul class="sidebar__user-list">
      <li class="sidebar__user-item">User 1</li>
    </ul>
  </aside>
</template>

<style lang="scss">
.sidebar {
  background: var(--color-paper-medium);

  &__user-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
