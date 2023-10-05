<script setup lang="ts">
import SubmitButton from '@/shared/ui/SubmitButton/SubmitButton.vue';
import ResetButton from '@/shared/ui/ResetButton/ResetButton.vue';
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue';
import PasswordInput from '@/shared/ui/PasswordInput/PaswordInput.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs, helpers, maxLength } from '@vuelidate/validators';
import { reactive, computed, watch } from 'vue';
import { type TFormView, IFormFields } from '@/shared/types/common.types';
import { Buttons } from '@/shared/constants/common';
import { initialState, customMessages } from '@/shared/constants/form';
import { useUserStore } from '@/stores/user';
import { validatePassword } from '@/shared/utils/validatePassword';
import { resetFormState } from '@/shared/utils/resetFormState';
import { storeToRefs } from 'pinia';

interface IProps {
  formView: TFormView;
}

const props = defineProps<IProps>();

const userStore = useUserStore();
const { isLoading } = storeToRefs(userStore);
const { login, registration } = userStore;
const formState: IFormFields = reactive({ ...initialState });
const { userName, userEmail, userPassword, confirmPassword } = customMessages;

const validators = computed(() => {
  if (props.formView === 'SignIn') {
    return {
      email: { required: helpers.withMessage(userEmail.required, required) },
      password: { required: helpers.withMessage(userPassword.required, required) },
    };
  } else {
    return {
      name: {
        required: helpers.withMessage(userName.required, required),
        minLength: helpers.withMessage(userName.minLength, minLength(3)),
        maxLength: helpers.withMessage(userName.maxLength, maxLength(10)),
      },
      email: {
        required: helpers.withMessage(userEmail.required, required),
        email: helpers.withMessage(userEmail.pattern, email),
      },
      password: {
        required: helpers.withMessage(userPassword.required, required),
        pattern: helpers.withMessage(userPassword.pattern, validatePassword),
      },
      confirmPassword: {
        required: helpers.withMessage(confirmPassword.required, required),
        sameAs: helpers.withMessage(confirmPassword.match, sameAs(formState.password)),
      },
    };
  }
});

const v$ = useVuelidate<IFormFields>(validators, formState);

const handleSubmit = async (): Promise<void> => {
  v$.value.$validate();

  if (!v$.value.$error) {
    const { name, email, password } = formState;

    if (props.formView === 'SignUp') {
      await registration(name, email, password);
    } else {
      await login(email, password);
    }
  }
};

const handleReset = (): void => {
  resetFormState<IFormFields>(formState, initialState);
  v$.value.$reset();
};

watch(
  () => props.formView,
  () => {
    handleReset();
  }
);
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2 class="form__title">
      <v-icon name="ri-user-add-fill" scale="1.2" v-if="formView === 'SignUp'" />
      <v-icon name="ri-user-shared-fill" scale="1.2" v-else />
      <span>{{ formView === 'SignIn' ? 'Sign in' : 'Sign up' }} messenger</span>
    </h2>
    <div class="form__content">
      <base-input
        v-if="formView === 'SignUp' && v$.name"
        type="text"
        class="form__input"
        placeholder="Enter name"
        size="md"
        v-model.trim="v$.name.$model"
        :errors="v$.name.$errors"
        autocomplete="username"
      />
      <base-input
        type="text"
        class="form__input"
        placeholder="Enter email"
        v-model.trim="v$.email.$model"
        size="md"
        :errors="v$.email.$errors"
        autocomplete="email"
      />
      <password-input
        placeholder="Enter password"
        v-model.trim="v$.password.$model"
        :errors="v$.password.$errors"
      />
      <password-input
        v-if="formView === 'SignUp' && v$.confirmPassword"
        placeholder="Confirm password"
        v-model="v$.confirmPassword.$model"
        :errors="v$.confirmPassword.$errors"
      />
    </div>
    <div class="form__btns">
      <submit-button
        :loading="isLoading"
        :name="formView === 'SignIn' ? Buttons.SignIn : Buttons.SignUp"
      />
      <reset-button @reset="handleReset" :loading="isLoading" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
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
    align-self: center;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary-light);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  &__btns {
    display: flex;
    align-self: flex-end;
    gap: 1rem;
  }
}
</style>
