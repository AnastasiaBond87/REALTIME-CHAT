<template>
  <transition name="fade">
    <div class="smiles" v-show="open">
      <ul class="smiles__list">
        <li
          v-for="{ id, icon } in smiles"
          :key="id"
          class="smiles__item"
          @click="() => handleItemClick(icon)"
        >
          <span>{{ icon }}</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup lang="ts">
import smiles from '@/shared/data/smiles.json';

interface IProps {
  open: boolean;
}

defineProps<IProps>();

const handleItemClick = (value: string): void => {
  const selection = document.getSelection();

  if (selection) {
    const range = selection.getRangeAt(0);
    selection.removeAllRanges();
    range.deleteContents();
    const textNode = document.createTextNode(value);
    range.insertNode(textNode);
    selection.setPosition(textNode, textNode.length);
  }
};
</script>

<style lang="scss">
.smiles {
  box-sizing: border-box;
  background: var(--color-paper);
  padding: 1rem 0;
  display: flex;
  align-items: flex-start;
  border: 1px solid var(--color-primary-light);
  border-radius: 0.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translate(50%, 100%);
    border: 10px solid transparent;
    border-top: 10px solid var(--color-primary-light);
  }

  &__list {
    box-sizing: border-box;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.5rem 0 0;
    gap: 1rem;
    margin: 0 0.5rem;
    max-height: 73.5px;
    max-width: 130px;
    overflow-y: auto;
    scrollbar-color: transparent transparent;
    scrollbar-width: 3.5px;

    &:hover {
      scrollbar-color: var(--color-black-transparent) transparent;
    }

    &::-webkit-scrollbar {
      width: 3.5px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-black-transparent);
      border-radius: 2px;
      visibility: hidden;
    }

    &:hover::-webkit-scrollbar-thumb,
    &:active::-webkit-scrollbar-thumb,
    &:focus::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }

  &__item {
    cursor: pointer;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
