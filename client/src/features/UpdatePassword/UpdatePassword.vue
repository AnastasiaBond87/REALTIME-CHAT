<template>
  <div class="update-password">
    <form class="update-password__form form" @submit.prevent="handleSubmit">
      <password-input :errors="v$.password.$errors" label="password" v-model="v$.password.$model" />
      <password-input
        :errors="v$.confirmPassword.$errors"
        label="confirm password"
        v-model="v$.confirmPassword.$model"
      />
      <div class="form__btns">
        <submit-button :loading="isLoading" :name="Buttons.Update" />
        <reset-button @reset="handleReset" :loading="isLoading" />
      </div>
    </form>
    <app-modal>
      <confirm-pasword-update @submit="handleConfirm" />
    </app-modal>
  </div>
</template>

<script setup lang="ts">
import PasswordInput from '@/shared/ui/PasswordInput/PaswordInput.vue';
import SubmitButton from '@/shared/ui/SubmitButton/SubmitButton.vue';
import ResetButton from '@/shared/ui/ResetButton/ResetButton.vue';
import AppModal from '@/components/AppModal/AppModal.vue';
import ConfirmPaswordUpdate from '@/features/UpdatePassword/ConfirmPasswordUpdate/ConfirmPaswordUpdate.vue';
import { useVuelidate } from '@vuelidate/core';
import { sameAs, helpers } from '@vuelidate/validators';
import { validatePassword } from '@/shared/utils/validatePassword';
import { customMessages } from '@/shared/constants/form';
import { computed, reactive } from 'vue';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';
import { TPasswordFormFields } from '@/shared/types/common.types';
import { resetFormState } from '@/shared/utils/resetFormState';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { storeToRefs } from 'pinia';
import { Buttons } from '@/shared/constants/common';

const $toast = useToast();
const { showModal } = useAppStore();
const userStore = useUserStore();
const { user, isLoading } = storeToRefs(userStore);
const { updatePassword } = userStore;
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
}
</style>
