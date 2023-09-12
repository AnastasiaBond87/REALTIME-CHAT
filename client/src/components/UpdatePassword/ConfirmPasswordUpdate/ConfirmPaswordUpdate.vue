<template>
  <div class="confirm-pwd-update">
    <form class="confirm-pwd-update__form" @submit.prevent="handleSubmit">
      <h4 class="confirm-pwd-update__title">
        To confirm the password change, enter your current password
      </h4>
      <base-input type="text" autocomplete="new-password" size="sm" v-model="password" />
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/ui/BaseInput/BaseInput.vue';
import { ref } from 'vue';

const emits = defineEmits<{ submit: [value: string] }>();
const password = ref('');

const handleSubmit = (): void => {
  if (password.value) {
    emits('submit', password.value);
  }
};
</script>

<style lang="scss" scoped>
.confirm-pwd-update {
  background: $color-secondary;
  border-radius: 0.5rem;
  width: 400px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 2rem;

  &__title {
    line-height: 1.3;
    color: $color-primary;
  }
}
</style>
