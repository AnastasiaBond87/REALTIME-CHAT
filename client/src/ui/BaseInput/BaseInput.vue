<script setup lang="ts">
import { InputHTMLAttributes, computed } from 'vue';
import type { ErrorObject } from '@vuelidate/core';
import type { TSize } from '@/types/common.types';

interface IProps {
  type?: InputHTMLAttributes['type'];
  size?: TSize;
  placeholder?: string;
  modelValue: string;
  errors?: ErrorObject[];
  autocomplete: InputHTMLAttributes['autocomplete'];
  label?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  size: 'md',
});

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const inputClassList = computed(() => ({
  small: props.size === 'sm',
  medium: props.size === 'md',
  large: props.size === 'lg',
}));

const handleChange = (event: Event) => {
  const { target } = event;

  if (target instanceof HTMLInputElement) {
    emit('update:modelValue', target.value);
  }
};
</script>

<template>
  <div class="base-input">
    <label v-if="label" class="base-input__label">{{ props.label }}</label>
    <input
      :type="props.type"
      class="base-input__input"
      :class="inputClassList"
      :placeholder="props.placeholder"
      @input="handleChange"
      :value="modelValue"
      :autocomplete="autocomplete"
    />
    <p v-if="errors && errors.length > 0" class="base-input__error">
      <span v-for="{ $message, $uid } in errors" :key="$uid">{{ $message }}</span>
    </p>
  </div>
</template>

<style lang="scss">
.base-input {
  display: flex;
  flex-direction: column;

  &__label {
    text-transform: capitalize;
    margin-bottom: 0.3rem;
    font-weight: 600;
    color: var(--text-color-primary);
  }

  &__input {
    outline: none;
    border-radius: 0.2rem;
    border-style: solid;
    border-width: 1px;
    border-color: var(--border-color);
    min-width: 100%;
    box-sizing: border-box;
    background: var(--color-paper);
    color: var(--text-color-primary);
    transition:
      var(--change-theme-transition),
      border 0.3s ease;

    &::placeholder {
      font-weight: 300;
      font-style: italic;
      color: var(--text-color-secondary);
    }

    &:focus {
      border-color: var(--border-color-active);
    }

    @include sizes;
  }

  &__error {
    font-size: 0.9rem;
    margin-bottom: 0;
    margin-top: 0.3rem;
    padding: 0 0.3rem;
    color: var(--text-color-error);
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
}
</style>
