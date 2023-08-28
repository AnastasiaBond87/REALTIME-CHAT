<script setup lang="ts">
import BaseButton from '@/ui/BaseButton/BaseButton.vue';
import BaseInput from '@/ui/BaseInput/BaseInput.vue';
import { ref } from 'vue';

const inputVal = ref('');

const handleSubmit = () => {
  console.log(inputVal.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h2 class="login-form__title">Enter the chat</h2>
    <div class="login-form__content">
      <base-input
        type="text"
        class="login-form__input"
        placeholder="Enter name..."
        v-model="inputVal"
      />
      <base-button type="submit" class="login-form__btn" size="md">Enter</base-button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.login-form {
  width: 600px;
  max-width: 100%;
  display: flex;
  flex-direction: column;

  &__title {
    margin: 0;
    padding: 0;
    margin-bottom: 1.5rem;
    font-weight: 600;
    text-transform: capitalize;
  }

  &__content {
    display: flex;
    gap: 1rem;
  }

  &__input {
    flex: 1 1 auto;
  }

  &__btn {
    flex: 0 0 auto;
  }
}
</style>
