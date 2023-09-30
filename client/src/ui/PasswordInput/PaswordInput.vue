<template>
  <div class="base-input password-input">
    <label v-if="label" class="base-input__label">{{ label }}</label>
    <div class="password-input__wrapper">
      <input
        :type="isPasswordVisible ? 'text' : 'password'"
        autocomplete="new-password"
        class="base-input__input password-input__input"
        :class="classList"
        :value="modelValue"
        @input="handleChange"
        :placeholder="placeholder"
      />
      <icon-button class="password-input__btn" @click="showPassword">
        <v-icon name="bi-eye-fill" :scale="iconScale" v-if="isPasswordVisible" />
        <v-icon name="bi-eye-slash-fill" :scale="iconScale" v-else />
      </icon-button>
    </div>
    <p v-if="errors && errors.length > 0" class="base-input__error">
      <span v-for="{ $message, $uid } in errors" :key="$uid">{{ $message }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import IconButton from '@/ui/IconButton/IconButton.vue';
import type { ErrorObject } from '@vuelidate/core';
import type { TSize } from '@/types/common.types';
import { computed, ref } from 'vue';

interface IProps {
  label?: string;
  errors?: ErrorObject[];
  size?: TSize;
  modelValue: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  size: 'md',
});

const emits = defineEmits<{ 'update:modelValue': [value: string] }>();

const isPasswordVisible = ref(false);

const classList = computed(() => ({
  small: props.size === 'sm',
  medium: props.size === 'md',
  large: props.size === 'lg',
}));

const iconScale = computed(() => {
  if (props.size === 'md') return 1.3;
  else if (props.size === 'lg') return 1.5;
  else return 1.1;
});

const handleChange = (event: Event) => {
  const { target } = event;

  if (target instanceof HTMLInputElement) {
    emits('update:modelValue', target.value);
  }
};

const showPassword = (): void => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<style lang="scss" scoped>
.password-input {
  &__wrapper {
    position: relative;
  }

  &__btn {
    position: absolute;
    right: 1.14rem;
    color: darken($text-color-secondary, 10%);
    transform: translateY(25%);
  }

  &__input {
    &.small {
      padding-right: 3.85rem;
    }

    &.medium {
      padding-right: 4.06rem;
    }

    &.large {
      padding-right: 4.35rem;
    }
  }
}
</style>
