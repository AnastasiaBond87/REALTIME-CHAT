<script setup lang="ts">
import BaseButton from '@/ui/BaseButton/BaseButton.vue';
import BaseInput from '@/ui/BaseInput/BaseInput.vue';
import ShowPasswordButton from '@/components/ShowPasswordButton/ShowPasswordButton.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs, helpers, maxLength } from '@vuelidate/validators';
import { reactive, computed, ref, PropType, watch } from 'vue';
import { type TFormView, IFormFields } from '@/types/common.types';
import { Buttons } from '@/constants/common';
import { initialState, customMessages } from '@/constants/form';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  formView: {
    type: String as PropType<TFormView>,
    required: true,
  },
});

const { login, registration } = useAuthStore();

const isPasswordVisible = ref(false);
const formState: IFormFields = reactive({ ...initialState });

const passwordType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));

const passwordPattern = (value: string) =>
  /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,15}/.test(value);

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
        pattern: helpers.withMessage(userPassword.pattern, passwordPattern),
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
      await registration({ name, email, password });
    } else {
      await login({ email, password });
    }
  }
};

const handleReset = (): void => {
  for (let key in formState) {
    formState[key as keyof IFormFields] = initialState[key as keyof IFormFields];
  }

  v$.value.$reset();
};

watch(
  () => props.formView,
  () => {
    v$.value.$reset();
  }
);
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2 class="form__title">{{ formView === 'SignIn' ? 'Sign in' : 'Sign up' }} messenger</h2>
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
        />
      </base-input>
    </div>
    <div class="form__btns">
      <base-button type="submit" class="form__btn form__btn_submit" size="md">{{
        Buttons[formView]
      }}</base-button>
      <base-button class="form__btn form__btn_reset" size="md" @click="handleReset">{{
        Buttons.Reset
      }}</base-button>
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
  }

  &__btns {
    display: flex;
    align-self: flex-end;
    gap: 1rem;
  }

  &__btn {
    &_submit {
      background: $color-primary;

      &:not(:disabled):hover {
        background: $color-hover;
      }

      &:not(:disabled):active {
        background: $color-active;
      }
    }

    &_reset {
      background: darken($color-secondary, 20%);

      &:not(:disabled):hover {
        background: darken($color-secondary, 25%);
      }

      &:not(:disabled):active {
        background: darken($color-secondary, 10%);
      }
    }
  }
}
</style>
