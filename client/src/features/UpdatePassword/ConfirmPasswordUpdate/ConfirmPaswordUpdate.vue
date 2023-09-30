<template>
  <div class="confirm-pwd-update">
    <h4 class="confirm-pwd-update__title">
      To confirm the password change, enter your current password
    </h4>
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
import PasswordInput from '@/ui/PasswordInput/PaswordInput.vue';
import SubmitButton from '@/ui/SubmitButton/SubmitButton.vue';
import { computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { Buttons } from '@/constants/common';
import { IFormFields } from '@/types/common.types';
import { helpers, required } from '@vuelidate/validators';
import { customMessages } from '@/constants/form';

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
  background: #ffffff;
  border-radius: 0.5rem;
  width: 400px;
  height: 400px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    line-height: 1.3;
    font-size: 1.5rem;
    color: $color-primary;
  }

  &__btn {
    align-self: flex-end;
  }
}
</style>
