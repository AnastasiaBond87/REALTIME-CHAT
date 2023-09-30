<template>
  <div class="confirm-pwd-update">
    <h4 class="confirm-pwd-update__title">
      To confirm the password change, enter your current password
    </h4>
    <form class="confirm-pwd-update__form" @submit.prevent="handleSubmit">
      <password-input size="lg" placeholder="Enter password" v-model.trim="password" />
      <submit-button :name="Buttons.Confirm" class="confirm-pwd-update__btn" />
    </form>
  </div>
</template>

<script setup lang="ts">
import PasswordInput from '@/ui/PasswordInput/PaswordInput.vue';
import SubmitButton from '@/ui/SubmitButton/SubmitButton.vue';
import { ref } from 'vue';
import { Buttons } from '../../../constants/common';

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
  height: 50%;
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    line-height: 1.3;
    color: $color-primary;
  }

  &__btn {
    align-self: flex-end;
  }
}
</style>
