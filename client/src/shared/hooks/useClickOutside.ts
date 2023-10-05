import { onBeforeUnmount, onMounted, ref } from 'vue';

const useClickOutside = <T extends HTMLElement>() => {
  const isOpen = ref(false);
  const targetElement = ref<T | null>(null);

  const handleClickOutside = (event: Event): void => {
    const { target } = event;

    if (
      target instanceof HTMLElement &&
      targetElement.value &&
      !targetElement.value.$el.contains(target) &&
      isOpen.value
    ) {
      isOpen.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener('click', handleClickOutside);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside);
  });

  return { isOpen, targetElement };
};

export { useClickOutside };
