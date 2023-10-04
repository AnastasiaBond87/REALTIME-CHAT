<template>
  <div class="text-field">
    <div
      contenteditable
      class="text-field__input"
      ref="inputRef"
      @keypress.enter.prevent
      @blur="setFocused"
    />
    <div class="text-field__btns">
      <icon-button class="text-field__btn text-field__btn_smile" @click="showSmiles">
        <v-icon name="fa-regular-smile" :scale="1.5" />
      </icon-button>
      <icon-button class="text-field__btn text-field__btn_send">
        <v-icon name="md-send-round" :scale="1.5" />
      </icon-button>
    </div>
    <smiles-list
      @smile-click="handleSmileClick"
      ref="targetElement"
      :open="isOpen"
      class="text-field__smiles-list"
    />
  </div>
</template>

<script setup lang="ts">
import { useClickOutside } from '@/hooks/useClickOutside';
import IconButton from '@/ui/IconButton/IconButton.vue';
import SmilesList from '@/components/TextField/SmilesList/SmilesList.vue';
import { onMounted, ref } from 'vue';

const inputRef = ref<HTMLTextAreaElement | null>(null);
const { isOpen, targetElement } = useClickOutside<HTMLDivElement>();

const showSmiles = (): void => {
  isOpen.value = !isOpen.value;
};

const setFocused = (): void => {
  inputRef.value?.focus();
};

const handleSmileClick = (value: string): void => {
  const selection = document.getSelection();

  if (selection) {
    const range = selection.getRangeAt(0);
    selection.removeAllRanges();
    range.deleteContents();
    const textNode = document.createTextNode(value);
    range.insertNode(textNode);
  }
};

onMounted(() => {
  setFocused();
});
</script>

<style lang="scss" scoped>
.text-field {
  margin-top: 200px; //temporary styles
  max-width: 600px; //temporary styles
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
  padding: 0 1rem;
  border-radius: 0.4rem;
  background: var(--color-paper);
  transition: var(--change-theme-transition);

  &__input {
    box-sizing: border-box;
    outline: none;
    flex: 1;
    height: 33.6px;
    margin: 0.5rem 0;
    line-height: 1.2;
    color: var(--text-color-secondary);
    overflow: hidden;
  }

  &__btns {
    display: flex;
    gap: 0.8rem;
  }

  &__btn {
    &_send {
      color: var(--color-primary);
    }

    &_smile {
      color: var(--color-secondary);
    }
  }

  &__smiles-list {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-110%);
  }
}
</style>
