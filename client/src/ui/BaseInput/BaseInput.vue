<script setup lang="ts">
import { InputHTMLAttributes, PropType, computed } from 'vue';

type TInputSize = 'sm' | 'md' | 'lg';

const props = defineProps({
  type: {
    type: String as PropType<InputHTMLAttributes['type']>,
    default: 'text',
  },
  size: {
    type: String as PropType<TInputSize>,
  },
  placeholder: {
    type: String,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

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
  <input
    :type="props.type"
    class="input"
    :class="inputClassList"
    :placeholder="props.placeholder"
    @input="handleChange"
    :value="modelValue"
  />
</template>

<style lang="scss" scoped>
.input {
  outline: none;
  border-radius: 0.2rem;
  border-style: solid;
  border-width: 1px;
  border-color: $color-secondary;
  transition: all ease-in-out 0.2s;

  &::placeholder {
    font-weight: 300;
    font-style: italic;
  }

  &:focus {
    border-color: $color-primary;
  }

  @include sizes;
}
</style>
