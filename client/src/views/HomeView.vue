<script setup lang="ts">
import UserLogin from '@/features/UserLogin/UserLogin.vue';
import TextButton from '@/ui/TextButton/TextButton.vue';
import { type TFormView } from '@/types/common.types';
import { Buttons } from '@/constants/common';
import { ref } from 'vue';

const formView = ref<TFormView>('SignIn');

const switchForm = (): void => {
  formView.value === 'SignIn' ? (formView.value = 'SignUp') : (formView.value = 'SignIn');
};
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="main__wrapper">
        <user-login :form-view="formView" />
        <div class="main__footer">
          <span>{{
            formView === 'SignIn' ? `Don't have an account yet?` : 'Already have an account?'
          }}</span>
          <text-button @click="switchForm" @keydown.prevent>{{
            formView === 'SignIn' ? Buttons.SignUp : Buttons.SignIn
          }}</text-button>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    padding: 2rem 0;
  }

  &__footer {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }
}
</style>
