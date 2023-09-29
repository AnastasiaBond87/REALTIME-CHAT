<script setup lang="ts">
import SubmitButton from '@/ui/SubmitButton/SubmitButton.vue';
import ResetButton from '@/ui/ResetButton/ResetButton.vue';
import BaseInput from '@/ui/BaseInput/BaseInput.vue';
import ShowPasswordButton from '@/ui/ShowPasswordButton/ShowPasswordButton.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs, helpers, maxLength } from '@vuelidate/validators';
import { reactive, computed, ref, PropType, watch } from 'vue';
import { type TFormView, IFormFields } from '@/types/common.types';
import { Buttons } from '@/constants/common';
import { initialState, customMessages } from '@/constants/form';
import { useUserStore } from '@/stores/user';
import { validatePassword } from '@/utils/validatePassword';
import { resetFormState } from '@/utils/resetFormState';
import { storeToRefs } from 'pinia';

const props = defineProps({
  formView: {
    type: String as PropType<TFormView>,
    required: true,
  },
});

const userStore = useUserStore();
const { isLoading } = storeToRefs(userStore);
const { login, registration } = userStore;
const isPasswordVisible = ref(false);
const formState: IFormFields = reactive({ ...initialState });
const passwordType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
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

const showPassword = (): void => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

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
      <base-input
        :type="passwordType"
        class="form__input"
        placeholder="Enter password"
        v-model.trim="v$.password.$model"
        :errors="v$.password.$errors"
        size="md"
        autocomplete="new-password"
      >
        <show-password-button
          class="form__password-btn"
          @click="showPassword"
          :is-password-visible="isPasswordVisible"
          :scale="1.3"
        />
      </base-input>
      <base-input
        v-if="formView === 'SignUp' && v$.confirmPassword"
        :type="passwordType"
        class="form__input"
        placeholder="Confirm password"
        size="md"
        v-model="v$.confirmPassword.$model"
        :errors="v$.confirmPassword.$errors"
        autocomplete="new-password"
      >
        <show-password-button
          class="form__password-btn"
          @click="showPassword"
          :is-password-visible="isPasswordVisible"
          :scale="1.3"
        />
      </base-input>
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
    color: $color-active;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  &__password-btn {
    position: absolute;
    right: 1.14rem;
    transform: translateY(25%);
    cursor: pointer;
    color: darken($text-color-secondary, 10%);
  }

  &__btns {
    display: flex;
    align-self: flex-end;
    gap: 1rem;
  }
}
</style>
