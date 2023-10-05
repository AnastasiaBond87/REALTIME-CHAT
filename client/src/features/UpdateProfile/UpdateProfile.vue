<template>
  <div class="update-profile">
    <form class="update-profile__form form" @submit.prevent="handleSubmit">
      <base-input
        autocomplete="username"
        v-model="v$.name.$model"
        :errors="v$.name.$errors"
        size="md"
        label="name"
      />
      <base-input
        autocomplete="email"
        v-model="v$.email.$model"
        :errors="v$.email.$errors"
        size="md"
        label="email"
      />
      <div class="form__btns">
        <submit-button :loading="isLoading" :name="Buttons.Update" />
        <reset-button @reset="handleReset" :loading="isLoading" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue';
import SubmitButton from '@/shared/ui/SubmitButton/SubmitButton.vue';
import ResetButton from '@/shared/ui/ResetButton/ResetButton.vue';
import { customMessages } from '@/shared/constants/form';
import { useVuelidate } from '@vuelidate/core';
import { email, minLength, helpers, maxLength } from '@vuelidate/validators';
import { ComputedRef, computed, reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import { TProfileFormFields } from '@/shared/types/common.types';
import { resetFormState } from '@/shared/utils/resetFormState';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { Buttons } from '@/shared/constants/common';

const $toast = useToast();
const userStore = useUserStore();
const { user, isLoading } = storeToRefs(userStore);
const { updateProfile } = userStore;
const { userName, userEmail } = customMessages;

const validators = computed(() => ({
  name: {
    minLength: helpers.withMessage(userName.minLength, minLength(3)),
    maxLength: helpers.withMessage(userName.maxLength, maxLength(10)),
  },
  email: {
    email: helpers.withMessage(userEmail.pattern, email),
  },
}));

const initialState: ComputedRef<TProfileFormFields> = computed(() => ({
  email: user.value?.email ?? '',
  name: user.value?.name ?? '',
}));
const formState: TProfileFormFields = reactive({ ...initialState.value });
const v$ = useVuelidate<TProfileFormFields>(validators, formState);

const handleSubmit = async (): Promise<void> => {
  v$.value.$validate();

  if (!v$.value.$error && user.value && (formState.email || formState.name)) {
    const updated = await updateProfile(user.value.id, formState.name, formState.email);

    if (updated) {
      $toast.success('Profile successfully updated');
    }
  }
};

const handleReset = (): void => {
  resetFormState<TProfileFormFields>(formState, initialState.value);
  v$.value.$reset();
};
</script>

<style lang="scss" scoped>
.update-profile {
  margin-top: 2rem;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__btns {
    display: flex;
    align-self: flex-end;
    gap: 1rem;
  }
}
</style>
