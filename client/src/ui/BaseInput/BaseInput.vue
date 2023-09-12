<script setup lang="ts">
import { InputHTMLAttributes, PropType, computed } from 'vue';
import type { ErrorObject } from '@vuelidate/core';
import type { TSize } from '@/types/common.types';

const props = defineProps({
  type: {
    type: String as PropType<InputHTMLAttributes['type']>,
    default: 'text',
  },
  size: {
    type: String as PropType<TSize>,
  },
  placeholder: {
    type: String,
  },
  modelValue: {
    type: String,
    required: true,
  },
  errors: {
    type: Array as PropType<ErrorObject[]>,
  },
  autocomplete: {
    type: String as PropType<InputHTMLAttributes['autocomplete']>,
    required: true,
  },
  label: {
    type: String,
  },
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
  <div class="wrapper">
    <label v-if="label" class="label">{{ props.label }}</label>
    <input
      :type="props.type"
      class="input"
      :class="inputClassList"
      :placeholder="props.placeholder"
      @input="handleChange"
      :value="modelValue"
      :autocomplete="autocomplete"
    />
    <p v-if="errors && errors.length > 0" class="error">
      <span v-for="{ $message, $uid } in errors" :key="$uid">{{ $message }}</span>
    </p>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

.label {
  text-transform: capitalize;
  margin-bottom: 0.3rem;
  font-weight: 600;
}
.input {
  outline: none;
  border-radius: 0.2rem;
  border-style: solid;
  border-width: 1px;
  border-color: $color-secondary;
  transition: all ease-in-out 0.2s;
  min-width: 100%;
  box-sizing: border-box;

  &::placeholder {
    font-weight: 300;
    font-style: italic;
  }

  &:focus {
    border-color: $color-active;
  }

  @include sizes;
}

.error {
  font-size: 0.9rem;
  margin-bottom: 0;
  margin-top: 0.3rem;
  padding: 0 0.3rem;
  color: $text-color-error;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
</style>
