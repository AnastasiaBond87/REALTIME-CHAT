<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__wrapper">
        <p class="footer__copyright">CatChat © 2023</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 1rem 0;

  &__wrapper {
    display: flex;
    justify-content: center;
  }

  &__copyright {
    color: var(--text-color-primary);
    opacity: 0.7;
    margin: 0;
  }
}
</style>
