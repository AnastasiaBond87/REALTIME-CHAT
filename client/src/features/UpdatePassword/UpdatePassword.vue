<template>
  <div class="update-password">
    <form class="update-password__form form" @submit.prevent="handleSubmit">
      <base-input
        autocomplete="new-password"
        v-model="v$.password.$model"
        :errors="v$.password.$errors"
        size="md"
        label="password"
        :type="passwordType"
      >
        <show-password-button
          class="form__password-btn"
          @click="showPassword"
          :is-password-visible="isPasswordVisible"
          :scale="1.3"
        />
      </base-input>
      <base-input
        autocomplete="new-password"
        v-model="v$.confirmPassword.$model"
        :errors="v$.confirmPassword.$errors"
        size="md"
        label="confirm password"
        :type="passwordType"
      >
        <show-password-button
          class="form__password-btn"
          @click="showPassword"
          :is-password-visible="isPasswordVisible"
          :scale="1.3"
        />
      </base-input>
      <div class="form__btns">
        <submit-button :loading="isLoading" :name="Buttons.Submit" />
        <reset-button @reset="handleReset" :loading="isLoading" />
      </div>
    </form>
    <app-modal>
      <confirm-pasword-update @submit="handleConfirm" />
    </app-modal>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/ui/BaseInput/BaseInput.vue';
import ShowPasswordButton from '@/ui/ShowPasswordButton/ShowPasswordButton.vue';
import SubmitButton from '@/ui/SubmitButton/SubmitButton.vue';
import ResetButton from '@/ui/ResetButton/ResetButton.vue';
import AppModal from '@/components/AppModal/AppModal.vue';
import ConfirmPaswordUpdate from '@/features/UpdatePassword/ConfirmPasswordUpdate/ConfirmPaswordUpdate.vue';
import { useVuelidate } from '@vuelidate/core';
import { sameAs, helpers } from '@vuelidate/validators';
import { validatePassword } from '@/utils/validatePassword';
import { customMessages } from '@/constants/form';
import { computed, reactive, ref } from 'vue';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { TPasswordFormFields } from '@/types/common.types';
import { resetFormState } from '../../utils/resetFormState';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { storeToRefs } from 'pinia';
import { Buttons } from '@/constants/common';

const $toast = useToast();
const { showModal } = useAppStore();
const authStore = useAuthStore();
const { user, isLoading } = storeToRefs(authStore);
const { updatePassword } = authStore;
const isPasswordVisible = ref(false);
const passwordType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
const { userPassword, confirmPassword } = customMessages;
const initialState: TPasswordFormFields = { password: '', confirmPassword: '' };
const formState: TPasswordFormFields = reactive({ ...initialState });

const validators = computed(() => ({
  password: {
    pattern: helpers.withMessage(userPassword.pattern, validatePassword),
  },
  confirmPassword: {
    sameAs: helpers.withMessage(confirmPassword.match, sameAs(formState.password)),
  },
}));

const v$ = useVuelidate(validators, formState);

const handleReset = (): void => {
  resetFormState<TPasswordFormFields>(formState, initialState);
  v$.value.$reset();
};

const handleSubmit = (): void => {
  v$.value.$validate();

  if (!v$.value.$error && formState.password) {
    showModal(true);
  }
};

const handleConfirm = async (password: string): Promise<void> => {
  showModal(false);

  if (user.value) {
    const updated = await updatePassword(user.value.id, password, formState.password);

    if (updated) {
      $toast.success('Password successfully updated');
    }
  }
};

const showPassword = (): void => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<style lang="scss" scoped>
.update-password {
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

  &__password-btn {
    position: absolute;
    right: 1.14rem;
    transform: translateY(100%);
    cursor: pointer;
    color: darken($text-color-secondary, 10%);
  }
}
</style>
