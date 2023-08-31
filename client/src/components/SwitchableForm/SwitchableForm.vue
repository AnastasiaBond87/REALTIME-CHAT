<script setup lang="ts">
import BaseButton from '@/ui/BaseButton/BaseButton.vue';
import BaseInput from '@/ui/BaseInput/BaseInput.vue';
import ShowPasswordButton from '@/components/ShowPasswordButton/ShowPasswordButton.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { reactive, computed, ref, PropType, watch, VNodeRef } from 'vue';
import { type TFormView, IFormFields } from '@/types/common.types';
import { Buttons } from '@/constants/common';
import { registration } from '@/api/userApi';

const initialState: IFormFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const props = defineProps({
  formView: {
    type: String as PropType<TFormView>,
    required: true,
  },
});

const router = useRouter();

const isPasswordVisible = ref(false);
const form = ref<VNodeRef>();
const formState: IFormFields = reactive({ ...initialState });

const passwordType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));

const validators = computed(() => {
  if (props.formView === 'SignIn') {
    return {
      email: { required },
      password: { required },
    };
  } else {
    return {
      name: { required, minLength: minLength(3) },
      email: { required, email },
      password: { required },
      confirmPassword: { required, sameAs: sameAs(formState.password) },
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
    try {
      const { name, email, password } = formState;

      if (props.formView === 'SignUp') {
        await registration({ name, email, password });
      }

      v$.value.$reset();
      router.push({ name: 'Chat' });
    } catch (err) {
      console.log(err);
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
  <form @submit.prevent="handleSubmit" class="form" ref="form">
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
      />
      <base-input
        type="text"
        class="form__input"
        placeholder="Enter email"
        v-model.trim="v$.email.$model"
        size="md"
        :errors="v$.email.$errors"
      />
      <base-input
        :type="passwordType"
        class="form__input"
        placeholder="Enter password"
        v-model.trim="v$.password.$model"
        :errors="v$.password.$errors"
        size="md"
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
