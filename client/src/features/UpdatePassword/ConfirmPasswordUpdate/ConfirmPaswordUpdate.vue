<template>
  <div class="confirm-pwd-update">
    <h4 class="confirm-pwd-update__title">Enter current password to confirm</h4>
    <form class="confirm-pwd-update__form" @submit.prevent="handleSubmit">
      <password-input
        size="lg"
        placeholder="Enter password"
        v-model.trim="v$.password.$model"
        :errors="v$.password.$errors"
      />
      <submit-button :name="Buttons.Confirm" class="confirm-pwd-update__btn" />
    </form>
  </div>
</template>

<script setup lang="ts">
import PasswordInput from '@/shared/ui/PasswordInput/PaswordInput.vue';
import SubmitButton from '@/shared/ui/SubmitButton/SubmitButton.vue';
import { computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { Buttons } from '@/shared/constants/common';
import { IFormFields } from '@/shared/types/common.types';
import { helpers, required } from '@vuelidate/validators';
import { customMessages } from '@/shared/constants/form';

const emits = defineEmits<{ submit: [value: string] }>();
const { userPassword } = customMessages;

type TState = Pick<IFormFields, 'password'>;

const validators = computed(() => ({
  password: {
    required: helpers.withMessage(userPassword.required, required),
  },
}));

const initialState: TState = {
  password: '',
};
const formState: TState = reactive({ ...initialState });

const v$ = useVuelidate<TState>(validators, formState);

const handleSubmit = (): void => {
  v$.value.$validate();

  if (!v$.value.$error) {
    emits('submit', formState.password);
  }
};
</script>

<style lang="scss" scoped>
.confirm-pwd-update {
  background: var(--color-paper);
  width: 400px;
  height: 400px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__title {
    line-height: 1.3;
    font-size: 1.5rem;
    color: var(--color-primary);
  }

  &__btn {
    align-self: flex-end;
  }
}
</style>
